import { Interval } from "luxon";

import { daysInMonth, getMonth, getStartMonthsDay, getYear, Scale } from "./time-resolution";

interface VisibleHourInfoProps {
  backHour?: boolean;
  nextHour?: boolean;
}

interface DayDetailProps {
  thisMonth?: number;
  untilNow?: number;
}

export const timeBlockTz = (timeBlock: Interval[], initialTz?: string) => {
  const dayInfoArray: VisibleHourInfoProps[] = [];

  timeBlock.forEach((column) => {
    const tzStart = column.start!.toISO()?.slice(-6);

    if (initialTz !== tzStart) {
      if (Number(initialTz?.slice(1, 3)) - Number(tzStart!.slice(1, 3)) > 0) {
        dayInfoArray.push({
          backHour: true,
          nextHour: false,
        });

        return;
      }

      dayInfoArray.push({
        backHour: false,
        nextHour: true,
      });
    }

    dayInfoArray.push({
      backHour: false,
      nextHour: false,
    });

    return;
  });

  return dayInfoArray;
};

export const dayDetail = (unitAbove: Scale, aboveTimeBlocks: Interval[], interval: Interval) => {
  if (unitAbove === "month") {
    const dayInfo: DayDetailProps[] = [];

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
        });

        return;
      }

      const n = dayInfo[index - 1].untilNow! + currentMonthDays;
      dayInfo.push({
        thisMonth: currentMonthDays,
        untilNow: n,
      });
    });

    return dayInfo;
  }
  return [];
};
