import React, { useState } from "react";

import UXL from "../../../components/UXL";

import FooterSVG from "../../../assets/Cornerimage.svg";
import SBSettingsAccountIconUnSelected from "../../../assets/SBSettingsAccountIconUnSelected.svg";
import SBSettingsCategoriesIconUnSelected from "../../../assets/SBSettingsCategoriesIconUnSelected.svg";
import SBSettingsBuildingIconUnSelected from "../../../assets/SBSettingsBuildingIconUnSelected.svg";

import CustomButton from "../../../components/CustomButton";

import EditBuilding from "../../../components/modals/EditBuilding";
import AddBuilding from "../../../components/modals/AddBuilding";

import Buildings from "./AccountSettingsSubComponents/Buildings";
import Account from './AccountSettingsSubComponents/Account';
import Catogories from './AccountSettingsSubComponents/Catogories'

import { Store, UpdateStore } from "../../../StoreContext";

import useWindowSize from "../../../utils/WindowSize";
import Modal from "@mui/material/Modal";

const items = [
  {
    id: 0,
    text: "Invitations envoyées",
  },
  {
    id: 1,
    text: "Utilisateurs",
  },
];

const levels = [
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },
];
const svgArrSideBar = [
  {
    selected: SBSettingsAccountIconUnSelected,
    unselected: SBSettingsAccountIconUnSelected,
    text: "Account",
  },
  {
    selected: SBSettingsBuildingIconUnSelected,
    unselected: SBSettingsBuildingIconUnSelected,
    text: "Bâtiments",
  },
  {
    selected: SBSettingsCategoriesIconUnSelected,
    unselected: SBSettingsCategoriesIconUnSelected,
    text: "Catégories",
  },
];
const AccountSetting = () => {
  const [editBuilding, setEditbuilding] = useState(false);
  const [addBuilding, setAddbuilding] = useState(false);
  const [activeSideBar, setActiveSideBar] = useState("");
  const store = Store();
  const [width] = useWindowSize();

  const handleOpenAddEditBuilding = (CompToRender) => {
    if (CompToRender == "editbuilding") {
      setEditbuilding(true);
      setAddbuilding(false);
    }
    if (CompToRender == "addbuilding") {
      setEditbuilding(false);
      setAddbuilding(true);
    }
  };
  const handleCloseAddEditBuilding = () => {
    setEditbuilding(false);
    setAddbuilding(false);
  };
  return (
    <>
      <UXL appBarText="Account Settings">
        <Modal
          open={editBuilding || addBuilding}
          onClose={() => handleCloseAddEditBuilding()}
          aria-labelledby="Add User"
          aria-describedby="Add User"
        >
          {addBuilding ? <AddBuilding /> : <EditBuilding />}
        </Modal>
        <div
          className="row uxl_children_container"
          style={{
            justifyContent: "flex-start",
            backgroundColor: "#F4F4F4",
            overflow: "hidden",
            width: store?.isSideBar ? "97%" : "100%",
            paddingLeft: store?.isSideBar && width < 667 ? "10%" : "",
          }}
        >
          <div style={{ width: "195pt", paddingTop: "2%" }} className="column ds_ml_container">
            {svgArrSideBar.map((arrData, index) => (
              <div
                style={{ 
                padding: "14px 25px", 
                width: "85%", 
                margin: "3% auto 0% auto", 
                borderRadius: "15px", 
                backgroundColor:activeSideBar==index? "#2F696D":""
              }}
                className="search-msg-cont"
                onClick={() => setActiveSideBar(index)}
              >
                <div
                  style={{ justifyContent: "space-between" }}
                  className="aic  d-flex w50"
                >
                  <img className="settings_icon" src={arrData?.unselected} />
                  <span>{arrData?.text}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "30px" }}></div>
          </div>
          <div style={{ width: "81%", left: "28%" }} className="footer_image_container">
            <img className="footer_image" src={FooterSVG} />
            {activeSideBar == 0 ? <Account/> : null}
            {activeSideBar == 1 ? <Buildings levels={levels} handleOpenAddEditBuilding={handleOpenAddEditBuilding} /> : null}
            {activeSideBar == 2 ? <Catogories/> : null}
          </div>
        </div>
        <CustomButton
          text="Ajouter un bâtiment ➕"
          onClick={() => handleOpenAddEditBuilding("addbuilding")}
          style={{
            position: "absolute",
            right: "20pt",
            bottom: "20pt",
          }}
        />
      </UXL>
    </>
  );
};

export default AccountSetting;
