import React, { FC, memo } from "react";

import { KonvaLayer } from "../../@konva";
import GridCells from "../Cells";
import GridRows from "../Rows";

interface GridLayerProps {
  height: number;
}

const GridLayer: FC<GridLayerProps> = ({ height }) => {
  return (
    <KonvaLayer>
      <GridRows />
      <GridCells height={height} />
    </KonvaLayer>
  );
};

export default memo(GridLayer);
