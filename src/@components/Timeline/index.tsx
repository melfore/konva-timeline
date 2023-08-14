import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage } from "react-konva";
import Konva from "konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { logDebug } from "../../@utils/logger";
import { RESOURCE_HEADER_WIDTH } from "../../@utils/resources";
import { TimelineInput } from "../../@utils/timeline";
import GridLayer from "../GridLayer";
import ResourcesLayer from "../ResourcesLayer";
import TasksLayer from "../TasksLayer";

const COLUMN_WIDTH = 60;

interface StageSize {
  height: number;
  width: number;
}

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineInput> = ({ columnWidth: externalColumnWidth }) => {
  const { hideResources, resolution, resourcesContentHeight, setDrawRange, timeBlocks } = useTimelineContext();

  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const stageRef = useRef<Konva.Stage>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onWindowResize = useCallback(() => {
    if (!wrapper.current) {
      return;
    }

    logDebug("Timeline", "Resizing window...");
    const { clientHeight: height, clientWidth: width } = wrapper.current;
    setSize({ height, width });
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

  const columnWidth = useMemo(() => {
    return !externalColumnWidth || externalColumnWidth < COLUMN_WIDTH ? resolution.columnSize : externalColumnWidth;
  }, [externalColumnWidth, resolution]);

  const stageWidth = useMemo(() => columnWidth * timeBlocks.length, [columnWidth, timeBlocks]);

  const timelineCommonStyle = useMemo(
    (): CSSProperties => ({
      height: resourcesContentHeight,
    }),
    [resourcesContentHeight]
  );

  const timelineWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      border: "1px solid black",
      display: "inline-block",
      overflow: "scroll",
      position: "relative",
      width: "100%",
    }),
    [timelineCommonStyle]
  );

  const resourcesStageWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      backgroundColor: "white",
      boxShadow: "4px 4px 32px 1px #0000000f",
      left: 0,
      position: "sticky",
      top: 0,
      width: RESOURCE_HEADER_WIDTH,
      zIndex: 1,
    }),
    [timelineCommonStyle]
  );

  const gridStageWrapperStyle = useMemo(
    (): CSSProperties => ({
      height: size.height,
      overflow: "hidden",
      width: stageWidth,
    }),
    [size.height, stageWidth]
  );

  const gridWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      left: hideResources ? 0 : RESOURCE_HEADER_WIDTH + 1,
      overflow: "auto",
      position: "absolute",
      top: 0,
      width: hideResources ? "100%" : `calc(100% - ${RESOURCE_HEADER_WIDTH}px)`,
    }),
    [hideResources, timelineCommonStyle]
  );

  return (
    <div style={timelineWrapperStyle}>
      {!hideResources && (
        <div style={resourcesStageWrapperStyle}>
          <Stage height={size.height} width={RESOURCE_HEADER_WIDTH}>
            <ResourcesLayer />
          </Stage>
        </div>
      )}
      <div ref={wrapper} style={gridWrapperStyle}>
        <div style={gridStageWrapperStyle}>
          <Stage ref={stageRef} height={size.height} width={size.width}>
            <GridLayer columnWidth={columnWidth} height={size.height} width={stageWidth} />
            <TasksLayer />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
