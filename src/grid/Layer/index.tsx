import React, { FC, useCallback, useMemo } from "react";

import { KonvaGroup, KonvaLayer, KonvaLine, KonvaRect, KonvaText } from "../../@components/@konva";
import { useTimelineContext } from "../../@contexts/Timeline";
import { displayInterval } from "../../@utils/time-resolution";

interface GridLayerProps {
  columnWidth: number;
  height: number;
  width: number;
}

const GridLayer: FC<GridLayerProps> = ({ columnWidth, height, width }) => {
  const {
    blocksOffset,
    drawRange,
    interval,
    resolution,
    resources,
    theme: { color: themeColor },
    visibleTimeBlocks,
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
              <KonvaLine
                points={[drawRange.start, 50 * (index + 1), drawRange.end, 50 * (index + 1)]}
                stroke={themeColor}
              />
            </KonvaGroup>
          );
        })}
        <KonvaLine points={[0, 0, 0, height]} stroke="blue" />
        {visibleTimeBlocks.map((column, index) => {
          const xPos = columnWidth * (index + blocksOffset);
          return (
            <KonvaGroup key={`timeslot-${index}`}>
              {gridLabels(index + blocksOffset)}
              <KonvaLine x={xPos} y={40} points={[0, 0, 0, height]} stroke="gray" strokeWidth={1} />
              <KonvaRect fill="transparent" x={xPos - 15} y={30} height={15} width={30} />
              <KonvaText fill={themeColor} x={xPos - 15} y={32} text={displayInterval(column, resolution.unit)} />
            </KonvaGroup>
          );
        })}
        {/*
        <KonvaGroup key={`timeslot-last`}>
          <KonvaLine x={columnWidth * visibleTimeBlocks.length} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </KonvaGroup>
        */}
      </KonvaGroup>
    </KonvaLayer>
  );
};

export default GridLayer;
