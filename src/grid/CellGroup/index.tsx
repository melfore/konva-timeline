import React, { useMemo } from "react";
import { Duration, Interval } from "luxon";

import { KonvaGroup, KonvaLine, KonvaRect, KonvaText } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { displayAboveInterval } from "../../utils/time-resolution";

interface GridCellGroupProps {
  column: Interval;
  height: number;
  index: number;
}

const GridCellGroup = ({ column, height, index }: GridCellGroupProps) => {
  const {
    columnWidth,
    resolution: { sizeInUnits, unit, unitAbove },
    rowHeight,
    theme: { color: themeColor },
  } = useTimelineContext();

  const cellLabel = useMemo(() => displayAboveInterval(column, unitAbove), [column, unitAbove]);

  const points = useMemo(() => [0, 0, 0, height], [height]);

  const unitAboveInUnitBelow = useMemo(
    () => Duration.fromObject({ [unitAbove]: 1 }).as(unit) / sizeInUnits,
    [sizeInUnits, unit, unitAbove]
  );

  const unitAboveSpanInPx = useMemo(() => unitAboveInUnitBelow * columnWidth, [columnWidth, unitAboveInUnitBelow]);

  const xPos = useMemo(() => index * unitAboveSpanInPx, [index, unitAboveSpanInPx]);

  const yPos = useMemo(() => rowHeight * 0.3, [rowHeight]);

  return (
    <KonvaGroup key={`timeslot-${index}`}>
      <KonvaLine x={xPos} y={0} points={points} stroke="gray" strokeWidth={1} />
      <KonvaRect fill="transparent" x={xPos} y={yPos - 10} height={15} width={unitAboveSpanInPx} />
      <KonvaText align="center" fill={themeColor} x={xPos} y={yPos - 8} text={cellLabel} width={unitAboveSpanInPx} />
    </KonvaGroup>
  );
};

export default GridCellGroup;
