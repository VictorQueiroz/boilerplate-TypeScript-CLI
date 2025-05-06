import { CreateResultFn } from 'cli-argument-helper/assignmentValueFromIndex';
import getArgumentAssignment from 'cli-argument-helper/getArgumentAssignment';

// TODO: Move this to `cli-argument-helper` library
export default function getArgumentAssignmentList<T>(
  args: string[],
  name: string[] | string,
  getValue: CreateResultFn<T>
): T[] | null {
  const list = new Array<T>();

  let value: T | null;
  for (const arg of Array.isArray(name) ? name : [name]) {
    do {
      value = getArgumentAssignment(args, arg, getValue);

      if (value === null) {
        continue;
      }

      list.push(value);
    } while (value !== null);
  }

  if (list.length === 0) {
    return null;
  }

  return list;
}
