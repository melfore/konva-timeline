import React, { FC } from "react";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaLayer } from "../@konva";
import ResourceHeader from "../ResourceHeader";

interface ResourcesLayerProps {}

/**
 * This component renders the complete list of resource headers
 */
const ResourcesLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = useTimelineContext();

  return (
    <KonvaLayer>
      {resources.map((resource, index) => (
        <ResourceHeader key={`resource-${resource.id}`} {...resource} index={index} />
      ))}
    </KonvaLayer>
  );
};

export default ResourcesLayer;
