import assert from 'node:assert';
import console from 'node:console';
import fs from 'node:fs';
import { updateIPReadingInformation } from '../schema/main.jsb';
import configuration, { CharacterCode } from './configuration';
import isValidInteger from './isValidInteger';
import readingInformationCodec from './readingInformation';

const iptvPaths: (
  | string
  | {
      /**
       * String that will be appended at the end of the final URL
       */
      trailing: string | null;
      search: Record<string, string> | null;
      pathname: string | null;
    }
  | null
)[] = [
  null
  // { pathname: '/cgi-bin/snapshot.cgi', search: { chn: '1' }, trailing: null },
  // { pathname: '/cgi-bin/config.cgi', search: { action: 'list' }, trailing: null },
  // '/cgi-bin/get_params.cgi',
  // '/cgi-bin/camera',
  // '/webcapture.jpg',
  // { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '320x240' }, trailing: '&1746396937991' },
  // { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '320x240' }, trailing: null },
  // { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '640x480' }, trailing: null },
  // { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '' }, trailing: null },
  // {
  //   pathname: '/webcapture.jpg',
  //   search: { 'command': 'snap', 'channel': '1' },
  //   trailing: '?COUNTER'
  // },
  // { search: { 'action': 'stream' }, trailing: null, pathname: null },
];

const ports = [null, 8080, 83, 443, 80, 22];

const protocols = [null, 'http', 'https'];

const MAX_UINT8 = 255;

const MIN_FIRST_OCTET_VALUE = 1;

const MAX_LINE_SIZE = 1000;

export type InternetProtocolAddressMaximumInternetProtocolOctetValue =

    | number
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];

