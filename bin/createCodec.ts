import assert from 'node:assert';
import { IDeserializer, ISerializer } from '../schema/__types__';

export interface ICreateCodecOptions<T> {
  encode: (serializer: ISerializer, value: T) => void;
  decode: (value: IDeserializer) => T | null;
}

export interface ICodec<T> {
  save: (value: T | null) => Promise<T | null>;
  load: () => Promise<T | null>;
  schedule: <T>(fn: () => Promise<T>) => Promise<T>;
  destination: string;
  test: (fn: (value: T | null) => boolean) => Promise<boolean>;
  valid: boolean;
}

export default async function createCodec<T>(
  outputFilePath: string,
  options: ICreateCodecOptions<T>
): Promise<ICodec<T>> {
  const fs = await import('node:fs');
  const { Codec } = await import('@jsbuffer/codec');
  const codec = new Codec({
    textDecoder: new TextDecoder('utf8'),
    textEncoder: new TextEncoder()
  });

  let pending = Promise.resolve();

  const schedule = <T>(fn: () => Promise<T>) => {
    const newPending = pending.then(fn);

    // Assign `newPending` to `pending`
    pending = newPending.then(() => {});

    return newPending;
  };

  const save = async (value: T | null): Promise<T | null> =>
    schedule(async () => {
      if (value === null) {
        value = await load();

        assert.strict.ok(
          value !== null,
          `Failed to decode value for file "${outputFilePath}". ` +
            `The file probably does not exist. Please run the command again with an argument.`
        );
      }

      try {
        const view = codec.encode(options.encode, value);
        // const byteLength = view.byteLength;

        await fs.promises.writeFile(outputFilePath, view);

        // console.log('Saved %s', filesize(byteLength))
      } catch (err) {
        console.error('Failed to write the file: %o', err);
      }

      return value;
    });

  const load = async () => {
    let result: T | null;

    try {
      const contents = await schedule(() =>
        fs.promises.readFile(outputFilePath)
      );

      result = codec.decode(options.decode, contents);

      // TODO: Check this
      // assert.strict.ok(result !== null, `Failed to decode file "${outputFilePath}".`);

      if (result === null) {
        console.error(`Failed to decode file "${outputFilePath}".`);
      }
    } catch (err) {
      console.error('Failed to decode: %o', err);
      result = null;
    }

    return result;
  };

  const test = async (
    fn: (value: T | null) => boolean | Promise<boolean>
  ): Promise<boolean> => {
    // let passed: boolean;
    // try {
    //   const value = await load();

    //   assert.strict.ok(value !== null,
    //     `Failed to decode value for file "${outputFilePath}". The file probably does not exist. ` +
    //     `Please call 'save' method with some value first, then call 'test' again.`
    //   );

    //   passed = await fn(value);
    // } catch (err) {
    //   console.error('An exception was thrown during testing the decoded value: %o', err);
    //   passed = false;
    // }

    // return passed;

    return schedule(async () => fn(await load()));
  };

  /**
   * Whether the file exists or not
   */
  let exists: boolean;

  /**
   * Whether the present value can be decoded or not
   */
  let valid: boolean;

  try {
    await fs.promises.access(
      outputFilePath,
      fs.constants.F_OK | fs.constants.R_OK
    );

    exists = true;
  } catch (err) {
    exists = false;
  }

  if (exists) {
    try {
      valid = (await load()) !== null;
    } catch (err) {
      valid = false;
    }
  } else {
    valid = false;
  }

  return {
    valid,
    schedule,
    destination: outputFilePath,
    save,
    test,
    load
  };
}
