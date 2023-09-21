import React, { FC } from "react";

import { KonvaLayer } from "../../../@konva";
import * as TimelineContext from "../../../timeline/TimelineContext";
import ResourceHeader from "../Header";

interface ResourcesLayerProps {}

/**
 * This component renders a set of resources as a Konva Layer.
 * For each resource, a `ResourceHeader` is displayed.
 */
const ResourcesLayer: FC<ResourcesLayerProps> = () => {
  const { resources } = TimelineContext.useTimelineContext();

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
