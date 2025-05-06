#!/usr/bin/env node

import { Codec, Deserializer, Serializer } from '@jsbuffer/codec';
import getArgumentAssignment from 'cli-argument-helper/getArgumentAssignment';
import { getString } from 'cli-argument-helper/string';
import assert from 'node:assert';
import console from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';
import {
  Attribute,
  decodeIPReadingInformation,
  decodeIPTestingResultTrait,
  decodeProcessedExtractionTargetFile,
  defaultIPReadingInformation,
  encodeIPReadingInformation,
  encodeIPTestingResultTrait,
  encodeProcessedExtractionTargetFile,
  FileLocation,
  HttpConnectionInformation,
  IPHttpResult,
  IPReadingInformation,
  IPTestingResult,
  IPTestingResultFailure,
  IPTestingResultSuccess,
  isIPTestingResultFailure,
  ProcessedExtractionTargetFile,
  ProcessedExtractionTargetFileMetadata,
  TestURL,
  updateIPHttpResult,
  updateIPReadingInformation
} from '../schema/main.jsb';

const outputDirectory = path.resolve(process.cwd(), './data');
const ipListOutputFile = path.resolve(outputDirectory, './ips.txt');
const readingInformationOutputFile = path.resolve(outputDirectory, './read_info.bin');

async function readingInformation(readingInformation: IPReadingInformation | null = null, codec = new Codec({
  textDecoder: new TextDecoder('utf8'),
  textEncoder: new TextEncoder(),
})) {
  const fs = await import('node:fs');

  if (readingInformation !== null) {
    await fs.promises.writeFile(
      readingInformationOutputFile,
      codec.encode(encodeIPReadingInformation, readingInformation)
    );
    return readingInformation
  }

  try {
    readingInformation = codec.decode(decodeIPReadingInformation, await fs.promises.readFile(readingInformationOutputFile));

    assert.strict.ok(readingInformation !== null,
      `Invalid reading information file: ${readingInformationOutputFile}`
    );
  } catch (err) {
    readingInformation = defaultIPReadingInformation({
      byteOffset: 0,
    })
  }

  return readingInformation
}

async function generateAddresses({ fd, count, readingInfo }: {
  fd: fs.promises.FileHandle;
  count: number;
  readingInfo: IPReadingInformation;
}) {
  console.log('Generating %d IP combinations', count);
  const iptvPaths: (string | {
    /**
     * String that will be appended at the end of the final URL
     */
    trailing: string | null;
    search: Record<string, string> | null;
    pathname: string | null;
  })[] = [
      { pathname: '/cgi-bin/snapshot.cgi', search: { chn: '1' }, trailing: null },
      { pathname: '/cgi-bin/config.cgi', search: { action: 'list' }, trailing: null },
      '/cgi-bin/get_params.cgi',
      '/cgi-bin/camera',
      '/webcapture.jpg',
      { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '320x240' }, trailing: '&1746396937991' },
      { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '320x240' }, trailing: null },
      { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '', 'resolution': '640x480' }, trailing: null },
      { pathname: '/axis-cgi/mjpg/video.cgi', search: { 'camera': '' }, trailing: null },
      {
        pathname: '/webcapture.jpg',
        search: { 'command': 'snap', 'channel': '1' },
        trailing: '?COUNTER'
      },
      { search: { 'action': 'stream' }, trailing: null, pathname: null },
    ]

  const ports = [null, 8080, 83, 443, 80, 22]

  const protocols = ['http', 'https'];

  const MAX_UINT8 = 255;

  let bytesWrittenCount = 0;

  for (const port of ports) {
    for (const protocol of protocols) {
      for (const pathname of iptvPaths) {
        const ip = [
          Math.floor(Math.random() * MAX_UINT8),
          Math.floor(Math.random() * MAX_UINT8),
          Math.floor(Math.random() * MAX_UINT8),
          Math.floor(Math.random() * MAX_UINT8)
        ];

        const url = new URL(`${protocol}://${ip.join('.')}`);
        let trailing = '';

        if (typeof pathname === 'string') {
          url.pathname = pathname;
        } else {
          if (pathname.trailing !== null) {
            trailing = pathname.trailing;
          }

          if (pathname.pathname !== null) {
            url.pathname = pathname.pathname;
          }

          if (pathname.search !== null) {
            for (const [key, value] of Object.entries(pathname.search)) {
              url.searchParams.set(key, value);
            }
          }

          if (port !== null) {
            url.port = port.toString();
          }
        }

        const encodedUrl = new TextEncoder().encode(`${encodeURI(url.href)}${trailing}\n`);

        const writeResult = await fd.write(encodedUrl, 0, encodedUrl.byteLength, readingInfo.byteOffset);

        assert.strict.ok(
          writeResult.bytesWritten === encodedUrl.byteLength,
          `Expected to write ${encodedUrl.byteLength} bytes, ` +
          `but only wrote ${writeResult.bytesWritten}.`
        );

        bytesWrittenCount += writeResult.bytesWritten;
      }
    }
  }

  assert.strict.ok(isValidInteger(count),
    `Invalid count, expected a valid integer: ${count}`);

  assert.strict.ok(
    count >= 0,
    `Invalid count, expected a non-negative integer: ${count}`
  );

  // Update read byte offset
  readingInfo = await readingInformation(updateIPReadingInformation(readingInfo, {
    byteOffset: readingInfo.byteOffset
  }));

  // Fully flush the file descriptor
  await fd.sync()

  // Log the number of bytes written
  console.log('%d bytes written to: %s', bytesWrittenCount, ipListOutputFile);

  if (count === 0) {
    return readingInfo;
  }

  return generateAddresses({
    fd,
    count: count - 1,
    readingInfo
  });
}

