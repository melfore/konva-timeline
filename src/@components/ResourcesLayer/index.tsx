import React, { FC } from "react";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaLayer } from "../../@konva";
import ResourceHeader from "../ResourceHeader";

interface ResourcesLayerProps {}

/**
 * This component renders a set of resources as a Konva Layer.
 * For each resource, a `ResourceHeader` is displayed.
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
