import React, { memo, useMemo } from "react";

import {
  Resource,
  RESOURCE_HEADER_HEIGHT,
  RESOURCE_HEADER_TEXT_OFFSET,
  RESOURCE_HEADER_WIDTH,
} from "../../@utils/resources";
import { KonvaGroup, KonvaLine, KonvaText } from "../@konva";

interface ResourceHeaderProps extends Resource {
  index: number;
}

/**
 * This component renders a Resource header with text and delimiter line
 *
 * The playground has a simulated canvas with height: 200px and width: 100%
 */
const ResourceHeader = ({ index, label }: ResourceHeaderProps) => {
  const yCoordinate = useMemo(() => RESOURCE_HEADER_HEIGHT * (index + 1), [index]);

  const textYCoordinate = useMemo(() => RESOURCE_HEADER_HEIGHT * index, [index]);

  return (
    <KonvaGroup x={0} y={0}>
      <KonvaGroup x={RESOURCE_HEADER_TEXT_OFFSET} y={RESOURCE_HEADER_TEXT_OFFSET}>
        <KonvaText text={label} y={textYCoordinate} />
      </KonvaGroup>
      <KonvaLine points={[0, 0, RESOURCE_HEADER_WIDTH, 0]} stroke="black" y={yCoordinate} />
    </KonvaGroup>
  );
};

export const ResourceHeaderDocs = ResourceHeader;

export default memo(ResourceHeader);
