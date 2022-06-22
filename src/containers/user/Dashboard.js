import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TagBuildingSVG from "../../assets/TagBuilding.svg";

import TicketTextSVG from "../../assets/TicketText.svg";
import TicketSettingsSVG from "../../assets/TicketSettings.svg";
import TicketCommentSVG from "../../assets/TicketComment.svg";
import ModalCrossSVG from "../../assets/ModalCross.svg";
import AttachmentSVG from "../../assets/Attachment.svg";
import TicketComment from "../../assets/Comment.svg";

import User1AvatarSVG from "../../assets/User1Avatar.png";
import User2AvatarSVG from "../../assets/User2Avatar.png";

import UXL from "../../components/UXL";
import TicketDetailModal from "../../components/modals/TicketDetail";
import CustomButton from "../../components/CustomButton";
import Tag from "../../components/Tag";
import SelectableTag from "../../components/SelectableTag";
import CustomInput from "../../components/CustomInput";
import Loader from "../../components/Loader";

import * as FormValidations from "../../utils/Validations";
import { getUser } from "../../utils/Auth";
import Api from "../../api";
import { toast } from "react-toastify";
import assetsURL from "../../utils/Assets";

import { Store } from "../../StoreContext";

import moment from "moment";

const tags = [
  {
    title: "Normale",
    color: "#D8ECFF",
    icon: null,
  },
  {
    title: "Élevée",
    color: "#FFF0BC",
    icon: null,
  },
  {
    title: "Urgente",
    color: "#FFD8D8",
    icon: null,
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

function DashboardScreen() {
  const { t } = useTranslation();

  const [renderAddTicket, setRenderAddTicket] = useState(false);
  const handleRenderAddTicket = () => {
    setRenderAddTicket(!renderAddTicket);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  // Add Ticket State
  const [state, setState] = useState({
    // section 1
    building: "",
    building_level: "",
    location_details: "",
    // section 2
    category: "",
    title: "",
    details: "",
    // section 3
    priority: "",
    assignee: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.addTicket(state);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      // setIsProcessing(true);
      console.log(state);
      handleRenderAddTicket();
    } catch (e) {
      console.trace(e);
    }

    // setIsProcessing(false);
  };

  return (
    <>
      {console.log(state, "state")}
      <UXL appBarText="Dashboard">
        {/* Needs to have UXL conatiner */}
        <TicketsScreen show={!renderAddTicket} />
        <AddTicketScreen show={renderAddTicket} handleClose={handleRenderAddTicket} state={state} setState={setState} />
        <CustomButton
          text={`${!renderAddTicket ? "Ajouter un ticket ➕" : "Sauvegarder ✔️"}`}
          onClick={!renderAddTicket ? handleRenderAddTicket : (e) => handleSubmit(e)}
          style={{
            position: "absolute",
            right: "20pt",
            bottom: "20pt",
          }}
        />
      </UXL>
    </>
  );
}

function TicketsScreen({ show }) {
  const store = Store();
  return (
    <div
      className="row wh100"
      style={{
        display: show ? "flex" : "none",
        overflow: "hidden",
        position: "relative",
        justifyContent: "flex-start",
        backgroundColor: "#F4F4F4",
        width: store?.isSideBar ? "97%" : "100%",
      }}
    >
      {/* DragDrop Global Context */}
      <DragDropContext
        onDragEnd={(_) => {
          console.log(_);
        }}
      >
        {/* Nouveaux Billets */}
        <div
          className="column ds_ml_container"
          style={{
            padding: "2%",
          }}
        >
          <p className="ds_ml_container_heading">Nouveaux Billets 5</p>
          <Droppable droppableId="droppable-0">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="w100">
                {[1, 2, 3, 4, 5].map((_, __) => (
                  <Draggable key={__} draggableId={`item-0-${__}`} index={__}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </div>

        {/* En attente */}
        <div
          className="ds_sl_container"
          style={{
            padding: "3% 2%",
          }}
        >
          <div
            className="column ds_sl_header_container"
            style={{
              backgroundColor: "#5bd89c",
            }}
          >
            <p
              className="ds_sl_header_text"
              style={{
                padding: "4% 0",
              }}
            >
              En attente 2
            </p>
          </div>

          <div
            className="column ds_ml_container"
            style={{
              width: "100%",
              padding: "8% 4%",
            }}
          >
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w100">
                  {[1, 2, 3, 4, 5].map((_, __) => (
                    <Draggable key={__} draggableId={`item-1-${__}`} index={__}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </div>

        {/* En intervention */}
        <div
          className="ds_sl_container"
          style={{
            padding: "3% 2%",
          }}
        >
          <div
            className="column ds_sl_header_container"
            style={{
              backgroundColor: "#FF8C39",
            }}
          >
            <p
              className="ds_sl_header_text"
              style={{
                padding: "4% 0",
              }}
            >
              En intervention 1
            </p>
          </div>
          <div
            className="column ds_ml_container"
            style={{
              width: "100%",
              padding: "8% 4%",
            }}
          >
            <Droppable droppableId="droppable-2">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w100">
                  {[1, 2, 3, 4, 5].map((_, __) => (
                    <Draggable key={__} draggableId={`item-2-${__}`} index={__}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        {/* Terminé */}
        <div
          className="ds_sl_container"
          style={{
            padding: "3% 2%",
          }}
        >
          <div
            className="column ds_sl_header_container"
            style={{
              backgroundColor: "#436062",
            }}
          >
            <p
              className="ds_sl_header_text"
              style={{
                padding: "4% 0",
              }}
            >
              Terminé 10
            </p>
          </div>
          <div
            className="column ds_ml_container"
            style={{
              width: "100%",
              padding: "8% 4%",
            }}
          >
            <Droppable droppableId="droppable-3">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w100">
                  {[1, 2, 3, 4, 5].map((_, __) => (
                    <Draggable key={__} draggableId={`item-3-${__}`} index={__}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

function AddTicketScreen({ show, handleClose, state, setState }) {
  const [isLoading, setIsLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);
  const [buildingLevels, setBuildingLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };

  useEffect(() => {
    console.log("WE WILL LOAD - XYZ");
    _load();
  }, []);

  const _load = async () => {
    const _buildings = await getBuildings();
    const _buildingLevels = await getBuildingLevels(_buildings[0]);
    const _categories = await getCategories();
    const _priorities = await getPriorities();

    console.log(_buildings, "_buildings");
    console.log(_buildingLevels, "_buildingLevels");
    console.log(_categories, "_categories");
    console.log(_priorities, "_priorities");

    setBuildings(_buildings);
    setBuildingLevels(_buildingLevels);
    setCategories(_categories);
    setPriorities(_priorities);

    setState({
      ...state,
      building: _buildings[0].value,
      building_level: _buildingLevels[0].value,
      category: _categories[0].value,
      priority: _priorities[0].value,
    });

    setIsLoading(false);
  };

  const getBuildings = async () => {
    let response;
    try {
      response = await Api("get", `/buildings/dropdown`);
      const _buildings = response.data.data;
      return _buildings;
    } catch (e) {
      console.trace(e);
    }
  };

  const getBuildingLevels = async (building) => {
    let response;
    try {
      response = await Api("get", `/levels/dropdown/${building.value}`);
      const _buildingLevels = response.data.data;
      return _buildingLevels;
    } catch (e) {
      console.trace(e);
    }
  };

  const getCategories = async () => {
    let response;
    try {
      response = await Api("get", `/category/dropdown`);
      const _categories = response.data.data;
      return _categories;
    } catch (e) {
      console.trace(e);
    }
  };

  const getPriorities = async () => {
    let response;
    try {
      response = await Api("get", `/priority/dropdown`);
      const _priorities = response.data.data;
      return _priorities;
    } catch (e) {
      console.trace(e);
    }
  };

  const selectBuilding = async (_) => {
    const _buildingLevels = await getBuildingLevels(_);
    setBuildingLevels(_buildingLevels);
    setState({
      ...state,
      building: _.value,
      building_level: _buildingLevels[0].value,
    });
  };

  return (
    <>
      {console.log(state)}
      {isLoading ? (
        <div
          className="wh100 column ajc"
          style={{
            display: show ? "flex" : "none",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div
          className="column wh100"
          style={{
            display: show ? "flex" : "none",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Section 1 */}
          <div
            className="row w100"
            style={{
              margin: "2% 0",
            }}
          >
            <div style={{ flex: 1 }}></div>
            <div className="row ajc" style={{ flex: 2 }}>
              <p style={{ fontSize: "22px", fontWeight: "600", color: "#2F696D" }}>Ajouter un nouveau ticket</p>
            </div>
            <div className="row aic" style={{ flex: 1, justifyContent: "flex-end" }}>
              <img
                src={ModalCrossSVG}
                style={{ height: "24px", width: "24px", marginRight: "8%", cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
          </div>
          <div className="row wh100">
            <div
              className="column aic h100"
              style={{
                margin: "0 8%",
              }}
            >
              <div
                className="column ajc"
                style={{ height: "40pt", width: "40pt", borderRadius: "50%", backgroundColor: "#2F696D" }}
              >
                <p style={{ fontSize: "30", color: "#FFFFFF" }}>1</p>
              </div>
              <div style={{ height: "15%", width: "2.5pt", backgroundColor: "#2F696D", margin: "5% 0" }}></div>
              <div
                className="column ajc"
                style={{ height: "40pt", width: "40pt", borderRadius: "50%", backgroundColor: "#2F696D" }}
              >
                <p style={{ fontSize: "30", color: "#FFFFFF" }}>2</p>
              </div>
              <div style={{ height: "35%", width: "2.5pt", backgroundColor: "#2F696D", margin: "5% 0" }}></div>
              <div
                className="column ajc"
                style={{ height: "40pt", width: "40pt", borderRadius: "50%", backgroundColor: "#2F696D" }}
              >
                <p style={{ fontSize: "30", color: "#FFFFFF" }}>3</p>
              </div>
            </div>
            <div className="column wh100">
              <div className="column" style={{ marginBottom: "2%" }}>
                <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Bâtiment *</p>
                <div className="row">
                  {buildings.map((_) => (
                    <SelectableTag
                      {..._}
                      text={_.text}
                      isSelected={state.building == _.value}
                      onClick={() => selectBuilding(_)}
                      pStyle={{
                        padding: "6pt",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="row w100">
                <div className="column" style={{ marginBottom: "2%" }}>
                  <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Lieu</p>
                  <div className="row aic">
                    {buildingLevels.map((_) => (
                      <SelectableTag
                        text={_.text}
                        isSelected={state.building_level == _.value}
                        onClick={() => _setState("building_level", _.value)}
                        pStyle={{
                          padding: "6pt",
                        }}
                      />
                    ))}
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: "#B7B7B7",
                        textDecoration: "underline",
                        marginLeft: "10%",
                      }}
                    >
                      Show more
                    </p>
                  </div>
                </div>
                <div className="column w100" style={{ marginBottom: "2%", marginLeft: "5%" }}>
                  <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Détails du lieu</p>
                  <CustomInput
                    inputValue={state.location_details}
                    onChange={(e) => _setState("location_details", e.target.value)}
                    divStyle={{
                      width: "40%",
                    }}
                    labelStyle={{
                      display: "none",
                    }}
                    enableYoursStyle={{
                      display: "none",
                    }}
                    inputStyle={{
                      fontSize: "12px",
                      padding: "8px",
                    }}
                  />
                </div>
              </div>
              {/* Section 2 */}
              <div className="column" style={{ marginBottom: "2%" }}>
                <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Catégorie *</p>
                <div className="row">
                  {categories.map((_) => (
                    <SelectableTag
                      text={_.text}
                      isSelected={state.category == _.value}
                      onClick={() => _setState("category", _.value)}
                      pStyle={{
                        padding: "6pt",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="column w100" style={{ marginBottom: "2%" }}>
                <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Titre *</p>
                <input
                  value={state.title}
                  onChange={(e) => _setState("title", e.target.value)}
                  style={{
                    fontSize: "12px",
                    width: "25%",
                    padding: "10px",
                    background: "transparent",
                    border: "none",
                    borderBottomColor: "#2F696D",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1.5px",
                  }}
                />
              </div>
              <div className="row w100" style={{ marginBottom: "2%" }}>
                <div className="column" style={{ marginRight: "2%", width: "20%" }}>
                  <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Détails</p>
                  <textarea
                    value={state.details}
                    onChange={(e) => _setState("details", e.target.value)}
                    style={{
                      fontSize: "12px",
                      height: "60pt",
                      width: "100%",
                      padding: "10px",
                      background: "transparent",
                      borderRadius: "10pt",
                      borderColor: "#000000",
                      borderStyle: "solid",
                      borderWidth: "1.5px",
                    }}
                  />
                </div>
                <div className="column w100">
                  <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Attachement *</p>
                  <div
                    className="row ajc"
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "20pt",
                      padding: "7pt",
                      cursor: "pointer",
                    }}
                  >
                    <img src={AttachmentSVG} style={{ height: "16pt", width: "16pt", marginRight: "15pt" }} />
                    <p style={{ fontSize: "11px", fontWeight: "bold" }}>Ajouter pièce jointe</p>
                  </div>
                </div>
              </div>
              {/* Section 3 */}
              <div className="column" style={{ marginBottom: "2%" }}>
                <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Priorité *</p>
                <div className="row">
                  {priorities.map((_) => (
                    <SelectableTag
                      {..._}
                      text={_.text}
                      isSelected={state.priority == _.value}
                      onClick={() => _setState("priority", _.value)}
                      divStyle={{
                        marginRight: "10pt",
                      }}
                      pStyle={{
                        padding: "6pt",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="column" style={{ marginBottom: "2%" }}>
                <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Assignés</p>
                <div className="row">
                  {[tags[0], tags[1], tags[2]].map((_, __) => (
                    <SelectableTag
                      {..._}
                      text={_.title}
                      isSelected={state.assignee == __}
                      onClick={() => _setState("assignee", __)}
                      divStyle={{
                        marginRight: "10pt",
                      }}
                      pStyle={{
                        padding: "6pt",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
      <div className="column ds_tlt_container" onClick={handleIsTicketDetailModalOpen}>
        <div
          className="row"
          style={{
            width: "100%",
            justifyContent: "flex-start",
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
        <div className="row ds_tlt_icon_text_container">
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
        </div>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#8C8C8C",
            paddingBottom: "2%",
          }}
        >
          {moment(props.createdAt).format("LT dddd D,MMM YYYY")}
          {/* {moment(new Date(props.createdAt).format("D,MMM,YYYY"))} */}
          {/* {new Date(props.createdAt).toLocaleDateString("en-US")} */}
        </p>
        <div className="divider" />
        <div
          className="row"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {props.users.map((_, __) => (
              <img
                className="ip_container"
                src={_.avatar}
                style={{
                  height: "40px",
                  width: "40px",
                  position: "absolute",
                  left: `${20 * __}pt`,
                  top: "-10pt",
                }}
              />
            ))}
          </div>

          <div
            className="row jcc"
            style={{
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#8C8C8C",
                fontSize: "14px",
                marginRight: "20%",
                paddingTop: "40%",
              }}
            >
              {props.comments_count}
            </p>
            <img src={TicketComment} style={{ height: "28px", width: "20px", paddingTop: "40%" }} />
          </div>
        </div>
        <Modal open={isTicketDetailModal} onClose={handleIsTicketDetailModalClose} aria-labelledby="Ticket Detail">
          <TicketDetailModal {...props} handleClose={handleIsTicketDetailModalClose} />
        </Modal>
      </div>
    </>
  );
}

export default DashboardScreen;
