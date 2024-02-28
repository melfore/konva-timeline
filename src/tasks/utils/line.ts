import { LineData } from "../../timeline/TimelineContext";

import { TASK_HEIGHT_OFFSET } from "./tasks";

export type LineType = {
  points: number[];
};

export type AnchorPoint = { x: number; y: number };

export const CIRCLE_POINT_OFFSET = 4;
export const LINE_COLOR = "rgb(135,133,239)";
export const CIRCLE_POINT_COLOR = "rgb(141,141,141)";
export const CIRCLE_POINT_STROKE = "rgb(74,88,97)";
export const LINE_TENSION = 0.5;
export const LINE_WIDTH = 2;
export const LINE_OFFSET = 20;

export const getLineData = (
  connectLine: LineData[],
  rowHeight: number,

  getTaskXCoordinate: (startTime: number) => number,
  getTaskYCoordinate: (rowIndex: number, rowHeight: number) => number,
  type: "back" | "front"
) => {
  const anchorArr: AnchorPoint[] = [];
  const workLineArr: string[] = [];
  const taskY = type === "back" ? "startResId" : "endResId";
  const taskX = type === "back" ? "start" : "end";
  connectLine.forEach((i) => {
    const anchY = getTaskYCoordinate(+i[taskY], rowHeight) + (rowHeight * TASK_HEIGHT_OFFSET) / 2;
    const anchX = getTaskXCoordinate(i[taskX]);
    anchorArr.push({ x: anchX, y: anchY });
    workLineArr.push(i.id);
  });
  return { anchorArr, workLineArr };
};
