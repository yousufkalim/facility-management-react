import React, { useState } from "react";

import UXL from "../../../components/UXL";

import FooterSVG from "../../../assets/Cornerimage.svg";
import SBSettingsAccountIconUnSelected from "../../../assets/SBSettingsAccountIconUnSelected.svg";
import SBSettingsCategoriesIconUnSelected from "../../../assets/SBSettingsCategoriesIconUnSelected.svg";
import SBSettingsBuildingIconUnSelected from "../../../assets/SBSettingsBuildingIconUnSelected.svg";

import EditBuilding from "../../../components/modals/EditBuilding";
import AddBuilding from "../../../components/modals/AddBuilding";

import Buildings from "./Buildings";
import Account from './Account';
import Catogories from './Catogories'

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
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },
  {
    text: "Level A",
  },
  {
    text: "Level B",
  },
  {
    text: "Level C",
  },{
    text: "Level A",
  },
  {
    text: "Level B",
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
  const [editUserProfile, setEditUserProfile] = useState(false)
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
            justifyContent: "flex-start !important;",
            backgroundColor: "#F4F4F4",
            overflow: "hidden",
            width:"100%",
            minHeight: "100%",
            paddingLeft: store?.isSideBar && width < 667 ? "10%" : "",
          }}
        >
          <div style={{ 
            width: width<992?"100%":"18vw", 
            minHeight:width<992?"40%":"100%", 
            paddingTop: "2%" 
            }} className="column ds_ml_container">
            {svgArrSideBar.map((arrData, index) => (
              <div
                style={{ 
                padding: "12px 25px", 
                width:width<575?"50%":width<992?"30%":"83%",
                margin: "3% auto 0% auto", 
                borderRadius: "15px", 
                backgroundColor:activeSideBar==index? "#2F696D":""
              }}
                className="search-msg-cont"
                onClick={() => setActiveSideBar(index)}
              >
                <div style={{ justifyContent: "space-between" }} className="aic  d-flex w50">
                  <img className="settings_icon" src={arrData?.unselected} />
                  <span>{arrData?.text}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "30px" }}></div>
          </div>
          <div style={{ 
             width:width<992?"100%":"81%",
             left: "28%" 
             }} className="footer_image_container">
            <img className="footer_image" src={FooterSVG} />
            {activeSideBar == 0 ? <Account editUserProfile={editUserProfile} setEditUserProfile={setEditUserProfile}/> : null}
            {activeSideBar == 1 ? <Buildings levels={levels} handleOpenAddEditBuilding={handleOpenAddEditBuilding} /> : null}
            {activeSideBar == 2 ? <Catogories /> : null}
          </div>
        </div>
        
      </UXL>
    </>
  );
};

export default AccountSetting;