async function extractIPs(scanDirectoryList: string[]) {
  const extractedUrlsOutputFile = path.resolve(outputDirectory, './extracted_urls.txt');
  const { spawn } = await import('@high-nodejs/child_process');
  const cheerio = await import('cheerio');
  const crypto = await import('node:crypto');

  // Clear `extractedUrlsOutputFile` file
  await fs.promises.writeFile(extractedUrlsOutputFile, '');

  // const ignoreList: string[] = [];
  const ignoreList = ['cdn.jsdelivr.net'];

  const includeList = [/(([a-zA-Z0-9]+):(\/\/))/]

  const extractedUrlOutputDirectory = path.resolve(outputDirectory, 'extracted/urls/metadata');

  await fs.promises.mkdir(extractedUrlOutputDirectory, { recursive: true });

  for await (const fileLocation of spawn.pipe('find', [...scanDirectoryList, '-mindepth', '1', '-type', 'f']).output().stdout().split('\n')) {
    const $ = cheerio.load(await fs.promises.readFile(fileLocation, 'utf8'), {}, true);

    // for (const imgEl of $.root().find('img, video, audio, a')) {
    // for (const el of [...$.root().find('img, video, audio, a'), ...$.root().find('*')]) {
    for (const el of [...$.root().find('*')]) {
      const htmlContents = $(el).html() ?? null
      let processedElementInfo: { targetFile: ProcessedExtractionTargetFile; codec: ICodec<ProcessedExtractionTargetFile> } | null = null;

      if (htmlContents !== null) {
        const hash = crypto.createHash('sha1').update(`${fileLocation}-${htmlContents}.bin`).digest('hex');
        const outFile = path.resolve(extractedUrlOutputDirectory, hash);

        // If the file already exists, skip the element

        const codec = await createCodec(outFile, {
          encode: encodeProcessedExtractionTargetFile,
          decode: decodeProcessedExtractionTargetFile
        });

        try {
          await fs.promises.access(outFile, fs.constants.R_OK);

          // Make sure we are able to load the file
          assert.strict.ok((await codec.load()) !== null, `Failed to load file "${outFile}".`);

          // Element was already processed, skip
          continue;
        } catch (err) {

        }

        const targetFile = ProcessedExtractionTargetFile({
          file: FileLocation({
            location: fileLocation
          }),
          metadata: ProcessedExtractionTargetFileMetadata({
            attributes: el.attributes.map(attr => Attribute({
              name: attr.name,
              value: attr.value
            }))
          })
        });

        processedElementInfo = {
          targetFile,
          codec
        }
      }

      const list = el.attributes
        .filter(attr => ignoreList.length === 0 || !ignoreList.some(ignore => attr.value.includes(ignore)))
        .filter(attr => includeList.length === 0 || includeList.some(include => include.test(attr.value)))
        .map(s => s.value.trim())
        .filter(s => s.length > 0);

      // Append the URLs all at once instead of calling `appendFile` multiple times for every URL we think we discover.
      await fs.promises.appendFile(extractedUrlsOutputFile, `${list.join('\n')}\n`);

      if (processedElementInfo !== null) {
        await processedElementInfo.codec.save(processedElementInfo.targetFile);
      }
    }
  }

  const ips = fs.createReadStream(extractedUrlsOutputFile);
  const sort = spawn('sort', [], { stdio: ['pipe', 'pipe', 'inherit'] }).childProcess;
  const uniq = spawn('uniq', [], { stdio: ['pipe', 'pipe', 'inherit'] }).childProcess;

  assert.strict.ok(
    uniq.stdout !== null && sort.stdin !== null,
    'uniq: stdout and stdin is null'
  )

  assert.strict.ok(
    sort.stdout !== null && uniq.stdin !== null,
    'sort: stdout and stdin is null'
  )

  await stream.promises.pipeline(
    ips,
    sort.stdin,
    uniq.stdin,
    fs.createWriteStream(`${extractedUrlsOutputFile}_sorted.txt`)
  )

  // ips.pipe(sort.stdin).pipe(uniq.stdin).pipe(fs.createWriteStream(extractedUrlsOutputFile));

  return extractedUrlsOutputFile;
}

