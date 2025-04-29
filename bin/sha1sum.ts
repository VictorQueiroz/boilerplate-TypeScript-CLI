import { spawn } from '@high-nodejs/child_process';
import assert from 'node:assert';

export default async function sha1sum(input: string) {
  const sha1sum = spawn.pipe('sha1sum', [input], {
    stdio: ['ignore', 'pipe', 'inherit']
  });

  const awk = spawn('awk', ['{print $1}'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  assert.strict.ok(
    sha1sum.childProcess.stdout !== null,
    `sha1sum failed`
  );
  assert.strict.ok(awk.childProcess.stdin !== null, `awk failed`);

  sha1sum.childProcess.stdout.pipe(awk.childProcess.stdin);

  return (await awk.output().stdout().decode('utf8')).replace(
    /\n$/,
    ''
  );
}
