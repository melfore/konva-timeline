import React, { memo, useMemo } from "react";
import { Interval } from "luxon";

import { KonvaGroup, KonvaLine, KonvaRect, KonvaText } from "../../@components/@konva";
import { useTimelineContext } from "../../@contexts/Timeline";
import { displayInterval } from "../../@utils/time-resolution";

interface GridCellProps {
  column: Interval;
  height: number;
  index: number;
}

const GridCell = ({ column, height, index }: GridCellProps) => {
  const {
    blocksOffset,
    columnWidth,
    resolution: { unit: resolutionUnit },
    theme: { color: themeColor },
  } = useTimelineContext();

  const xPos = useMemo(() => columnWidth * (index + blocksOffset), [blocksOffset, columnWidth, index]);

  const cellLabel = useMemo(() => displayInterval(column, resolutionUnit), [column, resolutionUnit]);

  return (
    <KonvaGroup key={`timeslot-${index}`}>
      {/* {gridLabels(index + blocksOffset)} */}
      <KonvaLine x={xPos} y={40} points={[0, 0, 0, height]} stroke="gray" strokeWidth={1} />
      <KonvaRect fill="transparent" x={xPos - 15} y={30} height={15} width={30} />
      <KonvaText fill={themeColor} x={xPos - 15} y={32} text={cellLabel} />
    </KonvaGroup>
  );
};

export default memo(GridCell);
