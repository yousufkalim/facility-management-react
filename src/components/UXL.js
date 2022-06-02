import React, { useState } from "react";

import AppBar from "./Appbar";
import SideBar from "./SideBar";

import { useTranslation } from "react-i18next";

import { Store, UpdateStore } from "../StoreContext";

/**
 * User Experience Layout
 */
function UXL({ appBarText, disableAppBar = false, disableSideBar = false, children }) {
  const { t } = useTranslation();

  const store = Store();
  const updateStore = UpdateStore();

  return (
    <div className="container-page-horizontal">
      {!disableAppBar ? <AppBar text={appBarText} /> : <></>}
      <div className="container">
        <div className="uxl_top">
          {store.isSideBar && !disableSideBar ? <SideBar /> : <></>}
          <div
            className="uxl_children_container"
            style={{
              marginTop: !disableAppBar ? "7vh" : "0",
              marginLeft: store.isSideBar && !disableSideBar ? "4vw" : "0",
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
