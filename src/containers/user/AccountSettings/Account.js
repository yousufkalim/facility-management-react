import React from "react";

import ProfileSVG from "../../../assets/ProfileInput.svg";
import EditSVG from "../../../assets/Edit.svg";
import EditIconSelectedSVG from '../../../assets/EditIconSelected.svg'
import SearchSVG from "../../../assets/Search.svg";
import FooterSVG from "../../../assets/Cornerimage.svg";
import TicketIcon from "../../../assets/TicketIcon.svg";
import TicketTracking from "../../../assets/TicketTracking.svg";
import AsignTicket from "../../../assets/AsignTicket.svg";
import NewRoundTicket from "../../../assets/NewRoundTicket.svg";
import RoundTrackingTicket from "../../../assets/RoundTrackingTicket.svg";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { Store, UpdateStore } from "../../../StoreContext";

import useWindowSize from "../../../utils/WindowSize";

const switches = [
  {
    image: TicketIcon,
    text: "Nouveau ticket",
  },
  {
    image: TicketTracking,
    text: "Suivi de ticket",
  },
  {
    image: AsignTicket,
    text: "Assignation à un ticket",
  },
  {
    image: NewRoundTicket,
    text: "Nouvelle ronde",
  },
  {
    image: RoundTrackingTicket,
    text: "Suivi de ronde",
  },
];

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 32,
    height: 14,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#2F696D",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 10,
      height: 10,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#494949" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  })
);

const Account = ({editUserProfile,setEditUserProfile}) => {
  const store = Store();
  const updateStore = UpdateStore();
  const [width] = useWindowSize();
 
  return (
    <>
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
        <div style={{ width: "82%" }} className="footer_image_container">
          <img className="footer_image" src={FooterSVG} />
          <div style={{ width: "100%", height: "100%", marginTop: "3%" }}>
            <div className="user_profile_info">
              <div className="form_container form_container_account">
                <div className="input_image_container">
                  <img className="input_image_account" src={ProfileSVG} />
                </div>
                <div style={{ marginTop: "3%" }} className="input_container">
                  <div className="input_row" style={{ width: "100%" }}>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">Prénom</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="ihtisham" />
                    </div>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">Nom de famille</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="hussain" />
                    </div>
                  </div>
                  <div className="input_row" style={{ width: "100%" }}>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">E-mail</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="sample@gmail.com" />
                    </div>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">Numéro de portable</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="12345678" />
                    </div>
                  </div>
                 
                  <div className="input_row" style={{ width: "100%" }}>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">Entreprise</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="enterprise" />
                    </div>
                    <div className="label_input_container w-48">
                      <label className="label_inputs">Password</label>
                      <input
                      className="account_edit_inputs"
                      style={{
                        border:editUserProfile?"2px solid #8C8C8C":"",
                        padding:editUserProfile?"2.5% 8%":"2.5% 0%"
                      }}
                      value="last changes 4 weeks ago" />
                    </div>
                  </div>
                </div>
                <div
                style={{
                  background:editUserProfile?"#2F696D":"",
                  color:editUserProfile?"#ffffff":"",
                  width:editUserProfile?"16%":"11%"
                }}
                  className="row edit_icon_text_container"
                  onClick={() => setEditUserProfile(!editUserProfile)}
                >
                  <div className="edit_icon_container d-flex aic jcc">
                    <img src={editUserProfile?EditIconSelectedSVG:EditSVG} />
                  </div>

                  <p style={{ fontSize: "12px" }}>{editUserProfile?"Sauvegarder":"Éditer"}</p>
                </div>
              </div>
              <div className="horizental_seperator horizental_seperator_account"></div>
              <div className="configuration_conatiner">
                <div className="accunt_configuration_container">
                  <span>Configuration</span>
                  <p>
                    Attention, la modification d'un des champs ci-dessous peut provoquer la désassignaiton automatique de
                    l'utilisateur sur des tickets
                  </p>
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="tickets_container"
                >
                  <div className="tickets-status_container">
                    <p> Rôle</p>
                    <p className="responsable-span" style={{}}>
                      Admin
                    </p>
                    <p>Alertes par mail</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {switches.map((val) => (
                        <>
                          <div className="tickets_icon_btn_container">
                            <div style={{ width: "50%" }}>
                              <img className="tickets_icon_btn" src={val?.image} />
                              <span className="tickets_icon_btn_span">{val?.text}</span>
                            </div>
                            <div>
                              <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
