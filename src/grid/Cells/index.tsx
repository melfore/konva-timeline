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
  const dayInfo: { thisMonth?: number; untilNow?: number; backHour: boolean; forNowHour: boolean }[] = [];
  if (unitAbove === "month" || unitAbove === "day") {
    aboveTimeBlocks.forEach((column, index) => {
      const hrs = column.end!.diff(column.start!, "hour").hours;
      const month = getMonth(column);
      const year = getYear(column);
      const currentMonthDays = daysInMonth(Number(month), Number(year));
      const bchour = hrs > 24 ? true : false;
      if (index === 0) {
        const startDay = getStartMonthsDay(interval.start!);
        const daysToMonthEnd = currentMonthDays - Number(startDay) + 1;
        dayInfo.push({ thisMonth: daysToMonthEnd, untilNow: daysToMonthEnd, backHour: bchour, forNowHour: false });
        return;
      }
      const forNowHour = dayInfo[index - 1].forNowHour ? true : dayInfo[index - 1].backHour ? true : false;
      const n = dayInfo[index - 1].untilNow! + currentMonthDays;
      dayInfo.push({ thisMonth: currentMonthDays, untilNow: n, backHour: bchour, forNowHour: forNowHour });
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