export default async function generateInternetProtocolAddresses(options: {
  fd: fs.promises.FileHandle;
  limit: number;
  max: InternetProtocolAddressMaximumInternetProtocolOctetValue | null;
}) {
  const crypto = await import('node:crypto');
  const { filesize } = await import('filesize');

  const { fd, limit } = options;

  console.log('Generating %d IP combinations', limit);

  let bytesWrittenCount = 0;
  let readingInfo = await readingInformationCodec();
  let max: [number, number, number, number] = [
    MAX_UINT8,
    MAX_UINT8,
    MAX_UINT8,
    MAX_UINT8
  ];

  if (typeof options.max === 'number') {
    max = [1, options.max, options.max, options.max];
  } else if (Array.isArray(options.max)) {
    const octetA = Math.max(1, options.max[0] ?? MAX_UINT8);
    const octetB = options.max[1] ?? MAX_UINT8;
    const octetC = options.max[2] ?? MAX_UINT8;
    const octetD = options.max[3] ?? MAX_UINT8;

    max = [octetA, octetB, octetC, octetD];
  }

  const arrayBuffer = new ArrayBuffer(
    MAX_LINE_SIZE +
      /**
       * The last character is the line break. We want to preserve the `MAX_LINE_SIZE` constant.
       * Then, we will know for sure that a line can be 1000 bytes long. It might be unusual
       * to have such a long line.
       */
      1
  );

  for (const port of ports) {
    for (const protocol of protocols) {
      for (const pathname of iptvPaths) {
        let ip: [number, number, number, number];

        // Check for duplicates
        {
          /**
           * Read offset of the entire file
           */
          let readOffset = 0;

          /**
           * Let's synchronize data before reading from the beginning
           */
          await fd.datasync();

          type IP = [number, number, number, number];
          let result: fs.promises.FileReadResult<Uint8Array>;
          const textDecoder = new TextDecoder();
          let isDuplicate = false;
          let duplicationInfo: {
            duplicates: IP[];
            lastDuplicatedAt: number;
            logInterval: number;
          } = {
            logInterval: 2000,
            duplicates: [],
            lastDuplicatedAt: 0
          };

          const perf_hooks = await import('node:perf_hooks');

          // TODO: Generate a bunch of IPs beforehand, so we can simply check if any of them exists in the file instead of infinitely reading the file everytime we're going to generate a new IP address.
          do {
            ip = [
              /**
               * The first octet is reserved
               */
              crypto.randomInt(MIN_FIRST_OCTET_VALUE, max[0]),
              crypto.randomInt(0, max[1]),
              crypto.randomInt(0, max[2]),
              crypto.randomInt(0, max[3])
            ];

            result = await fd.read(
              new Uint8Array(arrayBuffer),
              0,
              arrayBuffer.byteLength,
              readOffset
            );

            let localBufferByteOffset = 0;

            const { buffer } = result;

            const startOffset = readOffset;

            while (
              localBufferByteOffset < buffer.byteLength &&
              buffer[localBufferByteOffset] !== CharacterCode.LineFeed
            ) {
              localBufferByteOffset++;
            }

            // Get the end offset before the line break
            const endOffset = readOffset + localBufferByteOffset;

            if (
              buffer[localBufferByteOffset] === CharacterCode.LineFeed
            ) {
              localBufferByteOffset++;
            }

            // console.log((readOffset + localBufferByteOffset)
            //   - startOffset)

            // If it was just a line break, ignore it.
            // if (((
            //   /**
            //    * Since `endOffset` does not include the line break we just read.
            //    * Even if we would just remove 1 from `endOffset`, it's safer to simply
            //    * do these binaries operation using the actual values.
            //    *
            //    * No one knows when the separator will not contain just one character.
            //    */
            //   (readOffset + localBufferByteOffset)
            //   - startOffset)) > 0) {
            //   if(textDecoder.decode(buffer.subarray(startOffset, endOffset)).includes(ip.join('.'))) {
            //     isDuplicate = true;
            //   }
            // }

            isDuplicate = textDecoder
              .decode(buffer.subarray(startOffset, endOffset))
              .includes(ip.join('.'));

            /**
             * The IP address is already calculated.
             */
            if (isDuplicate) {
              duplicationInfo.duplicates.push([
                ip[0],
                ip[1],
                ip[2],
                ip[3]
              ]);
              /**
               * Start from the beginning, we are going to generate a new IP address
               */
              readOffset = 0;
              continue;
            }

            readOffset += localBufferByteOffset;

            const currentTime = perf_hooks.performance.now();
            const shouldLogUnduplicatedIPAddress =
              duplicationInfo.lastDuplicatedAt === 0 ||
              currentTime - duplicationInfo.lastDuplicatedAt >=
                duplicationInfo.logInterval;

            if (shouldLogUnduplicatedIPAddress) {
              if (duplicationInfo.duplicates.length > 0) {
                console.log(
                  'Unduplicated IP addresses:\n\n%s.\n\nEnd read byte offset: %s (byte offset %d)',
                  duplicationInfo.duplicates
                    .splice(0, duplicationInfo.duplicates.length)
                    .map(
                      (oldIp) =>
                        `\t${ip.join('.')} > ${oldIp.join('.')}`
                    )
                    .join('\n'),
                  filesize(readOffset),
                  readOffset
                );
              }
              duplicationInfo.lastDuplicatedAt = currentTime;
            }
          } while (
            readOffset < (await fd.stat()).size ||
            isDuplicate
          );

          assert.strict.ok(
            readOffset === (await fd.stat()).size,
            `Read offset "${readOffset}" is not equal to file size ${(await fd.stat()).size}. ` +
              `The implementation should read the entire file in order to make sure there are no duplicates.`
          );

          console.log(
            '%s is not duplicate. Stopped reading at "%d" while file size is "%d"',
            ip.join('.'),
            readOffset,
            (await fd.stat()).size
          ); // console.log('%s is not duplicate', ip.join('.'));
        }

        const url = new URL(`${protocol}://${ip.join('.')}`);
        let trailing = '';

        if (typeof pathname === 'string') {
          url.pathname = pathname;
        } else if (pathname !== null) {
          if (pathname.trailing !== null) {
            trailing = pathname.trailing;
          }

          if (pathname.pathname !== null) {
            url.pathname = pathname.pathname;
          }

          if (pathname.search !== null) {
            for (const [key, value] of Object.entries(
              pathname.search
            )) {
              url.searchParams.set(key, value);
            }
          }

          if (port !== null) {
            url.port = port.toString();
          }
        }

        // const encodedUrl = new TextEncoder().encode(`${encodeURI(url.href)}${trailing}\n`);

        // Just put the IP address there. That is it. We can add the rest during runtime.
        const encodedUrl = new TextEncoder().encode(
          `${url.hostname}\n`
        );

        const writeResult = await fd.write(
          encodedUrl,
          0,
          encodedUrl.byteLength,
          readingInfo.byteOffset
        );

        assert.strict.ok(
          writeResult.bytesWritten === encodedUrl.byteLength,
          `Expected to write ${encodedUrl.byteLength} bytes, ` +
            `but only wrote ${writeResult.bytesWritten}.`
        );

        bytesWrittenCount += writeResult.bytesWritten;
      }
    }
  }

  assert.strict.ok(
    isValidInteger(limit),
    `Invalid count, expected a valid integer: ${limit}`
  );

  assert.strict.ok(
    limit >= 0,
    `Invalid count, expected a non-negative integer: ${limit}`
  );

  // Update read byte offset
  readingInfo = await readingInformationCodec(
    updateIPReadingInformation(readingInfo, {
      byteOffset: readingInfo.byteOffset
    })
  );

  // Fully flush the file descriptor
  await fd.sync();

  // Log the number of bytes written
  console.log(
    '%d bytes written to: %s',
    bytesWrittenCount,
    configuration.ipListOutputFile
  );

  if (limit === 0) {
    return readingInfo;
  }

  return generateInternetProtocolAddresses({
    fd,
    limit: limit - 1,
    max
  });
}
