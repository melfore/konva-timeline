import React, { FC } from "react";

import Timeline from "../@components/Timeline";
import { TimelineProvider, TimelineProviderProps } from "../@contexts/Timeline";

const KonvaTimeline: FC<TimelineProviderProps> = (props) => {
  return (
    <TimelineProvider {...props}>
      <Timeline />
    </TimelineProvider>
  );
};

export default KonvaTimeline;
