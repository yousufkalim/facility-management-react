import React, { useState } from "react";

import UXL from "../../../components/UXL";

import FooterSVG from "../../../assets/Cornerimage.svg";
import SBSettingsAccountIconUnSelected from "../../../assets/SBSettingsAccountIconUnSelected.svg";
import SBSettingsCategoriesIconUnSelected from "../../../assets/SBSettingsCategoriesIconUnSelected.svg";
import SBSettingsBuildingIconUnSelected from "../../../assets/SBSettingsBuildingIconUnSelected.svg";
import AccountIconSelected from "../../../assets/AccountIconActive.svg";
import BuildingsIconSelected from "../../../assets/BuildingsIconActive.svg";
import CategorySelected from "../../../assets/CategorySelected.svg";
import CategoryUnSelected from "../../../assets/CategoryUnSelected.svg";

import CustomButton from "../../../components/CustomButton";

import AddBuilding from "../../../components/modals/AddBuilding";

import Buildings from "./Buildings";
import Account from "./Account";
import Catogories from "./Catogories";

import Api from "../../../api";
import { Store, UpdateStore } from "../../../StoreContext";

import useWindowSize from "../../../utils/WindowSize";
import Modal from "@mui/material/Modal";

const svgArrSideBar = [
  {
    selected: AccountIconSelected,
    unselected: SBSettingsAccountIconUnSelected,
    text: "Account",
  },
  {
    selected: BuildingsIconSelected,
    unselected: SBSettingsBuildingIconUnSelected,
    text: "Bâtiments",
  },
  {
    selected: CategorySelected,
    unselected: CategoryUnSelected,
    text: "Catégories",
  },
];

const Settings = () => {
  const [activeSideBar, setActiveSideBar] = useState(0);
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

  const handleAddCategory = () => {
    updateStore({
      settings: {
        ...store.settings,
        allCategories: {
          ...store.settings.allCategories,
          toAdd: !store.settings.allCategories.toAdd,
        },
      },
    });
  };

  const _cbBuildings = async () => {
    const _buildings = await getBuildings();

    updateStore({
      settings: {
        ...store.settings,
        allBuildings: {
          buildings: _buildings,
          isLoading: false,
        },
      },
    });
  };

  const getBuildings = async () => {
    let response;
    try {
      response = await Api("get", `/buildings/active_building_with_levels`);
      const _buildings = response.data.data;
      return _buildings;
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <>
      <UXL appBarText="Réglages">
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
          <div
            style={{
              width: width < 992 ? "100%" : "18vw",
              minHeight: width < 992 ? "40%" : "100%",
              paddingTop: "2%",
            }}
            className="column ds_ml_container"
          >
            {svgArrSideBar.map((arrData, index) => (
              <div
                style={{
                  padding: "12px 25px",
                  width: width < 575 ? "50%" : width < 992 ? "30%" : "83%",
                  margin: "3% auto 0% auto",
                  borderRadius: "15px",
                  backgroundColor: activeSideBar == index ? "#2F696D" : "",
                }}
                className="search-msg-cont"
                onClick={() => setActiveSideBar(index)}
              >
                <div
                  style={{ justifyContent: "space-between" }}
                  className="aic  d-flex w50"
                >
                  <img
                    className="settings_icon"
                    src={
                      activeSideBar === index
                        ? arrData?.selected
                        : arrData?.unselected
                    }
                  />
                  <span
                    style={{
                      color: activeSideBar === index ? "#ffffff" : "#000000",
                      fontWeight: "600",
                    }}
                    id={index}
                  >
                    {arrData?.text}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "30px" }}></div>
          </div>
          <div
            style={{ width: width < 992 ? "100%" : "81%", left: "28%" }}
            className="footer_image_container"
          >
            <img className="footer_image" src={FooterSVG} />
            {activeSideBar == 0 ? <Account /> : <></>}
            {activeSideBar == 1 ? (
              <Buildings handleAddBuildingOpen={handleAddBuildingOpen} />
            ) : (
              <></>
            )}
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
            onClick={() => handleAddCategory()}
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
          aria-labelledby="Add Building"
          aria-describedby="Add Building"
        >
          <AddBuilding
            cb={() => _cbBuildings()}
            handleClose={handleAddBuildingClose}
          />
        </Modal>
      </UXL>
    </>
  );
};

export default Settings;
