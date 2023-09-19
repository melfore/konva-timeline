import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage } from "react-konva";
import Konva from "konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { logDebug } from "../../@utils/logger";
import { RESOURCE_HEADER_WIDTH } from "../../@utils/resources";
import GridLayer from "../../grid/Layer";
import ResourcesLayer from "../ResourcesLayer";
import TasksLayer from "../TasksLayer";

interface TimelineProps {}

interface StageSize {
  height: number;
  width: number;
}

const DEFAULT_STAGE_SIZE: StageSize = { height: 0, width: 0 };

const Timeline: FC<TimelineProps> = () => {
  const {
    hideResources,
    columnWidth,
    resourcesContentHeight,
    setDrawRange,
    theme: { color: themeColor },
    timeBlocks,
  } = useTimelineContext();

  const [scrollbarSize, setScrollbarSize] = useState(0);
  const [size, setSize] = useState<StageSize>(DEFAULT_STAGE_SIZE);
  const stageRef = useRef<Konva.Stage>(null);
  const wrapper = useRef<HTMLDivElement>(null);

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

  const fullTimelineWidth = useMemo(() => columnWidth * timeBlocks.length, [columnWidth, timeBlocks]);

  const stageHeight = useMemo(() => size.height, [size]);

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

  const gridStageWrapperStyle = useMemo(
    (): CSSProperties => ({
      ...timelineCommonStyle,
      overflow: "hidden",
      width: fullTimelineWidth,
    }),
    [fullTimelineWidth, timelineCommonStyle]
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
          <Stage ref={stageRef} height={stageHeight} width={stageWidth}>
            <GridLayer height={stageHeight} />
            <TasksLayer />
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
