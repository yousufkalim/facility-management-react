import React, { useState } from "react";

import UXL from "../../components/UXL";

import AllUsersModal from '../../components/modals/AllUsersModal'

import profile from '../../assets/Profile.svg'
import dummy from "../../assets/DummyUser.jpeg";
import badge from "../../assets/Badge.svg";
import searchicon from "../../assets/Search.svg";
import footerimage from "../../assets/Cornerimage.svg";
import TicketSettingsSVG from "../../assets/TicketSettings.svg";
import TagBuildingSVG from "../../assets/TagBuilding.svg";
import TicketTextSVG from "../../assets/TicketText.svg";
import TicketComment from "../../assets/Comment.svg";
import User1AvatarSVG from "../../assets/User1Avatar.png";
import User2AvatarSVG from "../../assets/User2Avatar.png";
import TicketIcon from "../../assets/TicketIcon.svg";
import TicketTracking from "../../assets/TicketTracking.svg";
import AsignTicket from "../../assets/AsignTicket.svg";
import NewRoundTicket from "../../assets/NewRoundTicket.svg";
import RoundTrackingTicket from "../../assets/RoundTrackingTicket.svg";
import EditProfileIcon from "../../assets/EditProfileIcon.svg";
import CustomButton from "../../components/CustomButton";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { Store } from "../../StoreContext";