(async () => {
  const fs = await import('node:fs');
  const { filesize } = await import('filesize')
  const process = await import('node:process');
  const crypto = await import('node:crypto');

  // Create output directory
  await fs.promises.mkdir(outputDirectory, { recursive: true });

  const args = process.argv.slice(2);

  const scanDirectoryList = new Array<string>();

  let scanDirectory: string | null;
  do {
    scanDirectory = getArgumentAssignment(args, '--scan', getString)

    if (scanDirectory === null) {
      continue;
    }

    scanDirectoryList.push(scanDirectory);
  } while (scanDirectory !== null);

  if (scanDirectoryList.length > 0) {
    const extractedUrlsOutputFile = await extractIPs(scanDirectoryList);

    // Append it to the IP list file
    await stream.promises.pipeline(
      fs.createReadStream(extractedUrlsOutputFile),
      fs.createWriteStream(ipListOutputFile, { flags: 'a' })
    );

    // Add a line break to the `ipListOutputFile` file
    await fs.promises.appendFile(ipListOutputFile, '\n');
  }

  let readingInfo = await readingInformation();

  const fd = await fs.promises.open(ipListOutputFile, 'a+');

  // Flush
  await fd.sync()

  const view = new Uint8Array(1000);
  const textDecoder = new TextDecoder('utf8');
  const codec = new Codec({
    textDecoder,
    textEncoder: new TextEncoder(),
  })
  const responseOutputDirectory = path.join(outputDirectory, 'responses');
  const CHARACTER_LINE_BREAK = 0x0A;

  // Create `responses` directory beforehand
  await fs.promises.mkdir(responseOutputDirectory, { recursive: true });

  // If there are no bytes in the file, generate a few IP addresses before start reading
  if ((await fd.stat()).size < 1) {
    readingInfo = await generateAddresses({ fd, count: 100, readingInfo });
  }

  while (readingInfo.byteOffset < (await fd.stat()).size) {
    const result = await fd.read(view, 0, view.byteLength, readingInfo.byteOffset);

    if (result.bytesRead < 1) {
      console.log('Nothing to read...');
      readingInfo = await generateAddresses({ fd, count: 20, readingInfo });
      continue;
    }

    let lineByteOffset = 0;

    while (lineByteOffset < result.bytesRead && view[lineByteOffset] !== CHARACTER_LINE_BREAK) {
      lineByteOffset++;
    }

    if (lineByteOffset === 0) {
      console.log('Skipping empty line. We might\'ve reached EOF: %o', {
        size: filesize((await fd.stat()).size),
        readingInfo
      });
      readingInfo = await generateAddresses({ fd, count: 100, readingInfo });
      continue;
    }

    let targetUrl: URL

    {
      const decodedURL = decodeURI(textDecoder.decode(view.subarray(0, lineByteOffset)));

      try {
        targetUrl = new URL(decodedURL);
      } catch (err) {
        assert.strict.fail(`Invalid target URL "${decodedURL}": ${err}`);
      }
    }

    // Skip the line break
    if (view[lineByteOffset] === CHARACTER_LINE_BREAK) {
      lineByteOffset++;
    }

    const lastTarget = TestURL({
      href: targetUrl.href,
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      pathname: targetUrl.pathname,
      search: new Map(Array.from(targetUrl.searchParams))
    });

    assert.strict.ok(isValidInteger(lastTarget.port),
      `URL port is not a valid integer: ${lastTarget.port}`);

    readingInfo = await readingInformation(updateIPReadingInformation(readingInfo, {
      byteOffset: readingInfo.byteOffset + lineByteOffset,
      lastTarget
    }), codec)

    // console.log('Found target URL: %s', textDecoder.decode(view.subarray(0, lineByteOffset)));
    console.log('Reading information: %s/%s', filesize(readingInfo.byteOffset), filesize((await fd.stat()).size));
    // console.log('Reading information: %d of %d', readingInfo.byteOffset, (await fd.stat()).size);

    const urlInfo = TestURL({
      href: targetUrl.href,
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      pathname: targetUrl.pathname,
      search: new Map(Array.from(targetUrl.searchParams))
    })

    for (const httpMethod of ['GET', 'POST', 'OPTIONS', 'PUT',]) {
      const originalFileName = `${httpMethod}:${targetUrl.href}`;
      const fileName = crypto.createHash('sha1').update(originalFileName).digest('hex');

      /**
       * Holds an `FileLocation` object, which contains the absolute path to the response body file.
       *
       * Since the file can be as big as you can imagine, it's better to keep its binary contents in a separate
       * file.
       */
      const responseBodyLocation = FileLocation({
        location: path.resolve(responseOutputDirectory, `${fileName}.bin`)
      });

      const targetTestingResult = await createCodec(path.resolve(responseOutputDirectory, ['information', `${fileName}.bin`].join('-')), {
        encode: encodeIPTestingResultTrait,
        decode: decodeIPTestingResultTrait
      });

      // Check if the decoded value is a failure
      if (await targetTestingResult.test(isIPTestingResultFailure)) {
        console.error('A previous failure was found on. Skipping: %s', targetTestingResult.destination);
        continue;
      }

      let httpResult = IPHttpResult({
        request: HttpConnectionInformation({
          headers: new Map()
        }),
        response: HttpConnectionInformation({
          headers: new Map()
        }),
        status: null,
        target: urlInfo,
        result: responseBodyLocation
      });

      let res: Response;

      try {
        res = await fetch(targetUrl.href, {
          method: httpMethod
        });
      } catch (reason) {
        console.error('Failed to fetch %s: %s', targetUrl.href, reason);

        await targetTestingResult.save(IPTestingResultFailure({
          result: httpResult,
        }));

        continue;
      }

      // Result after fetching the URL
      let urlTestingResult: IPTestingResult;

      const { status, body } = res;

      // If the `fetch` call was successful, update the HTTP result
      httpResult = updateIPHttpResult(httpResult, {
        status,
        response: HttpConnectionInformation({
          headers: new Map(res.headers)
        })
      })

      if (status >= 200 && status < 300) {
        urlTestingResult = IPTestingResultSuccess({
          result: httpResult,
        })
      } else {
        urlTestingResult = IPTestingResultFailure({
          result: httpResult,
        })
      }

      assert.strict.ok(body !== null);

      await stream.promises.pipeline(
        body,
        fs.createWriteStream(responseBodyLocation.location)
      );

      // Save URL testing result
      await targetTestingResult.save(urlTestingResult);
    }
  }


  await fd.sync();

  await fd.close();
})().catch((err) => {
  console.error(err);
});

