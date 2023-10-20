import React, { useEffect, useMemo, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { Decorator } from "@storybook/react";

import { generateStoryData } from "../KonvaTimeline/stories-data";
import { TimelineProvider, useTimelineContext } from "../timeline/TimelineContext";

export const COLOR_ARG_TYPE = {
  control: {
    type: "color",
  },
};

export const STORY_DATA = generateStoryData({
  averageTaskDurationInMinutes: 180,
  resourcesCount: 3,
  tasksCount: 10,
  timeRangeInDays: 1,
});

export const LayerDecorator: Decorator = (storyFn) => {
  return <Layer>{storyFn()}</Layer>;
};

export const TaskDecorator: Decorator = (storyFn) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const { width } = wrapperRef.current.getBoundingClientRect();
    setWidth(width);
  }, []);

  return (
    <TimelineProvider
      {...STORY_DATA}
      onTaskClick={(task) => alert(`OnTaskClick event handler - TaskId: ${task.id}`)}
      onTaskChange={(task) => alert(`OnTaskChange event handler - TaskId: ${task.id}`)}
      resolution="1hrs"
    >
      <div ref={wrapperRef}>
        <Stage height={200} width={width}>
          <Layer>{storyFn()}</Layer>
        </Stage>
      </div>
    </TimelineProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TasksLayerInternalDecorator = (storyFn: any) => {
  const { setDrawRange } = useTimelineContext();

  const stageWidth = useMemo(() => 60 * 24, []);

  useEffect(() => {
    setDrawRange({ start: 0, end: stageWidth + 200 });
  }, [setDrawRange, stageWidth]);

  return (
    <div>
      <Stage height={200} width={60 * 24}>
        {storyFn()}
      </Stage>
    </div>
  );
};

export const TasksLayerDecorator: Decorator = (storyFn) => {
  return (
    <TimelineProvider
      {...STORY_DATA}
      onTaskClick={(task) => alert(`OnTaskClick event handler - TaskId: ${task.id}`)}
      onTaskChange={(task) => alert(`OnTaskChange event handler - TaskId: ${task.id}`)}
      resolution="1hrs"
    >
      <TasksLayerInternalDecorator storyFn={storyFn} />
    </TimelineProvider>
  );
};
