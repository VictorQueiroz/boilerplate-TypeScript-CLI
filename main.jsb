export trait FFmpegOriginalFileResult {

}

export type FFmpegOriginalFileResultSuccess : FFmpegOriginalFileResult {
  FileDigest digest;
  // Original file path
  string originalFile;
}

export type FFmpegOriginalFileResultFailure : FFmpegOriginalFileResult {
  FileDigest digest;
  // Original file path
  string originalFile;
  // Details about the error
  string details;
}

export type FFmpegOriginalFileResultUnknown : FFmpegOriginalFileResult {
  // Original file path
  string originalFile;
}

export type FFmpegOriginalFileResultCorrupted : FFmpegOriginalFileResult {}

export trait FFmpegEncodedFileResult {

}

export trait AudioCodec {}

export type AudioCodecOpus : AudioCodec {}

export type FFmpegEncodedFileResultSuccess : FFmpegEncodedFileResult {
  FFmpegOriginalFileResult origin;
  string outputFile;
  string bitrate;
  int sampleRate;
  int channelCount;
  AudioCodec audioCodec;
}

export type FFmpegEncodedFileResultFailure : FFmpegEncodedFileResult {
  FFmpegOriginalFileResult origin;
  string details;
}

export type FFmpegEncodedFileResultCorrupted : FFmpegEncodedFileResult {}

export trait FileDigest {}

export type FileDigestSHA1 : FileDigest {
  string value;
}