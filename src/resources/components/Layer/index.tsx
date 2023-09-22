import React, { FC } from "react";

import { KonvaLayer } from "../../../@konva";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import ResourceHeader from "../Header";

interface ResourcesLayerProps {}

/**
 * This component renders a Konva layer containing one header for each resource (`ResourceHeader`).
 */
const ResourcesLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = useTimelineContext();

  return (
    <KonvaLayer>
      {resources.map((resource, index) => {
        const isLast = index === resources.length - 1;

        return <ResourceHeader key={`resource-${resource.id}`} index={index} isLast={isLast} resource={resource} />;
      })}
    </KonvaLayer>
  );
};

export default ResourcesLayer;
