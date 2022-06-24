import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TicketTextSVG from "../../assets/TicketText.svg";
import TicketSettingsSVG from "../../assets/TicketSettings.svg";
import TicketComment from "../../assets/Comment.svg";

import TicketDetailModal from "../../components/modals/TicketDetail";
import Loader from "../../components/Loader";

import { getUser } from "../../utils/Auth";
import Api from "../../api";
import { toast } from "react-toastify";
import assetsURL from "../../utils/Assets";

import { Store, UpdateStore } from "../../StoreContext";

import moment from "moment";

import { tickets } from "../../utils/Constants";

function AllTickets({ show }) {
  const store = Store();
  const updateStore = UpdateStore();

  const user = getUser();

  useEffect(() => {
    if (store.allTickets.isLoading) {
      _load();
    }
  }, []);

  const _load = async () => {
    const _tickets = await getAllTickets();

    console.log(_tickets, "_tickets");

    const _recentTickets = [];
    const _pendingTickets = [];
    const _inProgressTickets = [];
    const _completedTickets = [];

    for (let i = 0; i < _tickets.length; i++) {
      const obj = _tickets[i];
      if (obj.flagStatus == 4) {
        _recentTickets.push(obj);
      } else if (obj.flagStatus == 3) {
        _pendingTickets.push(obj);
      } else if (obj.flagStatus == 2) {
        _inProgressTickets.push(obj);
      } else if (obj.flagStatus == 1) {
        _completedTickets.push(obj);
      }
    }

    updateStore({
      allTickets: {
        ...store.allTickets,
        recentTickets: _recentTickets,
        pendingTickets: _pendingTickets,
        inProgressTickets: _inProgressTickets,
        completedTickets: _completedTickets,
        isLoading: false,
      },
    });
  };

  const getAllTickets = async () => {
    let response;
    try {
      response = await Api("get", `/tickets/tickets_list/0/${user.id}`);
      const _tickets = response.data.data;
      return _tickets;
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <>
      {store.allTickets.isLoading ? (
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
          className="row ticket_container"
          style={{
            display: show ? "flex" : "none",
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
              className="ds_sl_container"
              style={{
                padding: "3% 2%",
              }}
            >
              <div
                className="column ds_ml_container"
                style={{
                  padding: "2%",
                }}
              >
                <p className="ds_ml_container_heading">{`Nouveaux Billets ${store.allTickets.recentTickets.length}`}</p>
                <Droppable droppableId="droppable-0">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w100 dropable_box_one"
                    >
                      {store.allTickets.recentTickets.map((_) => (
                        <Draggable
                          key={_.taskTicketId}
                          draggableId={`${_.taskTicketId}`}
                          index={_.taskTicketId}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TicketListTile {..._} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </div>
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
                  {`En attente ${store.allTickets.pendingTickets.length}`}
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
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w100 dropable_box"
                    >
                      {store.allTickets.pendingTickets.map((_) => (
                        <Draggable
                          key={_.taskTicketId}
                          draggableId={`${_.taskTicketId}`}
                          index={_.taskTicketId}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TicketListTile {..._} />
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
                  {`En intervention ${store.allTickets.inProgressTickets.length}`}
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
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w100 dropable_box"
                    >
                      {store.allTickets.inProgressTickets.map((_) => (
                        <Draggable
                          key={_.taskTicketId}
                          draggableId={`${_.taskTicketId}`}
                          index={_.taskTicketId}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TicketListTile {..._} />
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
                  {`Terminé ${store.allTickets.completedTickets.length}`}
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
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w100 dropable_box"
                    >
                      {store.allTickets.completedTickets.map((_) => (
                        <Draggable
                          key={_.taskTicketId}
                          draggableId={`${_.taskTicketId}`}
                          index={_.taskTicketId}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TicketListTile {..._} />
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
      <div
        className="column ds_tlt_container"
        onClick={handleIsTicketDetailModalOpen}
      >
        <div
          className="row"
          style={{
            width: "100%",
            justifyContent: "flex-start",
            marginBottom: "2%",
          }}
        >
          <div
            className="row"
            style={{
              borderRadius: "20px",
              backgroundColor: "#D8ECFF",
              marginRight: "2%",
              padding: "2%",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                whiteSpace: "nowrap",
              }}
            >
              {props.building}
            </p>
          </div>
        </div>
        <div className="row ds_tlt_icon_text_container">
          <img
            src={TicketSettingsSVG}
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
            {props.taskTitle}
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
          {moment(props.creationDateTime).format("LT dddd D,MMM YYYY")}
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
            {props.comments.map((_, __) => ({
              /* <img
                className="ip_container"
                src={_.avatar}
                style={{
                  height: "40px",
                  width: "40px",
                  position: "absolute",
                  left: `${20 * __}pt`,
                  top: "-10pt",
                }}
              /> */
            }))}
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
              {props.comments.length}
            </p>
            <img
              src={TicketComment}
              style={{ height: "28px", width: "20px", paddingTop: "40%" }}
            />
          </div>
        </div>
        <Modal
          open={isTicketDetailModal}
          onClose={handleIsTicketDetailModalClose}
          aria-labelledby="Ticket Detail"
        >
          <TicketDetailModal
            {...props}
            handleClose={handleIsTicketDetailModalClose}
          />
        </Modal>
      </div>
    </>
  );
}

export default AllTickets;
