import React, { FC, useCallback, useMemo } from "react";

import { useTimelineContext } from "../../@contexts/Timeline";
import { displayInterval } from "../../@utils/time-resolution";
import { KonvaGroup, KonvaLayer, KonvaLine, KonvaRect, KonvaText } from "../@konva";

interface GridLayerProps {
  columnWidth: number;
  height: number;
  width: number;
}

const GridLayer: FC<GridLayerProps> = ({ columnWidth, height, width }) => {
  const {
    drawRange,
    interval,
    resolution,
    resources,
    theme: { color: themeColor },
    timeBlocks,
  } = useTimelineContext();

  const { sizeInUnits, unit, unitAbove } = resolution;

  const unitAboveIntervals = useMemo(() => interval.splitBy({ [unitAbove]: 1 }), [interval, unitAbove]);

  const oneUnitAboveDuration = useMemo(
    () => unitAboveIntervals[0].toDuration().as(unit) / sizeInUnits,
    [sizeInUnits, unit, unitAboveIntervals]
  );

  const oneUnitAboveColumnWidth = useMemo(
    () => columnWidth * oneUnitAboveDuration,
    [columnWidth, oneUnitAboveDuration]
  );

  const gridLabels = useCallback(
    (index: number) => {
      const rest = index % oneUnitAboveDuration === 0;
      if (!rest) {
        return null;
      }

      const unitAboveIntervalIndex = Math.ceil(index / oneUnitAboveDuration);
      const unitAboveInterval = unitAboveIntervals[unitAboveIntervalIndex];
      const unitAboveStartX = unitAboveIntervalIndex * oneUnitAboveColumnWidth;

      return (
        <KonvaGroup>
          <KonvaRect
            fill="transparent"
            x={5 + unitAboveStartX}
            y={5}
            height={18}
            width={oneUnitAboveColumnWidth - 10}
          />
          <KonvaText
            fill={themeColor}
            x={5 + unitAboveStartX}
            y={10}
            text={displayInterval(unitAboveInterval, unitAbove)}
            align="center"
            width={oneUnitAboveColumnWidth - 10}
          />
          <KonvaLine x={unitAboveStartX} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </KonvaGroup>
      );
    },
    [height, oneUnitAboveDuration, oneUnitAboveColumnWidth, themeColor, unitAbove, unitAboveIntervals]
  );

  return (
    <KonvaLayer>
      <KonvaGroup>
        {resources.map(({ id }, index) => {
          return (
            <KonvaGroup key={`heading-${id}`}>
              <KonvaLine x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke={themeColor} />
            </KonvaGroup>
          );
        })}
        <KonvaLine points={[0, 0, 0, height]} stroke="blue" />
        {timeBlocks.map((column, index) => {
          const xPos = columnWidth * index;
          if (xPos < drawRange.start * -2 || xPos > drawRange.end * 2) {
            return null;
          }

          return (
            <KonvaGroup key={`timeslot-${index}`}>
              {gridLabels(index)}
              <KonvaLine x={columnWidth * index} y={40} points={[0, 0, 0, height]} stroke="gray" strokeWidth={1} />
              <KonvaRect fill="transparent" x={columnWidth * index - 15} y={30} height={15} width={30} />
              <KonvaText
                fill={themeColor}
                x={columnWidth * index - 15}
                y={32}
                text={displayInterval(column, resolution.unit)}
              />
            </KonvaGroup>
          );
        })}
        <KonvaGroup key={`timeslot-last`}>
          <KonvaLine x={columnWidth * timeBlocks.length} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </KonvaGroup>
      </KonvaGroup>
    </KonvaLayer>
  );
};

export default GridLayer;
