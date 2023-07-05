import React, { FC, useCallback } from "react";

import { getResolutionData, Resolution, RESOLUTIONS } from "../../@utils/time-resolution";

interface ResolutionsProps {
  onResolutionChange: (resolution: Resolution) => void;
  resolution: Resolution;
}

const Resolutions: FC<ResolutionsProps> = ({ onResolutionChange, resolution }) => {
  const onClick = useCallback((e: any) => onResolutionChange(e.target.id), [onResolutionChange]);

  return (
    <div style={{ margin: `16px 0`, width: "100%" }}>
      <span>Select Resolution</span>:
      {RESOLUTIONS.map((key) => (
        <button
          id={key}
          key={`button-resolution-${key}`}
          disabled={key === resolution}
          onClick={onClick}
          style={{ margin: "0 8px" }}
        >
          {getResolutionData(key).label}
        </button>
      ))}
    </div>
  );
};

export default Resolutions;
