#!/usr/bin/env node

import { getArgument } from 'cli-argument-helper';
import getArgumentAssignment from 'cli-argument-helper/getArgumentAssignment';
import { getInteger } from 'cli-argument-helper/number';
import { getString } from 'cli-argument-helper/string';
import assert from 'node:assert';
import * as console from 'node:console';
import path from 'node:path';
import getArgumentAssignmentList from './getArgumentAssignmentList';
import sha1sum from './sha1sum';

(async () => {
  const args = process.argv.slice(2);
  const bitrateList = getArgumentAssignmentList(
    args,
    '--bitrate',
    getString
  );
  assert.strict.ok(
    bitrateList !== null && bitrateList.length > 0,
    `--bitrate is required`
  );

  const sampleRateList = getArgumentAssignmentList(
    args,
    ['--sample-rate', '--rate', '-sr', '-ar', '-r'],
    getInteger
  );
  assert.strict.ok(
    sampleRateList !== null && sampleRateList.length > 0,
    `--sample-rate is required`
  );

  const input = getArgumentAssignment(args, '--input', getString);
  assert.strict.ok(input !== null, `--input is required`);

  let outDir =
    getArgumentAssignment(args, '--output-directory', getString) ??
    getArgumentAssignment(args, '-o', getString);
  assert.strict.ok(
    outDir !== null,
    `--output-directory, -o is required`
  );

  // FIXME: We will implement outputting raw data from a file in the future
  // const rawData = getArgument(args, '-');
  // let ffmpegAudioOutputFormats: FFmpegAudioFormat[] | null;
  //
  // if(rawData !== null) {
  //   assert.strict.ok(ffmpegAudioOutputFormats !== null, `--format, -f is required if using -`);
  // } else {
  //   ffmpegAudioOutputFormats = null;
  // }

  outDir = path.resolve(process.cwd(), outDir);

  const inputFileHash = await sha1sum(input);

  // FIXME: This might have interesting functionality
  // onst outExtension = (getArgumentAssignmentList(args, '--extension', getString) ??
  //   getArgumentAssignmentList(args, '-e', getString));
  // assert.strict.ok(outExtension !== null && outExtension.length > 0, `--extension, -e is required`);

  const outExtension =
    getArgumentAssignment(args, '--extension', getString) ??
    getArgumentAssignment(args, '-e', getString);
  assert.strict.ok(
    outExtension !== null,
    `--extension, -e is required`
  );

  const channelCountList = getArgumentAssignmentList(
    args,
    ['--channel-count', '--channels', '-c'],
    getInteger
  );
  assert.strict.ok(
    channelCountList !== null && channelCountList.length > 0,
    `--channel-count, --channels, -c is required`
  );

  // FIXME: This might have interesting functionality
  // const audioCodecList = getArgumentAssignmentList(args, ['--codec', '-c'], getString);
  // assert.strict.ok(audioCodecList !== null && audioCodecList.length > 0, `--codec is required`);

  // TODO: Add support for more codecs
  // TODO: Guess the extension based on the codec
  const audioCodec = getArgumentAssignment(
    args,
    '--codec',
    getString
  );
  assert.strict.ok(audioCodec !== null, `--codec is required`);

  const { spawn } = await import('@high-nodejs/child_process');
  const fs = await import('node:fs');

  const format = getArgumentAssignment(args, '--format', getString);

  /*
  ffprobe -v error -analyzeduration 1000000 -probesize 1000000 -select_streams a -show_entries stream=codec_type -of csv=p=0
  */

  try {
    await spawn.wait('ffprobe', [
      '-v',
      'error',
      '-analyzeduration',
      '1000000',
      '-probesize',
      '1000000',
      '-select_streams',
      'a',
      '-show_entries',
      'stream=codec_type',
      '-of',
      'csv=p=0',
      input
    ]);
  } catch (reason) {
    console.error('ffprobe failed: %o', reason);
    if (getArgument(args, '--fail') !== null) {
      process.exitCode = 1;
    }
    return;
  }

  for (const channelCount of channelCountList) {
    // for (const outputFormat of ffmpegAudioOutputFormats) {

    // }
    for (const sampleRate of sampleRateList) {
      for (const bitrate of bitrateList) {
        const leadingSlices = [
          `ba-${bitrate}`,
          `ar-${sampleRate}`,
          `cc_${channelCount}`
        ];

        // if (outputFormat !== null) {
        //   leadingSlices.push(`fmt-${outputFormat}`);
        // }

        leadingSlices.push(
          `ac_${audioCodec}`,
          `sha1sum_${inputFileHash}`
        );

        const ffmpegArgs = [
          '-i',
          input,
          // Channels
          '-ac',
          `${channelCount}`,
          // Sample rate
          '-ar',
          `${sampleRate}`,
          // Audio bitrate
          '-b:a',
          bitrate,
          // Audio codec
          '-c:a',
          audioCodec
        ];

        if (format !== null) {
          ffmpegArgs.push('-f', format);
          leadingSlices.push(`fmt-${format}`);
        }

        const outputFile = path.resolve(
          outDir,
          `${leadingSlices.join('_')}.${outExtension}`
        );
        const hashOutputFile = `${outputFile}.sha1sum`;

        try {
          await fs.promises.access(hashOutputFile, fs.constants.R_OK);
          console.log(
            `Skipping "${input}" because it already exists: "${outputFile}" (${hashOutputFile}).`
          );
          continue;
        } catch (reason) {
          console.log(
            `Converting "${input}" to "${outputFile}", "${hashOutputFile}" does not exist.`
          );
        }

        await spawn('ffmpeg', [
          ...ffmpegArgs,

          // Audio output file
          outputFile
        ]).wait();

        await fs.promises.writeFile(hashOutputFile, inputFileHash);
      }
    }
  }
})().catch((err) => {
  console.error(err);
});
