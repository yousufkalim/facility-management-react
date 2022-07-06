import React, { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";

import UXL from "../../components/UXL";

import AddUser from "../../components/modals/AddUser";

import ProfileSVG from "../../assets/DummyUser.jpeg";
import BadgeSVG from "../../assets/Badge.svg";
import SearchSVG from "../../assets/Search.svg";
import FooterSVG from "../../assets/Cornerimage.svg";
import TicketIcon from "../../assets/TicketIcon.svg";
import TicketTracking from "../../assets/TicketTracking.svg";
import AsignTicket from "../../assets/AsignTicket.svg";
import NewRoundTicket from "../../assets/NewRoundTicket.svg";
import RoundTrackingTicket from "../../assets/RoundTrackingTicket.svg";
import EditSVG from "../../assets/Edit.svg";

import CustomButton from "../../components/CustomButton";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import * as FormValidations from "../../utils/Validations";
import Api from "../../api";
import { toast } from "react-toastify";
import { getUser } from "../../utils/Auth";

import { Store, UpdateStore } from "../../StoreContext";

import useWindowSize from "../../utils/WindowSize";
import Loader from "../../components/Loader";

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

const AllUsers = () => {
  const user = getUser();

  const store = Store();
  const updateStore = UpdateStore();

  const [editUser, setEditUser] = useState(null);
  const [activeTabId, setActiveTabId] = useState("");
  const handleActiveTab = (activetabid) => {
    setActiveTabId(activetabid);
  };

  const [addUserOpen, setAddUserOpen] = useState(false);
  const handleAddUserOpen = (toEdit) => {
    if (toEdit) {
      setEditUser(store.allUsers.user);
    } else {
      setEditUser(null);
    }
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => setAddUserOpen(false);

  useEffect(() => {
    if (store.allUsers.isLoading) {
      _load();
    }
  }, []);

  const _load = async () => {
    const _users = await getUsers();
    let _user;
    if (_users?.length > 0) {
      _user = await getUserInfo(_users[0].userId);
    }

    updateStore({
      allUsers: {
        ...store.allUsers,
        users: _users,
        user: _user,
        isLoading: false,
      },
    });
  };

  const userTileCB = async (userID) => {
    // If same user was clicked then do nothing.
    if (userID == store.allUsers.user.userId) {
      return;
    }
    const _user = await getUserInfo(userID);
    updateStore({
      allUsers: {
        ...store.allUsers,
        user: _user,
      },
    });
  };

  const getUsers = async () => {
    let response;
    try {
      response = await Api("get", `/Users/getAll/${user.id}`);
      const _users = response.data.data;
      return _users;
    } catch (e) {
      console.trace(e);
    }
  };

  const getUserInfo = async (userID) => {
    let response;
    try {
      response = await Api("get", `/Users/userprofile/${userID}`);
      const _users = response.data.data;
      return _users;
    } catch (e) {
      console.trace(e);
    }
  };

  const [width] = useWindowSize();
  return (
    <>
      {console.log(store, "store")}
      <UXL appBarText="All Users">
        {store.allUsers.isLoading ? (
          <Loader />
        ) : (
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
            <div className="column ds_ml_container_all_users">
              <div className="search-msg-cont">
                <input className="search-msg-input" placeholder="Search by name" />
                <img className="srch-icon" src={SearchSVG} />
              </div>
              <div className="tab_container">
                {items?.map((val) => (
                  <p
                    className={` ${val?.id == activeTabId ? "active_tab" : ""}`}
                    id={val?.id}
                    onClick={() => handleActiveTab(val?.id)}
                  >
                    {val?.text}
                  </p>
                ))}
              </div>
              {activeTabId == 0 ? <></> : <></>}
              {activeTabId == 1 ? (
                <>
                  {store.allUsers.users.map((_) => (
                    <UserCard {..._} cb={userTileCB} />
                  ))}
                </>
              ) : (
                <></>
              )}
              <div style={{ marginTop: "30px" }} />
            </div>
            {!store.allUsers.user ? (
              <></>
            ) : (
              <div className="footer_image_container">
                <img className="footer_image" src={FooterSVG} />
                <div style={{ width: "100%", height: "100%", marginTop: "3%" }}>
                  <div className="user_profile_info">
                    <div className="form_container">
                      <div className="input_image_container">
                        <img
                          className="input_image"
                          style={{ borderRadius: "50%" }}
                          src={store.allUsers.user.profilePicture ? store.allUsers.user.profilePicture : ProfileSVG}
                        />
                      </div>
                      <div className="input_container">
                        <div className="input_row edit_btn_inputs_row" style={{ width: "100%" }}>
                          <div className="label_input_container">
                            <label className="row_label">Prénom</label>
                            <input value={store.allUsers.user.firstName} />
                          </div>
                          <div className="label_input_container">
                            <label className="row_label">Nom de famille</label>
                            <input value={store.allUsers.user.lastName} />
                          </div>
                          <div
                            className="row ajc"
                            style={{
                              height: "60%",
                              padding: width<992? "8px 5%":"0 5%",
                              backgroundColor: "#F4F4F4",
                              borderRadius: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleAddUserOpen(true)}
                          >
                            <img src={EditSVG} style={{ height: "30%", paddingRight: "10%" }} />
                            <p style={{ fontSize: "12px" }}>Éditer</p>
                          </div>
                        </div>
                        <div className="label_input_container">
                          <label>E-mail</label>
                          <input value={store.allUsers.user.email} />
                        </div>
                        <div className="label_input_container">
                          <label>Numéro de portable</label>
                          <input value={store.allUsers.user.phoneNo} />
                        </div>
                        <div style={{ display: "flex", width:"65%" }} className="input_row">
                          <div className="label_input_container">
                            <label className="row_label">Entreprise</label>
                            <input value={store.allUsers.user.businessName} />
                          </div>
                          <div className="label_input_container">
                            <label className="row_label">Badge NFC</label>
                            <input value={store.allUsers.user.badgeNFC ? "Yes" : "No"} />
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
                          <p className="responsable-span" style={{}}>
                            Responsable
                          </p>
                          <p>Bâtiment accessibles</p>
                          {/* {store.allUsers.user.allowedBuildings.map((_) => ({
                          <TagListTile {..._} />
                        }))} */}
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
                            <Modal
                              open={addUserOpen}
                              onClose={() => handleAddUserClose()}
                              aria-labelledby="Add User"
                              aria-describedby="Add User"
                            >
                              <AddUser existingUser={editUser} cb={_load} handleClose={handleAddUserClose} />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <CustomButton
          text="Ajouter un utilisateur ➕"
          onClick={() => handleAddUserOpen(false)}
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

function UserCard(props) {
  const store = Store();
  return (
    <>
      <div
        className="user_detail_conatiner"
        style={{ cursor: "pointer", backgroundColor: store.allUsers.user.userId == props.userId ? "#2F696D" : "#F4F4F4" }}
        onClick={() => props.cb(props.userId)}
      >
        <div className="user_detail_img_detail_container">
          <div className="badge_container">
            <img src={BadgeSVG} />
          </div>
          <img src={props.profilePicture ? props.profilePicture : ProfileSVG} />
          <div className="user_detail_name_designation">
            <span className="user_name" style={{ color: store.allUsers.user.userId == props.userId ? "#FFFFFF" : "#494949" }}>
              {props.firstName} {props.lastName}
            </span>
            <span
              className="user_designation"
              style={{ color: store.allUsers.user.userId == props.userId ? "#FFFFFF" : "#494949" }}
            >{`${props.businessName}`}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function TagListTile(props) {
  return (
    <>
      <div className="column ds_tlt_container_all_users">
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
      </div>
    </>
  );
}
export default AllUsers;
