import React, { FC } from "react";

import { Localized } from "../../../../timeline/TimelineContext";

type DefaultToolTip = {
  localized: Localized;
  startDuration: string;
  endDuration: string;
  duration: { time: number; unit: string };
  completedPercentage?: number;
  percentage: string;
  label: string;
};

const DefaultToolTip: FC<DefaultToolTip> = ({
  localized,
  startDuration,
  endDuration,
  duration,
  completedPercentage,
  percentage,
  label,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "ridge",
        borderColor: "black",
        borderWidth: "1px",
        padding: 8,
        boxShadow: "2px 2px 8px black",
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <b
        style={{
          fontFamily: "Times New Roman",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {label}
      </b>
      <br />

      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>{localized.start}: </b>
        &nbsp;&nbsp;&nbsp;
        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{startDuration}</span>
      </div>
      <br></br>
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>{localized.end}: </b>
        &nbsp;&nbsp;&nbsp;
        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{endDuration}</span>
      </div>
      <br></br>

      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>{localized.duration}: </b>
        &nbsp;&nbsp;&nbsp;
        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>
          {duration.time} {duration.unit}(s)
        </span>
      </div>
      <br></br>
      {completedPercentage && (
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>{localized.completed}: </b>
          &nbsp;&nbsp;&nbsp;
          <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{percentage}</span>
        </div>
      )}
    </div>
  );
};

export default DefaultToolTip;
