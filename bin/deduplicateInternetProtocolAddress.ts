import assert from 'node:assert';
import generateInternetProtocolAddress, {
  IP
} from './generateInternetProtocolAddress';

export default async function deduplicateInternetProtocolAddress(
  existingIp: string,
  ipList: IP[],
  max: IP
): Promise<void> {
  /**
   * If -1, it means no duplicate was found on these lines.
   */
  let duplicateIndex: number;

  do {
    duplicateIndex = ipList.findIndex((generatedIp) =>
      existingIp.startsWith(generatedIp.join('.'))
    );

    // This generated IP address is no duplicate according to this line
    if (duplicateIndex === -1) {
      continue;
    }

    const generatedIp = ipList[duplicateIndex] ?? null;

    assert.strict.ok(
      generatedIp !== null,
      `Duplicate generated IP address has returned null when tried to be accessed on the list offset "${duplicateIndex}: ${JSON.stringify(ipList)}`
    );

    ipList[duplicateIndex] =
      await generateInternetProtocolAddress(max);
  } while (duplicateIndex !== -1);
}
