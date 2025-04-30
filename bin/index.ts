#!/usr/bin/env node

import { Serializer } from '@jsbuffer/codec';
import { getArgument } from 'cli-argument-helper';
import getArgumentAssignment from 'cli-argument-helper/getArgumentAssignment';
import { getInteger } from 'cli-argument-helper/number';
import { getString } from 'cli-argument-helper/string';
import assert from 'node:assert';
import console from 'node:console';
import path from 'node:path';
import { AudioCodecOpus, decodeFFmpegEncodedFileResultTrait, decodeFFmpegOriginalFileResultTrait, encodeFFmpegEncodedFileResultTrait, encodeFFmpegOriginalFileResultTrait, FFmpegEncodedFileResultCorrupted, FFmpegEncodedFileResultSuccess, FFmpegOriginalFileResultCorrupted, FFmpegOriginalFileResultFailure, FFmpegOriginalFileResultSuccess, FFmpegOriginalFileResultUnknown, FileDigestSHA1, isFFmpegEncodedFileResultCorrupted, isFFmpegEncodedFileResultFailure, isFFmpegOriginalFileResultCorrupted, isFFmpegOriginalFileResultFailure } from '../schema/main.jsb';
import decodeMetadata from './decodeMetadata';
import getArgumentAssignmentList from './getArgumentAssignmentList';
import saveMetadata from './saveMetadata';
import sha1sum from './sha1sum';

(async () => {
  const { spawn } = await import('@high-nodejs/child_process');
  const fs = await import('node:fs');

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

  const inputFile = getArgumentAssignment(args, '--input', getString);
  assert.strict.ok(inputFile !== null, `--input is required`);

  let outputDirectory =
    getArgumentAssignment(args, '--output-directory', getString) ??
    getArgumentAssignment(args, '-o', getString);
  assert.strict.ok(
    outputDirectory !== null,
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

  outputDirectory = path.resolve(process.cwd(), outputDirectory);

  const createParentDirectories = getArgument(args, '--parents') !== null;

  // Create parent directories for convenience
  if (createParentDirectories) {
    await fs.promises.mkdir((outputDirectory), {
      recursive: true,
    });
  }

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

  const format = getArgumentAssignment(args, '--format', getString);

  const fail = getArgument(args, '--fail');

  const overwriteExisting = getArgument(args, '--overwrite') !== null;

  /*
  ffprobe -v error -analyzeduration 1000000 -probesize 1000000 -select_streams a -show_entries stream=codec_type -of csv=p=0
  */

  const inputFileHash = await sha1sum(inputFile);

  const serializer = new Serializer({
    textEncoder: new TextEncoder(),
    tailByteLength: 128
  });

  const inputFileDigest = FileDigestSHA1({
    value: inputFileHash
  });

  // Metadata related to the main input file
  const inputFileMetadataOutputFile = path.resolve(
    outputDirectory,
    `${inputFileHash}.bin`
  );

  // Try to decode the original file metadata
  let inputFileMetadata = await decodeMetadata(
    inputFileMetadataOutputFile,
    decodeFFmpegOriginalFileResultTrait,
    FFmpegOriginalFileResultCorrupted(),
  );

  if (inputFileMetadata === null) {
    inputFileMetadata = FFmpegOriginalFileResultUnknown({
      originalFile: inputFile
    })
  }

  if (isFFmpegOriginalFileResultCorrupted(inputFileMetadata)) {
    console.log('Metadata for file "%s" is corrupted. You might need to delete it.', inputFile);
    process.exitCode = 1;
    return;
  }

  if (
    isFFmpegOriginalFileResultFailure(inputFileMetadata)
  ) {
    console.log(`Metadata for file "${inputFile}" contains a failure result. Skipping...`);
    // Do not fail the process. This might be simply because we are accessing a file that either is not a valid media file or does not contain any audio stream.
    return;
  }

  // Test the input file using `ffprobe`, encode it if it is a real file
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
      inputFile
    ]);

    inputFileMetadata = FFmpegOriginalFileResultSuccess({
      digest: inputFileDigest,
      originalFile: inputFile,
    })
    await saveMetadata(inputFileMetadataOutputFile, inputFileMetadata, serializer, encodeFFmpegOriginalFileResultTrait);
  } catch (reason) {
    await saveMetadata(inputFileMetadataOutputFile, FFmpegOriginalFileResultFailure({
      digest: inputFileDigest,
      originalFile: inputFile,
      details: ['ffprobe failed. The command is used to detect audio streams in a file.', `${(reason)}`].join('\n'),
    }), serializer, encodeFFmpegOriginalFileResultTrait);

    if (fail !== null) {
      process.exitCode = 1;
    }
    return;
  }

  for (const channelCount of channelCountList) {
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
          // Input
          '-i',
          inputFile,
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
          ...args
        ];

        if (overwriteExisting) {
          ffmpegArgs.push('-y');
        }

        if (format !== null) {
          ffmpegArgs.push('-f', format);
          leadingSlices.push(`fmt-${format}`);
        }

        const outputFile = path.resolve(
          outputDirectory,
          `${leadingSlices.join('_')}.${outExtension}`
        );
        const hashOutputFile = `${outputFile}.sha1sum`;

        const encodedFileMetadataOutputFile = (
          `${outputFile}.bin`
        );

        const encodedFileMetadata = await decodeMetadata(encodedFileMetadataOutputFile, decodeFFmpegEncodedFileResultTrait, FFmpegEncodedFileResultCorrupted());

        if (isFFmpegEncodedFileResultFailure(encodedFileMetadata) || isFFmpegEncodedFileResultCorrupted(encodedFileMetadata)) {
          console.log('Metadata for file "%s" is corrupted. You might need to delete it.', outputFile);
          // TODO: Maybe do this? But it would fail the entire process because of one corrupted file
          // Maybe do not fail the process. This might be simply because we are accessing a file that either is not a valid media file or does not contain any audio stream.
          // process.exitCode = 1;
          continue;
        }

        if (encodedFileMetadata !== null) {
          console.log(
            `Skipping "${inputFile}" because it already exists: "${outputFile}" (${hashOutputFile}).`
          );
          console.log('File metadata already exists: %o', encodedFileMetadata);
          continue;
        }

        try {
          await fs.promises.access(hashOutputFile, fs.constants.R_OK);
          console.log(
            `Skipping "${inputFile}" because it already exists: "${outputFile}" (${hashOutputFile}).`
          );
          continue;
        } catch (reason) {
          console.log(
            `Converting "${inputFile}" to "${outputFile}", "${hashOutputFile}" does not exist.`
          );
        }

        await spawn('ffmpeg', [
          ...ffmpegArgs,

          // Audio output file
          outputFile
        ]).wait();

        const successMetadataInfo = FFmpegEncodedFileResultSuccess({
          sampleRate,
          bitrate,
          channelCount,
          audioCodec: ((codec) => {
            switch (codec) {
              case 'libopus':
                return AudioCodecOpus();
            }
            throw new Error(`Not implemented: ${codec}`);
          })(audioCodec),
          outputFile,
          origin: inputFileMetadata
        });

        // Save metadata
        await saveMetadata(encodedFileMetadataOutputFile, successMetadataInfo, serializer, encodeFFmpegEncodedFileResultTrait);

        // Save the file hash to the same output file name leaded by the `.sha1sum` extension
        await fs.promises.writeFile(hashOutputFile, inputFileHash);

      }
    }
  }
})().catch((err) => {
  console.error(err);
});