import useWindowSize from '../../utils/WindowSize'


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
const TicketsIcon = [
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
const userDetail = [
  {
    id: "ihtisham",
    name: "ihtisham",
    designation: "AXA",
  },
  {
    id: "ihtisham",
    name: "ihtisham",
    designation: "AXA",
  },
  {
    id: "ihtisham",
    name: "ihtisham",
    designation: "AXA",
  },
  {
    id: "hassan",
    name: "hassan",
    designation: "VXA",
  },
  {
    id: "shuja",
    name: "shuja",
    designation: "Developer",
  },
  {
    id: "umar",
    name: "umar",
    designation: "Developer",
  },
];
const tags = [
  {
    title: "Normale",
    color: "#D8ECFF",
    icon: TagBuildingSVG,
  },
  {
    title: "Élevée",
    color: "#FFF0BC",
    icon: TagBuildingSVG,
  },
  {
    title: "Urgente",
    color: "#FFD8D8",
    icon: TagBuildingSVG,
  },
  {
    title: "Bâtiment Bleu",
    color: "#D8ECFF",
    icon: TagBuildingSVG,
  },
  {
    title: "Bâtiment Jaune",
    color: "#FFF0BC",
    icon: TagBuildingSVG,
  },
  {
    title: "Bâtiment Rouge",
    color: "#FFD8D8",
    icon: TagBuildingSVG,
  },
];
const tickets = [
  {
    tags: [tags[0], tags[3]],
    title: "Fuite d'eau lavabo",
    icon: TicketTextSVG,
    createdAt: Date.now(),
    users: [
      {
        avatar: User1AvatarSVG,
      },
      {
        avatar: User2AvatarSVG,
      },
    ],
    comments_count: 6,
  },
  {
    tags: [tags[2], tags[3]],
    title: "Alerte sur Pointage entrée/sortie",
    icon: TicketSettingsSVG,
    createdAt: Date.now(),
    users: [
      {
        avatar: User1AvatarSVG,
      },
      {
        avatar: User2AvatarSVG,
      },
    ],
    comments_count: 4,
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
const AllUsers = () => {
  const [activeTabId, setActiveTabId] = useState("");
  const [open, setOpen] = useState(false);
  const store = Store();

  const ActiveTab = (activetabid) => {
    setActiveTabId(activetabid);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [width] = useWindowSize();
  return (
    <>
    
      <UXL appBarText="Allusers">
        <div
          className="row uxl_children_container"
          style={{
            justifyContent: "flex-start",
            backgroundColor: "#F4F4F4",
            overflow: "hidden",
            width: store?.isSideBar ? "97%" : "100%",
            paddingLeft: width<667? "10%":""
          }}
        >
         
          <div className="column ds_ml_container">
            <div className="search-msg-cont">
              <input className="search-msg-input" placeholder="Search by name" />
              <img className="srch-icon" src={searchicon} />
            </div>
            <div className="tab_container">
              {items?.map((val) => (
                <p className={` ${val?.id == activeTabId ? "active_tab" : ""}`} id={val?.id} onClick={() => ActiveTab(val?.id)}>
                  {val?.text}
                </p>
              ))}
            </div>
            {activeTabId == 0 ? <></> : null}
            {activeTabId == 1 ? (
              <>
                <UserCard />
              </>
            ) : null}

            <div style={{ marginTop: "30px" }}></div>
          </div>
          
          <div className="footer_image_container">
         
            <img className="footer_image" src={footerimage} />
            <div style={{ width: "100%", height: "100%", marginTop: "3%" }}>
              <div className="user_profile_info">
                <div className="form_container">
                {/* <div className="badge_container_edit_form">
            <img src={EditProfileIcon} />
            </div> */}
                  <div className="input_image_container">
                    <div style={{position:"relative"}}> 
                    <img className="edit_icon_image" src={EditProfileIcon} />
                    </div>
      
                    <img
                      className="input_image"
                      style={{ borderRadius: "50%" }}
                      src={profile}
                    />
                  </div>
                  <div className="input_container">
                    <div className="input_row">
                      <div className="label_input_container">
                        <label className="row_label">Prénom</label>
                        <input value="ihtisham" />
                      </div>
                      <div className="label_input_container">
                        <label className="row_label">Nom de famille</label>
                        <input value="huss" />
                      </div>
                    </div>
                    <div className="label_input_container">
                      <label>E-mail</label>
                      <input value="ihtisham@gmail.com" />
                    </div>
                    <div className="label_input_container">
                      <label>Numéro de portable</label>
                      <input value="12345678" />
                    </div>
                    <div style={{ display: "flex" }} className="input_row">
                      <div className="label_input_container">
                        <label className="row_label">Entreprise</label>
                        <input value="falcon" />
                      </div>
                      <div className="label_input_container">
                        <label className="row_label">Badge NFC</label>
                        <input value="consultant" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="configuration_conatiner">
                  <div>
                    <span style={{ color: "#2F696D" }}>Configuration</span>
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
                      <p
                      className="responsable-span"
                        style={{
                        
                        }}
                      >
                        Responsable
                      </p>
                      <p> Bâtiment accessibles</p>
                      {[1].map((_) => (
                        <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
                      ))}
                      <p>Alertes par mail</p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {TicketsIcon.map((val) => (
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
                      
        {/* can be used after ticket confirmation */}
        {/* <CustomAlert
        text="some text"
        /> */}

        <AllUsersModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          // text={`${!renderAddTicket ? "Ajouter un ticket ➕" : "Sauvegarder ✔️"}`}
          // onClick={!renderAddTicket ? handleRenderAddTicket : (e) => handleSubmit(e)}
             onClick={handleOpen}
          text="Ajouter un utilisateur ➕"
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

function UserCard() {
  return (
    <>
      {userDetail?.map((val) => (
        <div className="user_detail_conatiner">
          <div className="user_detail_img_detail_container">
            <div className="badge_container">
              <img src={badge} />
            </div>
            <img src={profile} />
            <div className="user_detail_name_designation">
              <span className="user_name">{val?.name}</span>
              <span className="user_designation">{val?.designation}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function TicketListTile(props) {
  const [isTicketDetailModal, setIsTicketDetailModal] = useState(false);
  const handleIsTicketDetailModalClose = () => {
    setIsTicketDetailModal(false);
  };
  const handleIsTicketDetailModalOpen = () => {
    if (!isTicketDetailModal) {
      setIsTicketDetailModal(true);
    }
  };

  return (
    <>
      <div className="column ds_tlt_container_all_users" onClick={handleIsTicketDetailModalOpen}>
        <div
          className="row"
          style={{
            width: "100%",
            marginBottom: "2%",
          }}
        >
          {props.tags.map((_) => (
            <div
              className="row"
              style={{
                borderRadius: "20px",
                backgroundColor: _.color,
                marginRight: "2%",
                padding: "2%",
              }}
            >
              {_.icon ? <img style={{ height: "14px", width: "14px", marginRight: "5%" }} src={_.icon} /> : <></>}
              <p
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {_.title}
              </p>
            </div>
          ))}
        </div>
        {/* <div
        className="row ds_tlt_icon_text_container"
      >
        <img
          src={props.icon}
          style={{
            height: "24px",
            width: "24px",
            marginRight: "4%",
          }}
        />
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#2F696D",
          }}
        >
          {props.title}
        </p>
      </div> */}

        {/* <div
      className="divider"
      /> */}

        {/* <Modal open={isTicketDetailModal} onClose={handleIsTicketDetailModalClose} aria-labelledby="Ticket Detail">
        <TicketDetailModal {...props} handleClose={handleIsTicketDetailModalClose} />
      </Modal> */}
      </div>
    </>
  );
}
export default AllUsers;
