import React, { FC, memo } from "react";

import { KonvaLayer } from "../../@konva";
import GridCells from "../Cells";
import GridRows from "../Rows";

interface GridLayerProps {
  height: number;
}

const GridLayer: FC<GridLayerProps> = ({ height }) => {
  // const { interval, resolution } = useTimelineContext();

  // const { sizeInUnits, unit, unitAbove } = resolution;

  // const unitAboveIntervals = useMemo(() => interval.splitBy({ [unitAbove]: 1 }), [interval, unitAbove]);

  // const oneUnitAboveDuration = useMemo(
  //   () => unitAboveIntervals[0].toDuration().as(unit) / sizeInUnits,
  //   [sizeInUnits, unit, unitAboveIntervals]
  // );

  // const oneUnitAboveColumnWidth = useMemo(
  //   () => columnWidth * oneUnitAboveDuration,
  //   [columnWidth, oneUnitAboveDuration]
  // );

  // const gridLabels = useCallback(
  //   (index: number) => {
  //     const rest = index % oneUnitAboveDuration === 0;
  //     if (!rest) {
  //       return null;
  //     }

  //     const unitAboveIntervalIndex = Math.ceil(index / oneUnitAboveDuration);
  //     const unitAboveInterval = unitAboveIntervals[unitAboveIntervalIndex];
  //     const unitAboveStartX = unitAboveIntervalIndex * oneUnitAboveColumnWidth;

  //     return (
  //       <KonvaGroup>
  //         <KonvaRect
  //           fill="transparent"
  //           x={5 + unitAboveStartX}
  //           y={5}
  //           height={18}
  //           width={oneUnitAboveColumnWidth - 10}
  //         />
  //         <KonvaText
  //           fill={themeColor}
  //           x={5 + unitAboveStartX}
  //           y={10}
  //           text={displayInterval(unitAboveInterval, unitAbove)}
  //           align="center"
  //           width={oneUnitAboveColumnWidth - 10}
  //         />
  //         <KonvaLine x={unitAboveStartX} y={0} points={[0, 0, 0, height]} stroke="gray" />
  //       </KonvaGroup>
  //     );
  //   },
  //   [height, oneUnitAboveDuration, oneUnitAboveColumnWidth, themeColor, unitAbove, unitAboveIntervals]
  // );

  return (
    <KonvaLayer>
      <GridRows />
      <GridCells height={height} />
    </KonvaLayer>
  );
};

export default memo(GridLayer);
