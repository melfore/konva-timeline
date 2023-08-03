import React, { FC, useMemo } from "react";

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
 */
const ResourceHeader: FC<ResourceHeaderProps> = ({ id, index, label }) => {
  const resourceKey = useMemo(() => `resource-${id}`, [id]);

  return (
    <KonvaGroup x={0} y={0} key={resourceKey}>
      <KonvaLine points={[0, 0, RESOURCE_HEADER_WIDTH, 0]} stroke="blue" y={RESOURCE_HEADER_HEIGHT * (index + 1)} />
      <KonvaGroup x={RESOURCE_HEADER_TEXT_OFFSET} y={RESOURCE_HEADER_TEXT_OFFSET}>
        <KonvaText text={label} y={RESOURCE_HEADER_HEIGHT * index} />
      </KonvaGroup>
    </KonvaGroup>
  );
};

export default ResourceHeader;
