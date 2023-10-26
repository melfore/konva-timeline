import { DateTime } from "luxon";

import { logDebug } from "./logger";

export const executeWithPerfomanceCheck = <T>(tag: string, item: string, fn: () => T): T => {
  if (window.__MELFORE_KONVA_TIMELINE_DEBUG__) {
    logDebug(tag, `Running ${item}`);
    const start = DateTime.now().toMillis();
    const fnResult = fn();
    const end = DateTime.now().toMillis();
    logDebug(tag, `${item} calculation took ${end - start} ms`);
    return fnResult;
  }
  const result = fn();
  return result;
};
