import { Serializer } from '@jsbuffer/codec';

export default async function saveMetadata<T>(metadataDestinationFile: string, metadata: T, serializer: Serializer, encodeFn: (serializer: Serializer, metadata: T) => void): Promise<void> {
  const fs = await import('node:fs')

  try {
    encodeFn(serializer, metadata)

    console.log('Saving metadata: %o', metadata);

    await fs.promises.writeFile(metadataDestinationFile, serializer.view());

    console.log('Metadata saved to: %s', metadataDestinationFile);
  } catch (reason) {
    console.error('Found corrupted file, failed to decode: %s', metadataDestinationFile);
    process.exitCode = 1;
  }
}
