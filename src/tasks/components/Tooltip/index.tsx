import React, { FC, useMemo } from "react";
import { Label } from "react-konva";
import { Html } from "react-konva-utils";
import { DateTime, Duration } from "luxon";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaPoint } from "../../../utils/konva";
import { TaskData } from "../../utils/tasks";

export interface TaskTooltipProps extends KonvaPoint {
  task: TaskData;
}
const rightMarginOffsetX = -230;
const standardMarginOffsetX = 15;
const marginOffsetY = 25;
const sevenHourinMillis = 25200000;
const twoDayinMillis = 172800000;
/**
 * This component renders a task tooltip inside a canvas.
 */
const TaskTooltip: FC<TaskTooltipProps> = ({
  task: {
    label,
    completedPercentage,
    time: { start, end },
    resourceId,
  },
  x,
  y,
}) => {
  const {
    drawRange: { end: drawEnd },
    resources,
  } = useTimelineContext();
  const startDuration = useMemo(() => {
    return DateTime.fromMillis(Number(start)).toFormat("dd/MM/yyyy HH:mm:ss");
  }, [start]);
  const endDuration = useMemo(() => {
    return DateTime.fromMillis(Number(end)).toFormat("dd/MM/yyyy HH:mm:ss");
  }, [end]);
  const percentage = useMemo(() => {
    return completedPercentage + "%";
  }, [completedPercentage]);

  const duration = useMemo(() => {
    const part = Number(end) - Number(start);
    if (part < sevenHourinMillis) {
      const min = Duration.fromObject({ ["millisecond"]: part }).as("minute");
      return { time: Math.round(min * 10) / 10, unit: "min" };
    }
    if (part < twoDayinMillis) {
      const hour = Duration.fromObject({ ["millisecond"]: part }).as("hour");
      return { time: Math.round(hour * 10) / 10, unit: "hour" };
    }
    const day = Duration.fromObject({ ["millisecond"]: part }).as("day");
    return { time: Math.round(day * 10) / 10, unit: "Day" };
  }, [start, end]);

  const offsetToolTip = useMemo(() => {
    if (resourceId === resources[1].id) {
      if (x > drawEnd + rightMarginOffsetX) {
        return { x: rightMarginOffsetX, y: marginOffsetY };
      }
      return { x: standardMarginOffsetX, y: marginOffsetY };
    }

    if (resourceId === resources[resources.length - 1].id) {
      if (x > drawEnd + rightMarginOffsetX) {
        return { x: rightMarginOffsetX, y: marginOffsetY * 4 };
      }
      return { x: standardMarginOffsetX, y: marginOffsetY * 4 };
    }

    if (x > drawEnd + rightMarginOffsetX) {
      return { x: rightMarginOffsetX, y: marginOffsetY * 2 };
    }
    return { x: standardMarginOffsetX, y: marginOffsetY * 2 };
  }, [drawEnd, resourceId, x, resources]);
  return (
    <Label x={x + offsetToolTip.x} y={y - offsetToolTip.y} opacity={1}>
      <Html>
        <div
          style={{
            backgroundColor: "white",
            border: "ridge",
            borderColor: "black",
            borderWidth: "1px",
            padding: 8,
            boxShadow: "2px 2px 8px black",
          }}
        >
          <b style={{ fontFamily: "Times New Roman", fontSize: 16, fontWeight: 700 }}>{label}</b>
          <br />

          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>Start: </b>&nbsp;&nbsp;&nbsp;
            <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{startDuration}</span>
          </div>
          <br></br>
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>End: </b>&nbsp;&nbsp;&nbsp;
            <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{endDuration}</span>
          </div>
          <br></br>

          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>Duration: </b>&nbsp;&nbsp;&nbsp;
            <span style={{ fontFamily: "Courier New", fontSize: 13 }}>
              {duration.time} {duration.unit}(s)
            </span>
          </div>
          <br></br>
          {completedPercentage && (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>Complete: </b>
              &nbsp;&nbsp;&nbsp;
              <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{percentage}</span>
            </div>
          )}
        </div>
      </Html>
    </Label>
  );
};

export default TaskTooltip;
