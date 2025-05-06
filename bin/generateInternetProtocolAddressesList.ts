import generateInternetProtocolAddress, {
  IP
} from './generateInternetProtocolAddress';

export default async function generateInternetProtocolAddressesList(
  max: IP,
  count: number
): Promise<IP[]> {
  const internetProtocolAddressList = new Array<IP>();

  for (let i = 0; i < count; i++) {
    internetProtocolAddressList.push(
      await generateInternetProtocolAddress(max)
    );
  }

  return internetProtocolAddressList;
}
