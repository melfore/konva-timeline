import { DateTime } from "luxon";

import { logDebug } from "./logger";

export const executeWithPerfomanceCheck = <T>(tag: string, item: string, fn: () => T): T => {
  logDebug(tag, `Running ${item}`);
  const start = DateTime.now().toMillis();
  const result = fn();
  const end = DateTime.now().toMillis();

  logDebug(tag, `${item} calculation took ${end - start} ms`);
  return result;
};
