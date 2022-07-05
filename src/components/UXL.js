import React, { useState, useEffect } from "react";

import AppBar from "./Appbar";
import SideBar from "./SideBar";

import { useTranslation } from "react-i18next";

import { Store, UpdateStore } from "../StoreContext";

/**
 * User Experience Layout
 */
 function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  return size;
}

function UXL({ appBarText, disableAppBar = false, disableSideBar = false, children }) {
  const { t } = useTranslation();

  const [width] = useWindowSize();
  const store = Store();
  const updateStore = UpdateStore();
  
console.log(width);
  return (
    <div className="container-page-horizontal">
      {!disableAppBar ? <AppBar text={appBarText} /> : <></>}
      <div className="container">
        <div className="uxl_top">
          {store.isSideBar && !disableSideBar ? <SideBar /> : <></>}
          <div
            // className="wh100"
            style={{
              marginTop: !disableAppBar ? "7vh" : "0",
              marginLeft: store.isSideBar && !disableSideBar && width>667 ? "4vw" : "0",
              width:"100%",
              height:"max-content"
              // width:  store.isSideBar && !disableSideBar ? "100%" :"98%"
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UXL;
