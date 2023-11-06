import React, { memo, useMemo } from "react";

import { KonvaGroup } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { dayDetail, timeBlockTz } from "../../utils/timeBlockArray";
import GridCell from "../Cell";
import GridCellGroup from "../CellGroup";

interface GridCellsProps {
  height: number;
}

const GridCells = ({ height }: GridCellsProps) => {
  const {
    interval,
    aboveTimeBlocks,
    visibleTimeBlocks,
    resolution: { unitAbove },
  } = useTimelineContext();

  const tz = useMemo(() => interval.start!.toISO()!.slice(-6), [interval]);

  const dayInfo = useMemo(
    () => dayDetail(unitAbove, aboveTimeBlocks, interval),
    [unitAbove, aboveTimeBlocks, interval]
  );

  const aboveHourInfo = useMemo(() => timeBlockTz(aboveTimeBlocks, tz), [tz, aboveTimeBlocks]);
  const visibileHourInfo = useMemo(() => timeBlockTz(visibleTimeBlocks, tz), [tz, visibleTimeBlocks]);

  return (
    <KonvaGroup>
      {aboveTimeBlocks.map((column, index) => (
        <GridCellGroup
          key={`cell-group-${index}`}
          column={column}
          index={index}
          dayInfo={dayInfo}
          hourInfo={aboveHourInfo[index]}
        />
      ))}
      {visibleTimeBlocks.map((column, index) => (
        <GridCell
          key={`cell-${index}`}
          column={column}
          height={height}
          index={index}
          hourInfo={visibileHourInfo[index]}
        />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridCells);
