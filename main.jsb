export type IPReadingInformation {
  uint32 byteOffset;
  optional<TestURL> lastTarget;
}

export trait IPTestingResult {}

export type IPTestingResultSuccess : IPTestingResult {
  IPHttpResult result;
}

export type ProcessedExtractionTargetFileMetadata {
  vector<Attribute> attributes;
}

export type Attribute {
  string name;
  string value;
}

export type ProcessedExtractionTargetFile {
  FileLocation file;
  ProcessedExtractionTargetFileMetadata metadata;
}

export type FileLocation {
  // File location in the file system
  string location;
}

export type TestURL {
  string href;
  string protocol;
  string hostname;
  optional<string> port;
  string pathname;
  map<string, string> search;
}

export type IPHttpResult {
  TestURL target;
  FileLocation result;
  optional<uint32> status;
  HttpConnectionInformation response;
  HttpConnectionInformation request;
}

export type HttpConnectionInformation {
  map<string, string> headers;
}

export type IPTestingResultFailure : IPTestingResult {
  IPHttpResult result;
}