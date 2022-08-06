import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SBDashboardSelectedSVG from '../assets/SBDashboardSelected.svg';
import SBDashboardUnselectedSVG from '../assets/SBDashboardUnselected.svg';
import SBStatisticsSelectedSVG from '../assets/SBStatisticsSelected.svg';
import SBStatisticsUnselectedSVG from '../assets/SBStatisticsUnselected.svg';
import SBEmployeesSelectedSVG from '../assets/SBEmployeesSelected.svg';
import SBEmployeesUnselectedSVG from '../assets/SBEmployeesUnselected.svg';
import SBSignalSelectedSVG from '../assets/SBSignalSelected.svg';
import SBSignalUnselectedSVG from '../assets/SBSignalUnselected.svg';
import SBEventsSelectedSVG from '../assets/SBEventsSelected.svg';
import SBEventsUnselectedSVG from '../assets/SBEventsUnselected.svg';

import SBDashboardNotifcationUnSelected from '../assets/SBDashboardNotifcationUnSelected.svg';
import SBDashboardInfoUnselected from '../assets/SBDashboardInfoUnselected.svg';
import SBDashboardSettingsUnSelected from '../assets/SBDashboardSettingsUnSelected.svg';

import { Store, UpdateStore } from '../StoreContext';

import { useSpring, animated } from 'react-spring';

const svgArrTop = [
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
  // {
  //   selected: SBSignalSelectedSVG,
  //   unselected: SBSignalUnselectedSVG,
  // },
  // {
  //   selected: SBEventsSelectedSVG,
  //   unselected: SBEventsUnselectedSVG,
  // },
];

const svgArrBottom = [
  // {
  //   selected: SBDashboardNotifcationUnSelected,
  //   unselected: SBDashboardNotifcationUnSelected,
  // },
  // {
  //   selected: SBDashboardInfoUnselected,
  //   unselected: SBDashboardInfoUnselected,
  // },
  {
    selected: SBDashboardSettingsUnSelected,
    unselected: SBDashboardSettingsUnSelected,
  },
];

const handleNavigation = (navigate, index) => {
  switch (index) {
    case 0:
      navigate('/dashboard');
      break;
    case 1:
      navigate('/statistics');
      break;
    case 2:
      navigate('/allusers');
      break;
    case 3:
      navigate('/settings');
      break;
    default:
      break;
  }
};

function SideBar({ color, sticky = true, divStyle }) {
  const navigate = useNavigate();

  const store = Store();
  const updateStore = UpdateStore();

  const animationProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    <animated.div
      className="sidebar_container"
      style={{
        backgroundColor: color ?? '#2F696D',
        position: sticky ? 'fixed' : 'inherit',
        ...divStyle,
        ...animationProps,
      }}
    >
      <div className="sidebar_top">
        <div className="sidebar_column1">
          {svgArrTop.map((_, __) => (
            <SideBarMenuItem
              imgObj={_}
              isSelected={__ == store.sideBarSelectIndex}
              cb={() => {
                updateStore({
                  sideBarSelectIndex: __,
                });
                handleNavigation(navigate, __);
              }}
            />
          ))}
        </div>
      </div>
      <div className="sidebar_top">
        <div className="sidebar_column1">
          {svgArrBottom.map((_, __) => (
            <SideBarMenuItem
              imgObj={_}
              isSelected={__ + svgArrTop.length == store.sideBarSelectIndex}
              cb={() => {
                updateStore({
                  sideBarSelectIndex: __ + svgArrTop.length,
                });
                handleNavigation(navigate, __ + svgArrTop.length);
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
      className="w100 column ajc"
      style={{
        height: '8vh',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#F4F4F4' : 'transparent',
      }}
      onClick={cb}
    >
      <img
        className="image_container"
        style={{
          height: '20pt',
          width: '20pt',
        }}
        src={isSelected ? imgObj.selected : imgObj.unselected}
      />
    </div>
  );
}

export default SideBar;
