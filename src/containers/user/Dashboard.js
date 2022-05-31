import React, { useState } from "react";

import AppBar from "../../components/Appbar";
import SideBar from "../../components/SideBar";

import { useTranslation } from "react-i18next";

import { Store, UpdateStore } from "../../StoreContext";

function DashboardScreen() {
  const { t } = useTranslation();

  const store = Store();
  const updateStore = UpdateStore();

  return (
    <div className="container-page">
      <AppBar text="Dashboard" />
      <div className="container">
        <div className="dasboard_screen_top">{store.isSideBar ? <SideBar /> : <></>}</div>
      </div>
    </div>
  );
}

export default DashboardScreen;
