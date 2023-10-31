import React, { memo } from "react";

import { KonvaGroup } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import { daysInMonth, getMonth, getStartMonthsDay, getYear } from "../../utils/time-resolution";
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
  const dayInfo: { thisMonth: number; untilNow: number }[] = [];
  if (unitAbove === "month") {
    aboveTimeBlocks.forEach((column, index) => {
      const month = getMonth(column);
      const year = getYear(column);
      const currentMonthDays = daysInMonth(Number(month), Number(year));
      if (index === 0) {
        const startDay = getStartMonthsDay(interval.start!);
        const daysToMonthEnd = currentMonthDays - Number(startDay) + 1;
        dayInfo.push({ thisMonth: daysToMonthEnd, untilNow: daysToMonthEnd });
        return;
      }
      const n = dayInfo[index - 1].untilNow + currentMonthDays;
      dayInfo.push({ thisMonth: currentMonthDays, untilNow: n });
    });
  }
  return (
    <KonvaGroup>
      {aboveTimeBlocks.map((column, index) => (
        <GridCellGroup key={`cell-group-${index}`} column={column} index={index} dayInfo={dayInfo} />
      ))}
      {visibleTimeBlocks.map((column, index) => (
        <GridCell key={`cell-${index}`} column={column} height={height} index={index} />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridCells);
