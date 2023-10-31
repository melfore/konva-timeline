import React, { useMemo } from "react";
import { Duration, Interval } from "luxon";

import { KonvaGroup, KonvaLine, KonvaRect, KonvaText } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { displayAboveInterval } from "../../utils/time-resolution";

interface GridCellGroupProps {
  column: Interval;
  index: number;
  dayInfo?: { thisMonth: number; untilNow: number }[];
}

const GridCellGroup = ({ column, index, dayInfo }: GridCellGroupProps) => {
  const {
    columnWidth,
    resolution: { sizeInUnits, unit, unitAbove },
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const cellLabel = useMemo(() => displayAboveInterval(column, unitAbove), [column, unitAbove]);

  const points = useMemo(() => [0, 0, 0, rowHeight], [rowHeight]);

  const unitAboveInUnitBelow = useMemo(() => {
    if (unitAbove === "month") {
      return Duration.fromObject({ ["day"]: dayInfo![index].thisMonth }).as("week") / sizeInUnits;
    }
    return Duration.fromObject({ [unitAbove]: 1 }).as(unit) / sizeInUnits;
  }, [sizeInUnits, dayInfo, index, unitAbove, unit]);

  const unitAboveSpanInPx = useMemo(() => unitAboveInUnitBelow * columnWidth, [columnWidth, unitAboveInUnitBelow]);

  const xPos = useMemo(() => {
    if (unitAbove === "month") {
      const pxUntil =
        index !== 0 ? Duration.fromObject({ ["day"]: dayInfo![index - 1].untilNow }).as("week") / sizeInUnits : 0;
      const a = pxUntil * columnWidth;
      return a + unitAboveSpanInPx;
    }
    return index * unitAboveSpanInPx;
  }, [index, unitAboveSpanInPx, columnWidth, sizeInUnits, dayInfo, unitAbove]);

  const yPos = useMemo(() => rowHeight * 0.3, [rowHeight]);

  const xPosLabel = useMemo(() => {
    if (unitAbove === "month") {
      return xPos - unitAboveSpanInPx;
    }
    return index * unitAboveSpanInPx;
  }, [xPos, unitAboveSpanInPx, unitAbove, index]);

  return (
    <KonvaGroup key={`timeslot-${index}`}>
      <KonvaLine x={xPos} y={0} points={points} stroke="gray" strokeWidth={1} />
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
