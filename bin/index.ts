#!/usr/bin/env node

import { spawn } from '@high-nodejs/child_process';
import { getArgument } from 'cli-argument-helper';
import getArgumentAssignmentFromIndex from 'cli-argument-helper/getArgumentAssignmentFromIndex';
import { getInteger } from 'cli-argument-helper/number';
import { getString } from 'cli-argument-helper/string';
import assert from 'node:assert';
import console from 'node:console';
import stream from 'node:stream';
import {
  decodeProcessedExtractionTargetFile,
  encodeProcessedExtractionTargetFile
} from '../schema/main.jsb';
import configuration from './configuration';
import createCodec from './createCodec';
import extractInternetProtocolAddressesFromDirectoryList from './extractInternetProtocolAddressesFromDirectoryList';
import generateIPsCommand from './generateIPsCommand';
import getArgumentAssignmentList from './getArgumentAssignmentList';
import testInternetProtocolAddresses from './testInternetProtocolAddresses';

async function decode(args: string[]) {
  const shouldDecode = getArgument(args, '--decode');

  if (shouldDecode !== null) {
    let limit =
      getArgumentAssignmentFromIndex(
        args,
        shouldDecode.index,
        '--limit',
        getInteger
      ) ??
      getArgumentAssignmentFromIndex(
        args,
        shouldDecode.index,
        '-l',
        getInteger
      ) ??
      getArgumentAssignmentFromIndex(
        args,
        shouldDecode.index,
        '--until',
        getInteger
      ) ??
      null;

    if (limit === null) {
      limit = 4;
      console.log('No limit specified, defaulting to %d', limit);
    }

    const encodedFileList = spawn
      .pipe('find', [
        configuration.extractedUrlOutputDirectory,
        '-mindepth',
        '1',
        '-type',
        'f',
        '-name',
        '*.bin'
      ])
      .output()
      .stdout()
      .split('\n');
    for await (const binaryFile of encodedFileList) {
      const codec = await createCodec(binaryFile, {
        decode: decodeProcessedExtractionTargetFile,
        encode: encodeProcessedExtractionTargetFile
      });

      const result = await codec.load();

      console.log(JSON.stringify(result, null, 4));

      if (limit === 0) {
        break;
      }

      limit--;
    }

    return false;
  }

  return true;
}

async function scan(args: string[]) {
  const scanDirectoryList = getArgumentAssignmentList(
    args,
    ['--scan', '--scan-directory'],
    getString
  );

  if (scanDirectoryList === null || scanDirectoryList.length < 1) {
    return false;
  }

  const fs = await import('node:fs');

  const extractedUrlsOutputFile =
    await extractInternetProtocolAddressesFromDirectoryList(
      scanDirectoryList
    );

  // Append it to the IP list file
  await stream.promises.pipeline(
    fs.createReadStream(extractedUrlsOutputFile),
    fs.createWriteStream(configuration.ipListOutputFile, {
      flags: 'a'
    })
  );

  // Add a line break to the `configuration.ipListOutputFile` file
  await fs.promises.appendFile(configuration.ipListOutputFile, '\n');
  return true;
}

(async () => {
  const fs = await import('node:fs');
  const process = await import('node:process');

  /**
   * Create output directory
   */
  await fs.promises.mkdir(configuration.outputDirectory, {
    recursive: true
  });

  const args = process.argv.slice(2);

  /**
   * Process --generate-ips arguments
   */
  await generateIPsCommand(args);

  /**
   * Process --scan arguments
   */
  await scan(args);

  /**
   * Process --decode arguments
   */
  await decode(args);

  /**
   * Process --test arguments
   */
  await testInternetProtocolAddresses(args);

  assert.strict.ok(
    args.length,
    `Unknown arguments: ${args.join(' ')}`
  );
})().catch((err) => {
  console.error(err);
});
