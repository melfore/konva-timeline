import React, { useMemo } from "react";
import { Duration, Interval } from "luxon";

import { KonvaGroup, KonvaLine, KonvaRect, KonvaText } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { DEFAULT_STROKE_DARK_MODE, DEFAULT_STROKE_LIGHT_MODE } from "../../utils/theme";
import { displayAboveInterval } from "../../utils/time-resolution";

interface GridCellGroupProps {
  column: Interval;
  index: number;
  dayInfo?: {
    thisMonth?: number;
    untilNow?: number;
  };
  hourInfo?: {
    backHour?: boolean;
    nextHour?: boolean;
  };
}

const GridCellGroup = ({ column, index, dayInfo, hourInfo }: GridCellGroupProps) => {
  const {
    columnWidth,
    resolution: { sizeInUnits, unit, unitAbove },
    rowHeight,
    theme: { color: themeColor },
    dateLocale,
  } = useTimelineContext();

  const cellLabel = useMemo(
    () => displayAboveInterval(column, unitAbove, dateLocale!),
    [column, unitAbove, dateLocale]
  );

  const points = useMemo(() => [0, 0, 0, rowHeight], [rowHeight]);

  const unitAboveInUnitBelow = useMemo(() => {
    if (unitAbove === "month") {
      return Duration.fromObject({ ["day"]: dayInfo!.thisMonth }).as("week") / sizeInUnits;
    }

    return Duration.fromObject({ [unitAbove]: 1 }).as(unit) / sizeInUnits;
  }, [sizeInUnits, dayInfo, unitAbove, unit]);

  const unitAboveSpanInPx = useMemo(() => {
    return unitAboveInUnitBelow * columnWidth;
  }, [columnWidth, unitAboveInUnitBelow]);

  const xPos = useMemo(() => {
    if (unitAbove === "month") {
      const pxUntil =
        dayInfo!.untilNow !== dayInfo!.thisMonth
          ? Duration.fromObject({ ["day"]: dayInfo!.untilNow! - dayInfo!.thisMonth! }).as("week") / sizeInUnits
          : 0;

      if (hourInfo!.backHour) {
        const hourInMonthPx = columnWidth / 168;
        return pxUntil * columnWidth + unitAboveSpanInPx + hourInMonthPx;
      }

      if (hourInfo!.nextHour) {
        const hourInMonthPx = columnWidth / 168;
        return pxUntil * columnWidth + unitAboveSpanInPx - hourInMonthPx;
      }

      return pxUntil * columnWidth + unitAboveSpanInPx;
    }

    if (unitAbove === "day") {
      if (hourInfo!.backHour) {
        return index * unitAboveSpanInPx + columnWidth / sizeInUnits;
      }

      if (hourInfo!.nextHour) {
        return index * unitAboveSpanInPx - columnWidth / sizeInUnits;
      }
    }

    if (unitAbove === "week") {
      if (hourInfo!.backHour) {
        return index * unitAboveSpanInPx + columnWidth / 24;
      }

      if (hourInfo!.nextHour) {
        return index * unitAboveSpanInPx - columnWidth / 24;
      }
    }

    return index * unitAboveSpanInPx;
  }, [index, unitAboveSpanInPx, columnWidth, sizeInUnits, dayInfo, unitAbove, hourInfo]);

  const yPos = useMemo(() => rowHeight * 0.3, [rowHeight]);

  const xPosLabel = useMemo(() => {
    if (unitAbove === "month") {
      return xPos - unitAboveSpanInPx;
    }
    if (unitAbove === "day") {
      if (hourInfo!.backHour) {
        return index * unitAboveSpanInPx + columnWidth / sizeInUnits;
      }

      if (hourInfo!.nextHour) {
        return index * unitAboveSpanInPx - columnWidth / sizeInUnits;
      }
    }
    return index * unitAboveSpanInPx;
  }, [xPos, unitAboveSpanInPx, unitAbove, index, columnWidth, sizeInUnits, hourInfo]);
  const stroke = useMemo(() => {
    if (themeColor === "black") {
      return DEFAULT_STROKE_LIGHT_MODE;
    }
    return DEFAULT_STROKE_DARK_MODE;
  }, [themeColor]);

  return (
    <KonvaGroup key={`timeslot-${index}`}>
      <KonvaLine x={xPos} y={0} points={points} stroke={stroke} strokeWidth={1} />
      <KonvaRect fill="transparent" x={xPos} y={yPos - 10} height={15} width={unitAboveSpanInPx} />
      <KonvaText
        align="center"
        fill={themeColor}
        x={xPosLabel}
        y={yPos - 8}
        text={cellLabel}
        width={unitAboveSpanInPx}
      />
    </KonvaGroup>
  );
};

export default GridCellGroup;
