import { Codec } from '@jsbuffer/codec';
import assert from 'node:assert';
import {
  decodeIPReadingInformation,
  defaultIPReadingInformation,
  encodeIPReadingInformation,
  IPReadingInformation
} from '../schema/main.jsb';
import configuration from './configuration';

export default async function readingInformationCodec(
  readingInformation: IPReadingInformation | null = null,
  codec = new Codec({
    textDecoder: new TextDecoder('utf8'),
    textEncoder: new TextEncoder()
  })
) {
  const fs = await import('node:fs');

  if (readingInformation !== null) {
    await fs.promises.writeFile(
      configuration.readingInformationOutputFile,
      codec.encode(encodeIPReadingInformation, readingInformation)
    );
    return readingInformation;
  }

  try {
    readingInformation = codec.decode(
      decodeIPReadingInformation,
      await fs.promises.readFile(
        configuration.readingInformationOutputFile
      )
    );

    assert.strict.ok(
      readingInformation !== null,
      `Invalid reading information file: ${configuration.readingInformationOutputFile}`
    );
  } catch (err) {
    readingInformation = defaultIPReadingInformation({
      byteOffset: 0
    });
  }

  return readingInformation;
}
