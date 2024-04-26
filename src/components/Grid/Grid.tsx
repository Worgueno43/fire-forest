import React, { type FC } from "react";

import type { GridComponent } from "./Grid.type";

export const Grid: FC<GridComponent> = ({ grid }) => {
  return (
    <div className="flex flex-col">
      {grid.map((row) => (
        <div
          key={row.length * Math.random()}
          className="flex flex-row justify-center items-center"
        >
          {row.map(({ status }) => (
            <div
              key={status}
              className={`w-10 h-10 m-1 rounded-full ${
                status === "forest"
                  ? "bg-forest"
                  : status === "fire"
                    ? "bg-fire"
                    : "bg-ash"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
