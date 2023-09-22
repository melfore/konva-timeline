import React, { useEffect, useMemo, useRef } from "react";
import { Layer, Stage } from "react-konva";

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

export const LayerDecorator = (storyFn: any) => {
  return <Layer>{storyFn()}</Layer>;
};

export const TaskDecorator = (storyFn: any) => {
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
      onTaskDrag={(task) => alert(`OnTaskDrag event handler - TaskId: ${task.id}`)}
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

const TasksLayerInternalDecorator = ({ storyFn }: any) => {
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

export const TasksLayerDecorator = (storyFn: any) => {
  return (
    <TimelineProvider
      {...STORY_DATA}
      onTaskClick={(task) => alert(`OnTaskClick event handler - TaskId: ${task.id}`)}
      onTaskDrag={(task) => alert(`OnTaskDrag event handler - TaskId: ${task.id}`)}
      resolution="1hrs"
    >
      <TasksLayerInternalDecorator storyFn={storyFn} />
    </TimelineProvider>
  );
};