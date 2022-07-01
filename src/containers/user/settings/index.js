import React, { useState } from "react";

import UXL from "../../../components/UXL";

import FooterSVG from "../../../assets/Cornerimage.svg";
import SBSettingsAccountIconUnSelected from "../../../assets/SBSettingsAccountIconUnSelected.svg";
import SBSettingsCategoriesIconUnSelected from "../../../assets/SBSettingsCategoriesIconUnSelected.svg";
import SBSettingsBuildingIconUnSelected from "../../../assets/SBSettingsBuildingIconUnSelected.svg";

import CustomButton from "../../../components/CustomButton";

import AddBuilding from "../../../components/modals/AddBuilding";

import Buildings from "./Buildings";
import Account from "./Account";
import Catogories from "./Catogories";

import { Store, UpdateStore } from "../../../StoreContext";

import useWindowSize from "../../../utils/WindowSize";
import Modal from "@mui/material/Modal";

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

const Settings = () => {
  const [activeSideBar, setActiveSideBar] = useState("");
  const store = Store();
  const updateStore = UpdateStore();
  const [width] = useWindowSize();

  const [addBuildingOpen, setAddBuildingOpen] = useState(false);
  const handleAddBuildingOpen = (toEdit) => {
    if (!toEdit) {
      updateStore({
        settings: {
          ...store.settings,
          allBuildings: {
            ...store.settings.allBuildings,
            building: null,
          },
        },
      });
    }
    setAddBuildingOpen(true);
  };
  const handleAddBuildingClose = () => setAddBuildingOpen(false);
  return (
    <>
      <UXL appBarText="Account Settings">
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
          <div style={{ width: "18vw", minHeight: "100%", paddingTop: "2%" }} className="column ds_ml_container">
            {svgArrSideBar.map((arrData, index) => (
              <div
                style={{
                  padding: "14px 25px",
                  width: "85%",
                  margin: "3% auto 0% auto",
                  borderRadius: "15px",
                  backgroundColor: activeSideBar == index ? "#2F696D" : "",
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
          <div style={{ width: "81%", left: "28%" }} className="footer_image_container">
            <img className="footer_image" src={FooterSVG} />
            {activeSideBar == 0 ? <Account /> : <></>}
            {activeSideBar == 1 ? <Buildings handleAddBuildingOpen={handleAddBuildingOpen} /> : <></>}
            {activeSideBar == 2 ? <Catogories /> : <></>}
          </div>
        </div>
        {activeSideBar == 1 ? (
          <CustomButton
            text="Ajouter un bâtiment ➕"
            onClick={() => handleAddBuildingOpen(false)}
            style={{
              position: "absolute",
              right: "20pt",
              bottom: "20pt",
            }}
          />
        ) : activeSideBar == 2 ? (
          <CustomButton
            text="Ajouter une nouvelle catégorie ➕"
            style={{
              position: "absolute",
              right: "20pt",
              bottom: "20pt",
            }}
          />
        ) : (
          <></>
        )}
        <Modal
          open={addBuildingOpen}
          onClose={() => handleAddBuildingClose()}
          aria-labelledby="Add User"
          aria-describedby="Add User"
        >
          <AddBuilding />
        </Modal>
      </UXL>
    </>
  );
};

export default Settings;
