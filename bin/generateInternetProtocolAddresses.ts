import assert from 'node:assert';
import console from 'node:console';
import fs from 'node:fs';
import { updateIPReadingInformation } from '../schema/main.jsb';
import configuration, { CharacterCode } from './configuration';
import deduplicateInternetProtocolAddress from './deduplicateInternetProtocolAddress';
import { IP } from './generateInternetProtocolAddress';
import generateInternetProtocolAddressesList from './generateInternetProtocolAddressesList';
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

const MAX_LINE_SIZE =
  MAX_UINT8 * 2; /* double the size supported by linux */

export type InternetProtocolAddressMaximumInternetProtocolOctetValue =

  | number
  | [number]
  | [number, number]
  | [number, number, number]
  | IP;

export default async function generateInternetProtocolAddresses(options: {
  fd: fs.promises.FileHandle;
  limit: number;
  max: InternetProtocolAddressMaximumInternetProtocolOctetValue | null;
}) {
  const { fd, limit } = options;

  console.log('Generating %d IP combinations', limit);

  let bytesWrittenCount = 0;
  let readingInfo = await readingInformationCodec();
  let max: IP = [MAX_UINT8, MAX_UINT8, MAX_UINT8, MAX_UINT8];

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
        // Check for duplicates

        /**
         * Read offset of the entire file
         */
        let readOffset = 0;

        /**
         * Let's synchronize data before reading from the beginning
         */
        await fd.datasync();

        const textDecoder = new TextDecoder();
        const ipList = await generateInternetProtocolAddressesList(
          max,
          20
        );
        const buffer = new Uint8Array(arrayBuffer);

        console.log('Generated %d IP addresses', ipList.length);

        assert.strict.ok(ipList.length > 0);

        let result: fs.promises.FileReadResult<Uint8Array>;

        let totalInternetProtocolAddressCount = 0;

        do {
          result = await fd.read(
            buffer,
            0,
            arrayBuffer.byteLength,
            readOffset
          );

          if (result.bytesRead < 1) {
            console.log('EOF');
            continue;
          }

          let localBufferByteOffset = 0;

          // Read the entire buffer
          // while(readOffset < result.bytesRead) {
          const startOffset = localBufferByteOffset;

          // Read only until we find a line break. If there are remaining bytes that represent a line, they will be read in the next iteration.
          while (
            localBufferByteOffset !== result.bytesRead &&
            buffer[localBufferByteOffset] !== CharacterCode.LineFeed
          ) {
            localBufferByteOffset++;
          }

          // Get the end offset before the line break
          const endOffset = localBufferByteOffset;

          // Remove additional line breaks
          while (
            localBufferByteOffset !== result.bytesRead &&
            buffer[localBufferByteOffset] === CharacterCode.LineFeed
          ) {
            localBufferByteOffset++;
          }

          // Skip the amount we have read so far
          readOffset += localBufferByteOffset;

          // TODO: Check if it's a valid IP. If not, abort it, skip it, correct it, remove it, or ask the user which of those options he wants.
          const existingIp = textDecoder.decode(
            buffer.subarray(startOffset, endOffset)
          );

          if (existingIp.trim().length === 0) {
            continue;
          }

          totalInternetProtocolAddressCount++;

          await deduplicateInternetProtocolAddress(
            existingIp,
            ipList,
            max
          );
        } while (result.bytesRead > 0);

        // Make sure we read all the bytes of the file
        assert.strict.ok(
          readOffset === (await fd.stat()).size,
          `Read offset "${readOffset}" is not equal to file size ${(await fd.stat()).size}. ` +
          `The implementation should read the entire file in order to make sure there are no duplicates.`
        );

        // Iterate over the list that is guaranteed to be duplicate free
        for (const generatedIp of ipList) {
          const url = new URL(
            `${protocol}://${generatedIp.join('.')}`
          );
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

        console.log(
          'Added new %d IP addresses: %s',
          ipList.length,
          ipList.map(ip => ip.join('.')).join(', ')
        );
        console.log()

        console.log('Read %d IP addresses', totalInternetProtocolAddressCount);

        totalInternetProtocolAddressCount = 0;
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
