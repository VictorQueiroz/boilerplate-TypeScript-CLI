#!/usr/bin/env node

import { CreateResultFn } from 'cli-argument-helper/assignmentValueFromIndex';
import getArgumentAssignment from 'cli-argument-helper/getArgumentAssignment';
import { getInteger } from 'cli-argument-helper/number';
import { getString } from 'cli-argument-helper/string';
import assert from 'node:assert';
import * as console from 'node:console';
import path from 'node:path';
import sha1sum from './sha1sum';

// TODO: Move this to cli-argument-helper library
function getArgumentAssignmentList<T>(
  args: string[],
  name: string[] | string,
  getValue: CreateResultFn<T>
): T[] | null {
  const list = new Array<T>();

  let value: T | null;
  for (const arg of Array.isArray(name) ? name : [name]) {
    do {
      value = getArgumentAssignment(args, arg, getValue);

      if (value === null) {
        continue;
      }

      list.push(value);
    } while (value !== null);
  }

  if (list.length === 0) {
    return null;
  }

  return list;
}

enum FFmpegAudioFormat {
  F32_LE = 'f32le',
  F64_LE = 'f64le',
  F32_BE = 'f32be',
  F64_BE = 'f64be',
  S16_LE = 's16le',
  S32_LE = 's32le',
  S16_BE = 's16be',
  S32_BE = 's32be'
}

function getFFmpegAudioFormat(
  args: string[]
): FFmpegAudioFormat[] | null {
  const value = getArgumentAssignmentList(
    args,
    ['--format', '-f', '-fmt'],
    getString
  );
  if (value === null) {
    return null;
  }

  const formats = new Array<FFmpegAudioFormat>();

  for (const item of value) {
    switch (item) {
      case FFmpegAudioFormat.F32_LE:
      case FFmpegAudioFormat.F64_LE:
      case FFmpegAudioFormat.F32_BE:
      case FFmpegAudioFormat.F64_BE:
      case FFmpegAudioFormat.S16_LE:
      case FFmpegAudioFormat.S32_LE:
      case FFmpegAudioFormat.S16_BE:
      case FFmpegAudioFormat.S32_BE:
        formats.push(item);
        break;
      default:
        console.error(`Unknown audio format: ${item}`);
        return null;
    }
  }

  return formats;
}

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

  let outDir = getArgumentAssignment(
    args,
    '--output-directory',
    getString
  );
  assert.strict.ok(outDir !== null, `--output-directory is required`);

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
  // const outExtension = (getArgumentAssignmentList(args, '--extension', getString) ??
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

  const ffmpegAudioOutputFormats =
    getArgumentAssignmentList(
      args,
      ['--format'],
      getFFmpegAudioFormat
    )?.flat() ?? null;
  assert.strict.ok(
    ffmpegAudioOutputFormats !== null,
    `--format is required`
  );

  for (const channelCount of channelCountList) {
    for (const outputFormat of ffmpegAudioOutputFormats) {
      for (const sampleRate of sampleRateList) {
        for (const bitrate of bitrateList) {
          const leadingSlices = [
            `ba-${bitrate}`,
            `ar-${sampleRate}`,
            `cc_${channelCount}`
          ];

          if (outputFormat !== null) {
            leadingSlices.push(`fmt-${outputFormat}`);
          }

          leadingSlices.push(
            `ac_${audioCodec}`,
            `sha1sum_${inputFileHash}`
          );

          const outputFile = path.resolve(
            outDir,
            `${leadingSlices.join('-')}.${outExtension}`
          );
          const hashOutputFile = `${outputFile}.sha1sum`;

          try {
            await fs.promises.access(
              hashOutputFile,
              fs.constants.R_OK
            );
            console.log(
              `Skipping "${input}" because it already exists: "${outputFile}" (${outputFile}.sha1sum).`
            );
          } catch (reason) {
            console.log(
              `Converting "${input}" to "${outputFile}", "${outputFile}.sha1sum" does not exist.`
            );
          }

          const ffmpegArgs = [
            '-i',
            input,
            '-acodec',
            audioCodec,
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
            audioCodec,
            '-f',
            outputFormat,
            // Audio output file
            outputFile
          ];

          await spawn('ffmpeg', ffmpegArgs).wait();

          await fs.promises.writeFile(hashOutputFile, inputFileHash);
        }
      }
    }
  }
})().catch((err) => {
  console.error(err);
});
