import React, { memo } from "react";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaGroup } from "../../@konva";
import GridRow from "../Row";

const GridRows = () => {
  const { resources } = useTimelineContext();

  return (
    <KonvaGroup>
      {resources.map(({ id }, index) => (
        <GridRow key={`grid-row-line-${id}`} index={index} />
      ))}
    </KonvaGroup>
  );
};

export default memo(GridRows);
