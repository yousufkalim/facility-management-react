import React, { useState } from "react";

import SBDashboardSelectedSVG from "../assets/SBDashboardSelected.svg";
import SBDashboardUnselectedSVG from "../assets/SBDashboardUnselected.svg";
import SBStatisticsSelectedSVG from "../assets/SBStatisticsSelected.svg";
import SBStatisticsUnselectedSVG from "../assets/SBStatisticsUnselected.svg";
import SBEmployeesSelectedSVG from "../assets/SBEmployeesSelected.svg";
import SBEmployeesUnselectedSVG from "../assets/SBEmployeesUnselected.svg";
import SBSignalSelectedSVG from "../assets/SBSignalSelected.svg";
import SBSignalUnselectedSVG from "../assets/SBSignalUnselected.svg";
import SBEventsSelectedSVG from "../assets/SBEventsSelected.svg";
import SBEventsUnselectedSVG from "../assets/SBEventsUnselected.svg";

import { Store, UpdateStore } from "../StoreContext";

import { useSpring, animated } from "react-spring";

const svgArr = [
  {
    selected: SBDashboardSelectedSVG,
    unselected: SBDashboardUnselectedSVG,
  },
  {
    selected: SBStatisticsSelectedSVG,
    unselected: SBStatisticsUnselectedSVG,
  },
  {
    selected: SBEmployeesSelectedSVG,
    unselected: SBEmployeesUnselectedSVG,
  },
  {
    selected: SBSignalSelectedSVG,
    unselected: SBSignalUnselectedSVG,
  },
  {
    selected: SBEventsSelectedSVG,
    unselected: SBEventsUnselectedSVG,
  },
];

function SideBar({ color, sticky = true, divStyle }) {
  const store = Store();
  const updateStore = UpdateStore();

  const animationProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    <animated.div
      className="sidebar_container"
      style={{
        backgroundColor: color ?? "#2F696D",
        position: sticky ? "fixed" : "inherit",
        ...divStyle,
        ...animationProps,
      }}
    >
      <div className="sidebar_top">
        <div className="sidebar_column1">
          {svgArr.map((_, __) => (
            <SideBarMenuItem
              imgObj={_}
              isSelected={__ == store.sideBarSelectIndex}
              cb={() => {
                updateStore({
                  sideBarSelectIndex: __,
                });
              }}
            />
          ))}
        </div>
      </div>
    </animated.div>
  );
}

function SideBarMenuItem({ imgObj, isSelected, cb }) {
  return (
    <div
      style={{
        height: "8vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#F4F4F4" : "transparent",
      }}
      onClick={cb}
    >
      <img
        className="image_container"
        style={{
          height: "20pt",
          width: "20pt",
        }}
        src={isSelected ? imgObj.selected : imgObj.unselected}
      />
    </div>
  );
}

export default SideBar;
