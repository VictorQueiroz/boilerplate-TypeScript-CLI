export type IP = [number, number, number, number];

// TODO: Move this to a constants file (e.g., `constants.MIN_FIRST_OCTET_VALUE`).

const MIN_FIRST_OCTET_VALUE = 1;

export default async function generateInternetProtocolAddress(
  max: IP
): Promise<IP> {
  const crypto = await import('node:crypto');
  return [
    /**
     * The first octet is reserved
     */
    crypto.randomInt(MIN_FIRST_OCTET_VALUE, max[0]),
    crypto.randomInt(0, max[1]),
    crypto.randomInt(0, max[2]),
    crypto.randomInt(0, max[3])
  ];
}