export interface ICreateCodecOptions<T> {
  encode: (serializer: Serializer, value: T) => void;
  decode: (value: Deserializer) => T | null;
}

export interface ICodec<T> {
  save: (value: T | null) => Promise<T | null>;
  load: () => Promise<T | null>;
  schedule: <T>(fn: () => Promise<T>) => Promise<T>;
  destination: string;
  test: (fn: (value: T | null) => boolean) => Promise<boolean>;
  valid: boolean;
}

async function createCodec<T>(outputFilePath: string, options: ICreateCodecOptions<T>): Promise<ICodec<T>> {
  const fs = await import('node:fs');
  const { Codec } = await import('@jsbuffer/codec');
  const codec = new Codec({
    textDecoder: new TextDecoder('utf8'),
    textEncoder: new TextEncoder(),
  });

  let pending = Promise.resolve();

  const schedule = <T>(fn: () => Promise<T>) => {
    const newPending = pending.then(fn);

    // Assign `newPending` to `pending`
    pending = newPending.then(() => { });

    return newPending;
  }

  const save = async (value: T | null): Promise<T | null> => schedule(async () => {
    if (value === null) {
      value = await load();
      assert.strict.ok(value !== null, `Failed to decode value for file "${outputFilePath}". ` +
        `The file probably does not exist. Please run the command again with an argument.`);
    }

    try {
      const view = codec.encode(options.encode, value);
      // const byteLength = view.byteLength;

      await fs.promises.writeFile(outputFilePath, view);

      // console.log('Saved %s', filesize(byteLength))
    } catch (err) {
      console.error('Failed to write the file: %o', err);
    }

    return value;
  });

  const load = async () => {
    let result: T | null;

    try {
      const contents = await schedule(() => fs.promises.readFile(outputFilePath));

      result = codec.decode(options.decode, contents);

      // TODO: Check this
      // assert.strict.ok(result !== null, `Failed to decode file "${outputFilePath}".`);

      if (result === null) {
        console.error(`Failed to decode file "${outputFilePath}".`);
      }
    } catch (err) {
      console.error('Failed to decode: %o', err);
      result = null
    }

    return result;
  };

  const test = async (fn: (value: T | null) => (boolean | Promise<boolean>)): Promise<boolean> => {
    // let passed: boolean;
    // try {
    //   const value = await load();

    //   assert.strict.ok(value !== null,
    //     `Failed to decode value for file "${outputFilePath}". The file probably does not exist. ` +
    //     `Please call 'save' method with some value first, then call 'test' again.`
    //   );

    //   passed = await fn(value);
    // } catch (err) {
    //   console.error('An exception was thrown during testing the decoded value: %o', err);
    //   passed = false;
    // }

    // return passed;

    return schedule(async () => fn(await load()));
  }

  /**
   * Whether the file exists or not
   */
  let exists: boolean;

  /**
   * Whether the present value can be decoded or not
   */
  let valid: boolean;

  try {
    await fs.promises.access(outputFilePath, fs.constants.F_OK | fs.constants.R_OK);

    exists = true;
  } catch (err) {
    exists = false;
  }

  if (exists) {
    try {
      valid = (await load() !== null);
    } catch (err) {
      valid = false;
    }
  } else {
    valid = false;
  }

  return {
    valid,
    schedule,
    destination: outputFilePath,
    save,
    test,
    load
  }
}

function isValidInteger(value: unknown): value is number {
  return typeof value === 'number' && (
    Number.isFinite(value) && Number.isInteger(value) && Number.isSafeInteger(value) && !Number.isNaN(value)
  );
}