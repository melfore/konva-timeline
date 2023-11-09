import React, { memo, useMemo } from "react";

import { KonvaGroup } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { getAboveTimeBlocksVisible, getDaysNumberOfMonths, getTimeBlocksTzInfo } from "../../utils/timeBlockArray";
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
    () => getDaysNumberOfMonths(unitAbove, aboveTimeBlocks, interval),
    [unitAbove, aboveTimeBlocks, interval]
  );

  const aboveHourInfo = useMemo(() => getTimeBlocksTzInfo(aboveTimeBlocks, tz), [tz, aboveTimeBlocks]);
  const visibileHourInfo = useMemo(() => getTimeBlocksTzInfo(visibleTimeBlocks, tz), [tz, visibleTimeBlocks]);

  const startUnitAbove = useMemo(
    () => (visibleTimeBlocks.length !== 0 ? visibleTimeBlocks[0].start!.startOf(unitAbove) : null),
    [visibleTimeBlocks, unitAbove]
  );
  const endUnitAbove = useMemo(
    () =>
      visibleTimeBlocks.length !== 0 ? visibleTimeBlocks[visibleTimeBlocks.length - 1].end!.endOf(unitAbove) : null,
    [visibleTimeBlocks, unitAbove]
  );

  const arrayIndex: number[] = useMemo(() => {
    if (visibleTimeBlocks) {
      return [];
    }
    return [];
  }, [visibleTimeBlocks]);

  const aboveTimeBlocksVisible = useMemo(
    () => getAboveTimeBlocksVisible(visibleTimeBlocks, aboveTimeBlocks, startUnitAbove, endUnitAbove, arrayIndex),
    [visibleTimeBlocks, aboveTimeBlocks, startUnitAbove, endUnitAbove, arrayIndex]
  );
  return (
    <KonvaGroup>
      {aboveTimeBlocksVisible.map((column, index) => {
        return (
          <GridCellGroup
            key={`cell-group-${index}`}
            column={column}
            index={arrayIndex[index]}
            dayInfo={dayInfo[arrayIndex[index]]}
            hourInfo={aboveHourInfo[arrayIndex[index]]}
          />
        );
      })}
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
