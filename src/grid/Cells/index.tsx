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
  const dayInfo: {
    thisMonth?: number;
    untilNow?: number;
    backHour: boolean;
    nextHour: boolean;
  }[] = [];
  const visibleDayInfo: {
    backHour?: boolean;
    nextHour?: boolean;
  }[] = [];
  const tz = interval.start!.toISO()?.slice(-6);
  if (unitAbove === "month" || unitAbove === "day" || unitAbove === "week") {
    aboveTimeBlocks.forEach((column, index) => {
      const month = getMonth(column);
      const year = getYear(column);
      const currentMonthDays = daysInMonth(Number(month), Number(year));
      if (index === 0) {
        const startDay = getStartMonthsDay(interval.start!);
        const daysToMonthEnd = currentMonthDays - Number(startDay) + 1;
        dayInfo.push({
          thisMonth: daysToMonthEnd,
          untilNow: daysToMonthEnd,
          backHour: false,
          nextHour: false,
        });
        return;
      }
      const n = dayInfo[index - 1].untilNow! + currentMonthDays;
      const tzStart = column.start!.toISO()?.slice(-6);
      if (tz !== tzStart) {
        if (Number(tz?.slice(1, 3)) - Number(tzStart!.slice(1, 3)) > 0) {
          dayInfo.push({
            thisMonth: currentMonthDays,
            untilNow: n,
            backHour: true,
            nextHour: false,
          });
          return;
        }
        dayInfo.push({
          thisMonth: currentMonthDays,
          untilNow: n,
          backHour: false,
          nextHour: true,
        });
      }

      dayInfo.push({
        thisMonth: currentMonthDays,
        untilNow: n,
        backHour: false,
        nextHour: false,
      });
    });
  }
  visibleTimeBlocks.forEach((column) => {
    const tzStart = column.start!.toISO()?.slice(-6);

    if (tz !== tzStart) {
      if (Number(tz?.slice(1, 3)) - Number(tzStart!.slice(1, 3)) > 0) {
        visibleDayInfo.push({
          backHour: true,
          nextHour: false,
        });
        return;
      }
      visibleDayInfo.push({
        backHour: false,
        nextHour: true,
      });
    }
    visibleDayInfo.push({
      backHour: false,
      nextHour: false,
    });
    return;
  });

  return (
    <KonvaGroup>
      {aboveTimeBlocks.map((column, index) => (
        <GridCellGroup key={`cell-group-${index}`} column={column} index={index} dayInfo={dayInfo} />
      ))}
      {visibleTimeBlocks.map((column, index) => (
        <GridCell
          key={`cell-${index}`}
          column={column}
          height={height}
          index={index}
          visibleDayInfo={visibleDayInfo[index]}
        />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridCells);
