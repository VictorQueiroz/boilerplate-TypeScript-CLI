import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  Attribute,
  decodeProcessedExtractionTargetFile,
  encodeProcessedExtractionTargetFile,
  FileLocation,
  ProcessedExtractionTargetFile,
  ProcessedExtractionTargetFileMetadata
} from '../schema/main.jsb';
import configuration from './configuration';
import createCodec from './createCodec';

export default async function extractInternetProtocolAddressesFromDirectoryList(
  scanDirectoryList: string[]
) {
  const extractedUrlsOutputFile = path.resolve(
    configuration.outputDirectory,
    './extracted_urls.txt'
  );
  const { spawn } = await import('@high-nodejs/child_process');
  const cheerio = await import('cheerio');
  const crypto = await import('node:crypto');
  const stream = await import('node:stream');

  // Clear `extractedUrlsOutputFile` file
  await fs.promises.writeFile(extractedUrlsOutputFile, '');

  // const ignoreList: string[] = [];
  const ignoreList = ['cdn.jsdelivr.net'];

  const includeList = [/(([a-zA-Z0-9]+):(\/\/))/];

  await fs.promises.mkdir(configuration.extractedUrlOutputDirectory, {
    recursive: true
  });

  const findArguments = [
    ...scanDirectoryList,
    '-mindepth',
    '1',
    '-type',
    'f'
  ];
  const files = spawn.pipe('find', findArguments);

  for await (const fileLocation of files
    .output()
    .stdout()
    .split('\n')) {
    const $ = cheerio.load(
      await fs.promises.readFile(fileLocation, 'utf8'),
      {},
      true
    );

    for (const el of [...$.root().find('*')]) {
      const htmlContents = $(el).html() ?? $(el).text() ?? null;

      if (htmlContents === null) {
        console.log('%s has no contents', fileLocation);
        continue;
      }

      const hash = crypto
        .createHash('sha1')
        .update(`${fileLocation}-${htmlContents}.bin`)
        .digest('hex');
      const outFile = path.resolve(
        configuration.extractedUrlOutputDirectory,
        hash
      );

      // If the file already exists, skip the element

      const codec = await createCodec(outFile, {
        encode: encodeProcessedExtractionTargetFile,
        decode: decodeProcessedExtractionTargetFile
      });

      let fileStoredInfo: ProcessedExtractionTargetFile | null = null;

      try {
        await fs.promises.access(outFile, fs.constants.R_OK);

        fileStoredInfo = await codec.load();

        // Make sure we are able to load the file
        assert.strict.ok(
          fileStoredInfo !== null,
          `Failed to load file "${outFile}".`
        );

        // Element was already processed, skip
        // continue;
      } catch (err) {
        fileStoredInfo = ProcessedExtractionTargetFile({
          file: FileLocation({
            location: fileLocation
          }),
          metadata: ProcessedExtractionTargetFileMetadata({
            attributes: el.attributes.map((attr) =>
              Attribute({
                name: attr.name,
                value: attr.value
              })
            )
          })
        });
      }

      const list = fileStoredInfo.metadata.attributes
        .filter((attr) => {
          const isIgnored = !ignoreList.some((ignore) =>
            attr.value.includes(ignore)
          );
          const isIncluded = includeList.some((tester) =>
            tester.test(attr.value)
          );
          return isIgnored && !isIncluded;
        })
        .map((s) => s.value.trim().replace(/(\n|\r)/g, ''))
        .filter((s) => s.length > 0);

      /**
       * Append the URLs all at once instead of calling `appendFile`
       * multiple times for every URL we think we discover.
       */
      await fs.promises.appendFile(
        extractedUrlsOutputFile,
        `${list.join('\n')}\n`
      );

      /**
       * Save the file
       */
      await codec.save(fileStoredInfo);

      /**
       * Clear `fileStoredInfo` variable
       */
      fileStoredInfo = null;
    }
  }

  // Kill the `find` process, to avoid it from streaming until it is done
  assert.strict.ok(files.kill(0), `Failed to kill "find" process.`);

  const ips = fs.createReadStream(extractedUrlsOutputFile);
  const sort = spawn('sort', [], {
    stdio: ['pipe', 'pipe', 'inherit']
  }).childProcess;
  const uniq = spawn('uniq', [], {
    stdio: ['pipe', 'pipe', 'inherit']
  }).childProcess;

  assert.strict.ok(
    uniq.stdout !== null && sort.stdin !== null,
    'uniq: stdout and stdin is null'
  );

  assert.strict.ok(
    sort.stdout !== null && uniq.stdin !== null,
    'sort: stdout and stdin is null'
  );

  await stream.promises.pipeline(
    ips,
    sort.stdin,
    uniq.stdin,
    fs.createWriteStream(`${extractedUrlsOutputFile}_sorted.txt`)
  );

  return extractedUrlsOutputFile;
}
