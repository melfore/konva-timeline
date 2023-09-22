export type LogLevel = "debug" | "error" | "warn";

const TAG = "[@melfore/konva-timeline]";

/**
 * Logs message for given level and component
 * @param level the level of the message to log (e.g. "error")
 * @param component the component subject of the log
 * @param message the message of the log
 */
const logger = (level: LogLevel, component: string, message: string) => {
  const text = `${TAG} ${component} - ${message}`;

  switch (level) {
    case "debug":
      console.info(text);
      return;
    case "error":
      console.error(text);
      return;
    case "warn":
      console.warn(text);
      return;
  }
};

/**
 * Logs message for info level and component only if debug mode enabled
 * @param component the component subject of the log
 * @param message the message of the log
 */
export const logDebug = (component: string, message: string) => {
  if (!window.__MELFORE_KONVA_TIMELINE_DEBUG__) {
    return;
  }

  logger("debug", component, message);
};

/**
 * Logs message for error level and component
 * @param component the component subject of the log
 * @param message the message of the log
 */
export const logError = (component: string, message: string) => logger("error", component, message);

/**
 * Logs message for warn level and component
 * @param component the component subject of the log
 * @param message the message of the log
 */
export const logWarn = (component: string, message: string) => logger("warn", component, message);
