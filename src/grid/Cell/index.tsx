import React, { memo, useMemo } from "react";
import { Interval } from "luxon";

import { KonvaGroup, KonvaLine, KonvaText } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { DEFAULT_GRID_COLUMN_WIDTH } from "../../utils/dimensions";
import { DEFAULT_STROKE_DARK_MODE, DEFAULT_STROKE_LIGHT_MODE } from "../../utils/theme";
import { displayInterval } from "../../utils/time-resolution";

interface GridCellProps {
  column: Interval;
  height: number;
  index: number;
  hourInfo: {
    backHour?: boolean;
    nextHour?: boolean;
  };
}

const GridCell = ({ column, height, index, hourInfo: visibleDayInfo }: GridCellProps) => {
  const {
    blocksOffset,
    columnWidth,
    resolution: { unit: resolutionUnit },
    rowHeight,
    dateLocale,
    theme: { color: themeColor },
  } = useTimelineContext();

  const cellLabel = useMemo(() => {
    return displayInterval(column, resolutionUnit, dateLocale!);
  }, [column, resolutionUnit, dateLocale]);

  const xPos = useMemo(() => {
    if (resolutionUnit === "day") {
      if (visibleDayInfo.backHour) {
        return columnWidth * (index + blocksOffset) + columnWidth / 24;
      }

      if (visibleDayInfo.nextHour) {
        return columnWidth * (index + blocksOffset) - columnWidth / 24;
      }
    }
    if (resolutionUnit === "week") {
      if (visibleDayInfo.backHour) {
        return columnWidth * (index + blocksOffset) + columnWidth / 168;
      }

      if (visibleDayInfo.nextHour) {
        return columnWidth * (index + blocksOffset) - columnWidth / 168;
      }
    }

    return columnWidth * (index + blocksOffset);
  }, [blocksOffset, columnWidth, index, visibleDayInfo, resolutionUnit]);

  const yPos = useMemo(() => rowHeight * 0.8, [rowHeight]);

  const stroke = useMemo(() => {
    if (themeColor === "black") {
      return DEFAULT_STROKE_LIGHT_MODE;
    }
    return DEFAULT_STROKE_DARK_MODE;
  }, [themeColor]);

  const fontSize = useMemo(() => {
    const maxSubtractSize = resolutionUnit === "hour" ? 5 : 4;
    const percentMultiplier = maxSubtractSize / 100;
    const widthDifference = DEFAULT_GRID_COLUMN_WIDTH - columnWidth;
    const negative = (100 / 40) * widthDifference * percentMultiplier;
    return negative >= 0 && negative <= maxSubtractSize ? negative : 0;
  }, [columnWidth, resolutionUnit]);

  return (
    <KonvaGroup key={`timeslot-${index}`}>
      <KonvaLine x={xPos} y={yPos} points={[0, 0, 0, height]} stroke={stroke} strokeWidth={1} />
      <KonvaText
        fill={themeColor}
        x={xPos}
        y={yPos - 8}
        text={cellLabel}
        width={columnWidth}
        align="center"
        fontSize={12 - fontSize}
      />
    </KonvaGroup>
  );
};

export default memo(GridCell);
