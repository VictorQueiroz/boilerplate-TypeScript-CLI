import { Deserializer } from '@jsbuffer/codec';

export default async function decodeMetadata<T>(targetBinaryFile: string, decodeFn: (buffer: Deserializer) => T | null, decodingFailureResult: T | null = null): Promise<T | null> {
  const fs = await import('node:fs');

  let metadata: T | null = null;

  try {
    await fs.promises.access(targetBinaryFile, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    console.error('File "%s" does not exist, returning `null`', targetBinaryFile);
    return null;
  }

  const contents = await fs.promises.readFile(targetBinaryFile);

  try {
    try {
      metadata = decodeFn(new Deserializer({
        buffer: contents,
        textDecoder: new TextDecoder()
      }));
    } catch (reason) {
      console.error('Failed to decode! Corrupted file: "%s"', targetBinaryFile);
      console.error(reason);

      metadata = decodingFailureResult;
    }
  } catch (reason) {
    console.log('Failed to decode metadata: %s', targetBinaryFile);
    console.error(reason);
    metadata = null;
  }

  return metadata;
}