import React, { memo } from "react";

import { KonvaGroup } from "../../@konva";
import { useTimelineContext } from "../../timeline/TimelineContext";
import GridCell from "../Cell";
import GridCellGroup from "../CellGroup";

interface GridCellsProps {
  height: number;
}

const GridCells = ({ height }: GridCellsProps) => {
  const { aboveTimeBlocks, visibleTimeBlocks } = useTimelineContext();

  return (
    <KonvaGroup>
      {aboveTimeBlocks.map((column, index) => (
        <GridCellGroup key={`cell-group-${index}`} column={column} height={height} index={index} />
      ))}
      {visibleTimeBlocks.map((column, index) => (
        <GridCell key={`cell-${index}`} column={column} height={height} index={index} />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridCells);
