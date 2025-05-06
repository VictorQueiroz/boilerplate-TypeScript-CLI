import { getArgument } from "cli-argument-helper";
import getBoolean from "cli-argument-helper/boolean/getBoolean";
import getArgumentAssignmentFromIndex from "cli-argument-helper/getArgumentAssignmentFromIndex";
import { getInteger } from "cli-argument-helper/number";
import configuration from "./configuration";
import generateInternetProtocolAddresses from "./generateInternetProtocolAddresses";

export default async function generateIPsCommand(args: string[]) {
  const generateIps = getArgument(args, '--generate-ips');

  if (generateIps === null) {
    return;
  }

  const fs = await import('node:fs');

  const truncate =
    getArgumentAssignmentFromIndex(
      args,
      generateIps.index,
      '--truncate',
      getBoolean
    ) ?? false;

  const limit =
    getArgumentAssignmentFromIndex(
      args,
      generateIps.index,
      '--limit',
      getInteger
    ) ??
    getArgumentAssignmentFromIndex(
      args,
      generateIps.index,
      '-l',
      getInteger
    ) ??
    10;

  if (truncate) {
    await fs.promises.truncate(configuration.ipListOutputFile, 0);
  }

  let max: number | null;
  const octetList = new Array<number>();

  do {
    max =
      getArgumentAssignmentFromIndex(
        args,
        generateIps.index,
        '--max',
        getInteger
      ) ??
      getArgumentAssignmentFromIndex(
        args,
        generateIps.index,
        '--max-octet',
        getInteger
      );

    if (max === null) {
      continue;
    }

    octetList.push(max);
  } while (max !== null);

  const fd = await fs.promises.open(
    configuration.ipListOutputFile,
    'a+'
  );

  const internetProtocolAddressBatchSize = (
    getArgumentAssignmentFromIndex(
      args,
      generateIps.index,
      '--batch-size',
      getInteger
    ) ?? getArgumentAssignmentFromIndex(
      args,
      generateIps.index,
      '-b',
      getInteger
    ) ?? configuration.defaults.internetProtocolAddressBatchSize
  );

  console.log(
    'Generating %d IP addresses in batches of %d',
    limit,
    internetProtocolAddressBatchSize
  );

  try {
    await generateInternetProtocolAddresses({
      limit,
      fd,
      max,
      internetProtocolAddressBatchSize
    });
  } catch (reason) {
    console.error('Failed to generate IP addresses: %o', reason);
  }

  await fd.close();
}