import React, { FC, useCallback } from "react";
import { Group, Layer, Line, Rect, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { displayInterval } from "../../@utils/time-resolution";

interface GridLayerProps {
  columnWidth: number;
  height: number;
  width: number;
}

const GridLayer: FC<GridLayerProps> = ({ columnWidth, height, width }) => {
  const { interval, resolution, resources, timeBlocks } = useTimelineContext();

  const { sizeInUnits, unit, unitAbove } = resolution;

  const unitAboveIntervals = interval.splitBy({ [unitAbove]: 1 });
  const oneUnitAboveDuration = unitAboveIntervals[0].toDuration().as(unit) / sizeInUnits;
  const oneUnitAboveColumnWidth = columnWidth * oneUnitAboveDuration;

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
        <Group>
          <Rect fill="white" x={5 + unitAboveStartX} y={5} height={18} width={oneUnitAboveColumnWidth - 10} />
          <Text
            x={5 + unitAboveStartX}
            y={10}
            text={displayInterval(unitAboveInterval, unitAbove)}
            align="center"
            width={oneUnitAboveColumnWidth - 10}
          />
          <Line x={unitAboveStartX} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </Group>
      );
    },
    [height, oneUnitAboveDuration, oneUnitAboveColumnWidth, unitAbove, unitAboveIntervals]
  );

  return (
    <Layer>
      <Group>
        {resources.map(({ id }, index) => (
          <Group key={`heading-${id}`}>
            <Line x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke="black" />
          </Group>
        ))}
        <Line points={[0, 0, 0, height]} stroke="blue" />
        {timeBlocks.map((column, index) => (
          <Group key={`timeslot-${index}`}>
            {gridLabels(index)}
            <Line x={columnWidth * index} y={40} points={[0, 0, 0, height]} stroke="gray" strokeWidth={1} />
            <Rect fill="white" x={columnWidth * index - 15} y={30} height={15} width={30} />
            <Text x={columnWidth * index - 15} y={32} text={displayInterval(column, resolution.unit)} />
          </Group>
        ))}
        <Group key={`timeslot-last`}>
          <Line x={columnWidth * timeBlocks.length} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </Group>
      </Group>
    </Layer>
  );
};

export default GridLayer;
