import { getString } from 'cli-argument-helper/string';
import getArgumentAssignmentList from './getArgumentAssignmentList';

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

export default function getFFmpegAudioFormat(
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
