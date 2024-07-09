import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DateTime } from "luxon";

import { KonvaLine, KonvaText } from "../@konva";
import GridLayer from "../grid/Layer";
import ResourcesLayer from "../resources/components/Layer";
import { findResourceIndexByCoordinate, RESOURCE_HEADER_WIDTH } from "../resources/utils/resources";
import TasksLayer from "../tasks/components/Layer";
import LayerLine from "../tasks/components/LayerLine";
import { TaskTooltipProps } from "../tasks/components/Tooltip";
import {
  getTaskYCoordinate,
  onEndTimeRange,
  TASK_BORDER_RADIUS,
  TASK_HEIGHT_OFFSET,
  TaskDimensions,
} from "../tasks/utils/tasks";
import { logDebug } from "../utils/logger";

import { useTimelineContext } from "./TimelineContext";

interface TimelineProps {}

interface StageSize {
  height: number;
  width: number;
}

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineProps> = () => {
  const {
    hideResources,
    initialDateTime,
    interval,
    columnWidth,
    resourcesContentHeight,
    resolution,
    setDrawRange,
    resources,
    rowHeight,
    theme: { color: themeColor },
    timeBlocks,
    drawRange,
    onAreaSelect,
    enableLines,
    externalRangeInMillis,
  } = useTimelineContext();

  const [scrollbarSize, setScrollbarSize] = useState(0);
  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const [newTask, setNewTask] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [newTaskDimension, setNewTaskDimension] = useState<TaskDimensions>({ row: 0, width: 0, x: 0, y: 0 });
  const [startXClick, setStartXClick] = useState(0);
  const [existTask, setExistTask] = useState<boolean>(false);
  const stageRef = useRef<Konva.Stage>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const [taskTooltip, setTaskTooltip] = useState<TaskTooltipProps | null>(null);

  const onWindowResize = useCallback(() => {
    if (!wrapper.current) {
      return;
    }

    logDebug("Timeline", "Resizing window...");
    const { clientHeight: height, clientWidth: width, offsetHeight, offsetWidth } = wrapper.current;
    const scrollbarSize = Math.max(offsetHeight - height, offsetWidth - width);
    setSize({ height, width });
    setScrollbarSize(scrollbarSize);
  }, []);

  const onStageScroll = useCallback(() => {
    if (!wrapper.current || !stageRef.current) {
      return;
    }

    logDebug("Timeline", "Scrolling stage...");
    const { scrollLeft } = wrapper.current;
    stageRef.current.container().style.transform = `translate(${scrollLeft}px, 0)`;
    stageRef.current.x(-scrollLeft);

    const start = scrollLeft;
    const end = scrollLeft + size.width;
    setDrawRange({ start, end });
    setTaskTooltip(null);
  }, [setDrawRange, size.width]);

  useEffect(() => {
    logDebug("Timeline", "Initial applying of onResize event listener...");
    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    logDebug("Timeline", "Initial applying of onScroll event listener...");
    wrapper.current.addEventListener("scroll", onStageScroll);
    onStageScroll();
  }, [onStageScroll]);

  useEffect(() => {
    logDebug("Timeline", "Applying effects of size changes...");
    onWindowResize();
  }, [hideResources, onWindowResize]);

  useEffect(() => {
    if (!wrapper.current || !initialDateTime) {
      return;
    }

    const timeStart = DateTime.fromMillis(initialDateTime);
    const startOffsetInUnit = timeStart.diff(interval.start!).as(resolution.unit);
    wrapper.current.scrollTo({ left: (startOffsetInUnit * columnWidth) / resolution.sizeInUnits });
  }, [columnWidth, initialDateTime, interval, resolution.sizeInUnits, resolution.unit]);

  const fullTimelineWidth = useMemo(() => columnWidth * timeBlocks.length, [columnWidth, timeBlocks]);

  // const stageHeight = useMemo(() => size.height, [size]);
  // TODO#lb: check if ok
  const stageHeight = resourcesContentHeight;

  const stageWidth = useMemo(() => scrollbarSize + size.width, [scrollbarSize, size]);

  const timelineCommonStyle = useMemo(
    (): CSSProperties => ({
      minHeight: resourcesContentHeight,
    }),
    [resourcesContentHeight]
  );

  const timelineWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      border: `1px solid ${themeColor}`,
      display: "inline-block",
      position: "relative",
      width: "100%",
    }),
    [themeColor, timelineCommonStyle]
  );

  const resourcesStageWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      backgroundColor: "transparent",
      boxShadow: "4px 4px 32px 1px #0000000f",
      borderRight: `1px solid ${themeColor}`,
      left: 0,
      paddingBottom: scrollbarSize,
      position: "sticky",
      top: 0,
      width: RESOURCE_HEADER_WIDTH,
      zIndex: 1,
    }),
    [scrollbarSize, themeColor, timelineCommonStyle]
  );

  const startOffset = useMemo(() => {
    if (externalRangeInMillis.start === +interval.start!) {
      return false;
    }
    return true;
  }, [externalRangeInMillis, interval]);

  const xOfStart = useMemo(() => {
    const timeStart = DateTime.fromMillis(externalRangeInMillis.start);
    const startOffsetInUnit = timeStart.diff(interval.start!).as(resolution.unit);
    return (startOffsetInUnit * columnWidth) / resolution.sizeInUnits;
  }, [externalRangeInMillis, columnWidth, resolution, interval]);

  const xOfEnd = useMemo(() => {
    const timeStart = DateTime.fromMillis(externalRangeInMillis.end);
    const startOffsetInUnit = timeStart.diff(interval.start!).as(resolution.unit);
    return (startOffsetInUnit * columnWidth) / resolution.sizeInUnits;
  }, [externalRangeInMillis, columnWidth, resolution, interval]);

  const endOffset = useMemo(() => {
    return fullTimelineWidth - xOfEnd;
  }, [fullTimelineWidth, xOfEnd]);

  const marginOffset = useMemo(() => {
    return columnWidth * 0.015;
  }, [columnWidth]);

  const gridStageWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      overflow: "hidden",
      width: fullTimelineWidth - endOffset + marginOffset,
    }),
    [fullTimelineWidth, timelineCommonStyle, endOffset, marginOffset]
  );

  const resourcesOffset = useMemo(() => (hideResources ? 0 : RESOURCE_HEADER_WIDTH + 1), [hideResources]);

  const gridWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      left: resourcesOffset,
      overflow: "auto",
      position: "absolute",
      top: 0,
      width: `calc(100% - ${resourcesOffset}px)`,
    }),
    [resourcesOffset, timelineCommonStyle]
  );

  const createNewTaskData = useCallback(() => {
    const taksRange = onEndTimeRange(newTaskDimension, resolution, columnWidth, interval);
    return { resourceId: resources[newTaskDimension.row].id, range: taksRange };
  }, [newTaskDimension, columnWidth, resolution, interval, resources]);

  const onMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!onAreaSelect || existTask) {
        return;
      }
      const stage = e.target.getStage();
      const clickId = e.target._id;
      const stageId = stage!._id;
      if (clickId === stageId) {
        const pointerPosition = stage!.getPointerPosition();
        const resourceIndex = findResourceIndexByCoordinate(pointerPosition!.y, rowHeight, resources);
        const y = getTaskYCoordinate(resourceIndex, rowHeight);
        setStartXClick(drawRange.start + pointerPosition!.x);
        setNewTaskDimension({ row: resourceIndex, width: 1, x: drawRange.start + pointerPosition!.x, y: y });
        setNewTask(true);
        setIsMove(true);
      }
    },
    [resources, rowHeight, drawRange, onAreaSelect, existTask]
  );
  const onMouseUp = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!onAreaSelect || existTask) {
        return;
      }
      const newTask = createNewTaskData();
      onAreaSelect(newTask);
      const stage = e.target.getStage();
      stage!.container().style.cursor = "default";
      setIsMove(false);
      setNewTask(false);
      setNewTaskDimension({ ...newTaskDimension, width: 1 });
    },
    [onAreaSelect, createNewTaskData, newTaskDimension, existTask]
  );

  const onMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (isMove) {
        const stage = e.target.getStage();
        stage!.container().style.cursor = "crosshair";
        const xpos = stage!.getPointerPosition()!.x + drawRange.start;
        const width = xpos - startXClick;
        let controlledX = startXClick;
        const controlledWidth = width < 0 ? -1 * width : width;
        if (width < 0) {
          controlledX = xpos;
        }
        setNewTaskDimension({ ...newTaskDimension, x: controlledX, width: controlledWidth });
      }
    },
    [newTaskDimension, isMove, drawRange, startXClick]
  );

  const taskHeight = useMemo(() => {
    return rowHeight * TASK_HEIGHT_OFFSET;
  }, [rowHeight]);

  return (
    <div style={timelineWrapperStyle}>
      {!hideResources && (
        <div style={resourcesStageWrapperStyle}>
          <Stage height={stageHeight} width={RESOURCE_HEADER_WIDTH}>
            <ResourcesLayer />
          </Stage>
        </div>
      )}
      <div ref={wrapper} style={gridWrapperStyle}>
        <div style={gridStageWrapperStyle}>
          <Stage
            ref={stageRef}
            height={stageHeight}
            width={stageWidth}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            <GridLayer height={stageHeight} />
            {!enableLines ? (
              <TasksLayer
                taskTooltip={taskTooltip}
                setTaskTooltip={setTaskTooltip}
                create={newTask}
                onTaskEvent={setExistTask}
              />
            ) : (
              <LayerLine
                taskTooltip={taskTooltip}
                setTaskTooltip={setTaskTooltip}
                create={newTask}
                onTaskEvent={setExistTask}
              />
            )}
            {startOffset && (
              <Layer>
                <KonvaLine
                  x={xOfStart}
                  y={rowHeight * 0.8}
                  points={[0, 0, 0, stageHeight]}
                  stroke="red"
                  strokeWidth={1}
                  dash={[8, 3]}
                />
                <KonvaText fill="red" x={xOfStart - 13} y={rowHeight * 0.8 - 20} text="Start" width={columnWidth} />
              </Layer>
            )}
            {newTask && (
              <Layer>
                <Rect
                  x={newTaskDimension.x}
                  y={newTaskDimension.y}
                  width={newTaskDimension.width}
                  height={taskHeight}
                  fill="rgba(0, 70, 255, 0.4)"
                  stroke="rgba(0, 70, 255, 0.9)"
                  strokeWidth={1}
                  cornerRadius={TASK_BORDER_RADIUS}
                  dash={[8, 8]}
                />
              </Layer>
            )}
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
