import { Codec } from '@jsbuffer/codec';
import assert from 'assert';
import { getArgument } from 'cli-argument-helper';
import path from 'path';
import {
  FileLocation,
  HttpConnectionInformation,
  IPHttpResult,
  IPTestingResult,
  IPTestingResultFailure,
  IPTestingResultSuccess,
  TestURL,
  decodeIPTestingResultTrait,
  encodeIPTestingResultTrait,
  isIPTestingResultFailure,
  updateIPHttpResult,
  updateIPReadingInformation
} from '../schema/main.jsb';
import configuration from './configuration';
import createCodec from './createCodec';
import isValidInteger from './isValidInteger';
import readingInformationCodec from './readingInformation';

export default async function testInternetProtocolAddresses(
  args: string[]
) {
  if (getArgument(args, '--test') === null) {
    return;
  }

  const fs = await import('node:fs');
  const crypto = await import('node:crypto');
  const stream = await import('node:stream');
  const { filesize } = await import('filesize');

  let readingInfo = await readingInformationCodec();

  const fd = await fs.promises.open(
    configuration.ipListOutputFile,
    'a+'
  );

  // Flush
  await fd.sync();

  const view = new Uint8Array(1000);
  const textDecoder = new TextDecoder('utf8');
  const codec = new Codec({
    textDecoder,
    textEncoder: new TextEncoder()
  });
  const responseOutputDirectory = path.resolve(
    configuration.outputDirectory,
    'responses'
  );
  const CHARACTER_LINE_BREAK = 0x0a;

  // Create `responses` directory beforehand
  await fs.promises.mkdir(responseOutputDirectory, {
    recursive: true
  });

  while (readingInfo.byteOffset < (await fd.stat()).size) {
    const result = await fd.read(
      view,
      0,
      view.byteLength,
      readingInfo.byteOffset
    );

    // If there are no bytes in the file, generate a few IP addresses before start reading
    if (result.bytesRead < 1) {
      break;
      // console.log('Nothing to read...');
      // readingInfo = await generateInternetProtocolAddresses({
      //   fd,
      //   limit: 20,
      //   max: null,
      // });
      // assert.strict.ok(
      //   (await fd.stat()).size > 0,
      //   `Failed to fill "${configuration.ipListOutputFile}" with random IP addresses`
      // );
      // continue;
    }

    let lineByteOffset = 0;

    while (
      lineByteOffset < result.bytesRead &&
      view[lineByteOffset] !== CHARACTER_LINE_BREAK
    ) {
      lineByteOffset++;
    }

    if (lineByteOffset === 0) {
      // console.log(
      //   "Skipping empty line. We might've reached EOF: %o",
      //   {
      //     size: filesize((await fd.stat()).size),
      //     readingInfo
      //   }
      // );
      // readingInfo = await generateInternetProtocolAddresses({
      //   fd,
      //   limit: 100,
      //   max: null
      // });
      // continue;
      break;
    }

    let targetUrl: URL;

    {
      const decodedURL = decodeURI(
        textDecoder.decode(view.subarray(0, lineByteOffset))
      );

      try {
        targetUrl = new URL(decodedURL);
      } catch (err) {
        assert.strict.fail(
          `Invalid target URL "${decodedURL}": ${err}`
        );
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

    assert.strict.ok(
      isValidInteger(lastTarget.port),
      `URL port is not a valid integer: ${lastTarget.port}`
    );

    readingInfo = await readingInformationCodec(
      updateIPReadingInformation(readingInfo, {
        byteOffset: readingInfo.byteOffset + lineByteOffset,
        lastTarget
      }),
      codec
    );

    // console.log('Found target URL: %s', textDecoder.decode(view.subarray(0, lineByteOffset)));
    console.log(
      'Reading information: %s/%s',
      filesize(readingInfo.byteOffset),
      filesize((await fd.stat()).size)
    );
    // console.log('Reading information: %d of %d', readingInfo.byteOffset, (await fd.stat()).size);

    const urlInfo = TestURL({
      href: targetUrl.href,
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port,
      pathname: targetUrl.pathname,
      search: new Map(Array.from(targetUrl.searchParams))
    });

    for (const httpMethod of ['GET', 'POST', 'OPTIONS', 'PUT']) {
      const originalFileName = `${httpMethod}:${targetUrl.href}`;
      const fileName = crypto
        .createHash('sha1')
        .update(originalFileName)
        .digest('hex');

      /**
       * Holds an `FileLocation` object, which contains the absolute path to the response body file.
       *
       * Since the file can be as big as you can imagine, it's better to keep its binary contents in a separate
       * file.
       */
      const responseBodyLocation = FileLocation({
        location: path.resolve(
          responseOutputDirectory,
          `${fileName}.bin`
        )
      });

      const targetTestingResult = await createCodec(
        path.resolve(
          responseOutputDirectory,
          ['information', `${fileName}.bin`].join('-')
        ),
        {
          encode: encodeIPTestingResultTrait,
          decode: decodeIPTestingResultTrait
        }
      );

      // Check if the decoded value is a failure
      if (await targetTestingResult.test(isIPTestingResultFailure)) {
        console.error(
          'A previous failure was found on. Skipping: %s',
          targetTestingResult.destination
        );
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
        console.error(
          'Failed to fetch %s: %s',
          targetUrl.href,
          reason
        );

        await targetTestingResult.save(
          IPTestingResultFailure({
            result: httpResult
          })
        );

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
      });

      if (status >= 200 && status < 300) {
        urlTestingResult = IPTestingResultSuccess({
          result: httpResult
        });
      } else {
        urlTestingResult = IPTestingResultFailure({
          result: httpResult
        });
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
}
