import React, { FC } from "react";

import Timeline from "../@components/Timeline";
import { TimelineProvider } from "../@contexts/Timeline";
import { TimelineInput } from "../@utils/timeline";

interface KonvaTimelineProps extends TimelineInput {
  taskTooltipContent?: (task: any) => React.ReactNode;
}

const KonvaTimeline: FC<KonvaTimelineProps> = (props) => {
  return (
    <TimelineProvider {...props}>
      <Timeline {...props} />
    </TimelineProvider>
  );
};

export default KonvaTimeline;
