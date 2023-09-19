import React, { memo } from "react";

import { KonvaGroup } from "../../@components/@konva";
import { useTimelineContext } from "../../@contexts/Timeline";
import GridCell from "../Cell";

interface GridCellsProps {
  height: number;
}

const GridCells = ({ height }: GridCellsProps) => {
  const { visibleTimeBlocks } = useTimelineContext();

  return (
    <KonvaGroup>
      {visibleTimeBlocks.map((column, index) => (
        <GridCell key={`cell-${index}`} column={column} height={height} index={index} />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridCells);
