import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TicketTextSVG from "../../assets/TicketText.svg";
import TicketSettingsSVG from "../../assets/TicketSettings.svg";
import TicketComment from "../../assets/Comment.svg";
import ProfileSVG from "../../assets/DummyUser.jpeg";

import TicketDetailModal from "../../components/modals/TicketDetail";
import Loader from "../../components/Loader";

import { getUser } from "../../utils/Auth";
import Api from "../../api";
import { toast } from "react-toastify";
import assetsURL from "../../utils/Assets";

import { Store, UpdateStore } from "../../StoreContext";
import useWindowSize from "../../utils/WindowSize";
import { tickets } from "../../utils/Constants";

import moment from "moment";

function AllTickets({ show }) {
  const store = Store();
  const updateStore = UpdateStore();

  const user = getUser();
  const [width] = useWindowSize();

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

  const _findDraggedTicket = (_) => {
    if (_.droppableId == "0") {
      return store.allTickets.recentTickets.filter((__) => __.orderNumber == _.index)[0];
    } else if (_.droppableId == "1") {
      return store.allTickets.pendingTickets.filter((__) => __.orderNumber == _.index)[0];
    } else if (_.droppableId == "2") {
      return store.allTickets.inProgressTickets.filter((__) => __.orderNumber == _.index)[0];
    } else if (_.droppableId == "3") {
      return store.allTickets.completedTickets.filter((__) => __.orderNumber == _.index)[0];
    } else {
      throw "Little Boy BOMB 💣";
    }
  };

  const _findDraggedTicketsList = (start, end, droppableId) => {
    let startIndex;
    let endIndex;
    let sorterArr;

    let tempArr;
    let arr;

    if (droppableId == "0") {
      startIndex = store.allTickets.recentTickets.map((_) => _.taskTicketId).indexOf(start.taskTicketId);
      endIndex = store.allTickets.recentTickets.map((_) => _.taskTicketId).indexOf(end.taskTicketId);
    } else if (droppableId == "1") {
      startIndex = store.allTickets.pendingTickets.map((_) => _.taskTicketId).indexOf(start.taskTicketId);
      endIndex = store.allTickets.pendingTickets.map((_) => _.taskTicketId).indexOf(end.taskTicketId);
    } else if (droppableId == "2") {
      startIndex = store.allTickets.inProgressTickets.map((_) => _.taskTicketId).indexOf(start.taskTicketId);
      endIndex = store.allTickets.inProgressTickets.map((_) => _.taskTicketId).indexOf(end.taskTicketId);
    } else if (droppableId == "3") {
      startIndex = store.allTickets.completedTickets.map((_) => _.taskTicketId).indexOf(start.taskTicketId);
      endIndex = store.allTickets.completedTickets.map((_) => _.taskTicketId).indexOf(end.taskTicketId);
    } else {
      throw "Fat Man BOMB1 💣";
    }

    sorterArr = [startIndex, endIndex].sort((a, b) => a - b);

    startIndex = sorterArr[0];
    endIndex = sorterArr[1];

    if (droppableId == "0") {
      tempArr = [...store.allTickets.recentTickets];
    } else if (droppableId == "1") {
      tempArr = [...store.allTickets.pendingTickets];
    } else if (droppableId == "2") {
      tempArr = [...store.allTickets.inProgressTickets];
    } else if (droppableId == "3") {
      tempArr = [...store.allTickets.completedTickets];
    } else {
      throw "Fat Man BOMB2 💣";
    }

    arr = tempArr.splice(startIndex, endIndex - startIndex);
    arr.shift();

    return arr;
  };

  const _findDragRequestArr = (start, end, _subArr) => {
    const subArr = [..._subArr];
    const reqArr = [];

    // Lower ticket is moved up
    if (start.orderNumber > end.orderNumber) {
      reqArr.push({
        ticketId: start.taskTicketId,
        orderNum: end.orderNumber,
      });

      reqArr.push({
        ticketId: end.taskTicketId,
        orderNum: end.orderNumber + 1,
      });
      for (let i = 0; i < subArr.length; i++) {
        const obj = subArr[i];
        reqArr.push({
          ticketId: obj.taskTicketId,
          orderNum: end.orderNumber + 2 + i,
        });
      }
    } else {
      // Upper ticket is moved down
      reqArr.push({
        ticketId: start.taskTicketId,
        orderNum: end.orderNumber,
      });

      reqArr.push({
        ticketId: end.taskTicketId,
        orderNum: end.orderNumber - 1,
      });

      subArr.reverse(); // As we are moving in the opposite direction
      for (let i = 0; i < subArr.length; i++) {
        const obj = subArr[i];
        reqArr.push({
          ticketId: obj.taskTicketId,
          orderNum: end.orderNumber - 2 - i,
        });
      }
    }

    return reqArr;
  };

  const _findFlagFromdroppableID = (_) => {
    if (_ == "0") {
      return 4;
    } else if (_ == "1") {
      return 3;
    } else if (_ == "2") {
      return 2;
    } else if (_ == "3") {
      return 1;
    } else {
      throw "Tsar Bomba 1 💣";
    }
  };

  const _findDragStateArr = (start, end, _subArr) => {
    const subArr = [..._subArr];
    const stateArr = [];

    // Lower ticket is moved up
    if (start.orderNumber > end.orderNumber) {
      stateArr.push({
        ...start,
        orderNumber: end.orderNumber,
      });

      stateArr.push({
        ...end,
        orderNumber: end.orderNumber + 1,
      });
      for (let i = 0; i < subArr.length; i++) {
        const obj = subArr[i];
        stateArr.push({
          ...obj,
          orderNumber: end.orderNumber + 2 + i,
        });
      }
    } else {
      // Upper ticket is moved down
      stateArr.push({
        ...start,
        orderNumber: end.orderNumber,
      });

      stateArr.push({
        ...end,
        orderNumber: end.orderNumber - 1,
      });

      subArr.reverse(); // As we are moving in the opposite direction
      for (let i = 0; i < subArr.length; i++) {
        const obj = subArr[i];
        stateArr.push({
          ...obj,
          orderNumber: end.orderNumber - 2 - i,
        });
      }
    }

    return stateArr;
  };

  const _mutateReOrderTicketsState = (droppableId, stateArr) => {
    let tempArr;
    if (droppableId == "0") {
      tempArr = [...store.allTickets.recentTickets];
    } else if (droppableId == "1") {
      tempArr = [...store.allTickets.pendingTickets];
    } else if (droppableId == "2") {
      tempArr = [...store.allTickets.inProgressTickets];
    } else if (droppableId == "3") {
      tempArr = [...store.allTickets.completedTickets];
    } else {
      throw "Tsar Bomba 2 💣";
    }

    const parsedArr = [];
    for (let i = 0; i < tempArr.length; i++) {
      const _ = tempArr[i];
      let modifiedObj;
      for (let j = 0; j < stateArr.length; j++) {
        const __ = stateArr[j];
        if (_.taskTicketId == __.taskTicketId) {
          modifiedObj = __;
          continue;
        }
      }
      if (modifiedObj) {
        parsedArr.push(modifiedObj);
      } else {
        parsedArr.push(_);
      }
    }

    parsedArr.sort((a, b) => a.orderNumber - b.orderNumber);

    if (droppableId == "0") {
      updateStore({
        allTickets: {
          ...store.allTickets,
          recentTickets: parsedArr,
        },
      });
    } else if (droppableId == "1") {
      updateStore({
        allTickets: {
          ...store.allTickets,
          pendingTickets: parsedArr,
        },
      });
    } else if (droppableId == "2") {
      updateStore({
        allTickets: {
          ...store.allTickets,
          inProgressTickets: parsedArr,
        },
      });
    } else if (droppableId == "3") {
      updateStore({
        allTickets: {
          ...store.allTickets,
          completedTickets: parsedArr,
        },
      });
    } else {
      throw "Tsar Bomba 2 💣";
    }
  };

  const _mutateMoveTicketState = (sourceDroppableId, destinationDroppableId, ticket) => {
    let sourceTempArr;
    let destinationTempArr;

    if (sourceDroppableId == "0") {
      sourceTempArr = [...store.allTickets.recentTickets];
    } else if (sourceDroppableId == "1") {
      sourceTempArr = [...store.allTickets.pendingTickets];
    } else if (sourceDroppableId == "2") {
      sourceTempArr = [...store.allTickets.inProgressTickets];
    } else if (sourceDroppableId == "3") {
      sourceTempArr = [...store.allTickets.completedTickets];
    } else {
      throw "Tsar Bomba 3 💣";
    }
    if (destinationDroppableId == "0") {
      destinationTempArr = [...store.allTickets.recentTickets];
    } else if (destinationDroppableId == "1") {
      destinationTempArr = [...store.allTickets.pendingTickets];
    } else if (destinationDroppableId == "2") {
      destinationTempArr = [...store.allTickets.inProgressTickets];
    } else if (destinationDroppableId == "3") {
      destinationTempArr = [...store.allTickets.completedTickets];
    } else {
      throw "Tsar Bomba 3 💣";
    }

    ticket = {
      ...ticket,
      orderNumber: destinationTempArr.length + 1,
    };

    sourceTempArr = sourceTempArr.filter((_) => _.taskTicketId != ticket.taskTicketId);
    destinationTempArr.push(ticket);

    let state = {};

    if (sourceDroppableId == "0") {
      state.recentTickets = sourceTempArr;
    } else if (sourceDroppableId == "1") {
      state.pendingTickets = sourceTempArr;
    } else if (sourceDroppableId == "2") {
      state.inProgressTickets = sourceTempArr;
    } else if (sourceDroppableId == "3") {
      state.completedTickets = sourceTempArr;
    } else {
      throw "Tsar Bomba 4 💣";
    }

    if (destinationDroppableId == "0") {
      state.recentTickets = destinationTempArr;
    } else if (destinationDroppableId == "1") {
      state.pendingTickets = destinationTempArr;
    } else if (destinationDroppableId == "2") {
      state.inProgressTickets = destinationTempArr;
    } else if (destinationDroppableId == "3") {
      state.completedTickets = destinationTempArr;
    } else {
      throw "Tsar Bomba 4 💣";
    }

    updateStore({
      allTickets: {
        ...store.allTickets,
        ...state,
      },
    });
  };

  const onDragEnd = async (_) => {
    const sourceTicket = _findDraggedTicket(_.source);
    const destinationTicket = _findDraggedTicket(_.destination);
    // Handle reoder
    if (_.source.droppableId == _.destination.droppableId) {
      const subArr = _findDraggedTicketsList(sourceTicket, destinationTicket, _.source.droppableId);
      const reqArr = _findDragRequestArr(sourceTicket, destinationTicket, subArr);
      const stateArr = _findDragStateArr(sourceTicket, destinationTicket, subArr);
      _mutateReOrderTicketsState(_.source.droppableId, stateArr);
      await reorderTickets(reqArr);
    } else {
      // Handle move
      const ticketID = sourceTicket.taskTicketId;
      const flag = _findFlagFromdroppableID(_.destination.droppableId);
      _mutateMoveTicketState(_.source.droppableId, _.destination.droppableId, sourceTicket);
      await moveTicket(ticketID, flag);
    }
  };

  const reorderTickets = async (_) => {
    let response;
    try {
      response = await Api("post", `/tickets/update_ticket_order`, _);
      const _message = response.data.message;
    } catch (e) {
      console.trace(e);
    }
  };

  const moveTicket = async (ticketID, flag) => {
    let response;
    try {
      response = await Api("post", `/tickets/update_ticket_info/${ticketID}/${flag}`);
      const _message = response.data.message;
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <>
      {console.log(store)}
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
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Nouveaux Billets */}
            <div
              className="ds_sl_container"
              style={{
                width: "25vw",
                margin: store?.isSideBar && width < 667 ? "0% 5%" : "",
              }}
            >
              <div
                className="column ds_ml_container"
                style={{
                  padding: "2% 4%",
                }}
              >
                <p className="ds_ml_container_heading">{`Nouveaux Billets ${store.allTickets.recentTickets.length}`}</p>
                <Droppable droppableId="0">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w100 dropable_box_one">
                      {store.allTickets.recentTickets.map((_) => (
                        <Draggable key={_.taskTicketId} draggableId={`${_.taskTicketId}`} index={_.orderNumber}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                padding: "3% 1%",
                margin: store?.isSideBar && width < 667 ? "0% 5%" : "",
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
                <Droppable droppableId="1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w100 dropable_box">
                      {store.allTickets.pendingTickets.map((_) => (
                        <Draggable key={_.taskTicketId} draggableId={`${_.taskTicketId}`} index={_.orderNumber}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                padding: "3% 1%",
                margin: store?.isSideBar && width < 667 ? "0% 5%" : "",
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
                <Droppable droppableId="2">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w100 dropable_box">
                      {store.allTickets.inProgressTickets.map((_) => (
                        <Draggable key={_.taskTicketId} draggableId={`${_.taskTicketId}`} index={_.orderNumber}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                padding: "3% 1%",
                margin: store?.isSideBar && width < 667 ? "0% 5%" : "",
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
                <Droppable droppableId="3">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w100 dropable_box">
                      {store.allTickets.completedTickets.map((_) => (
                        <Draggable key={_.taskTicketId} draggableId={`${_.taskTicketId}`} index={_.orderNumber}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
      <div className="column ds_tlt_container" onClick={handleIsTicketDetailModalOpen}>
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
            {props.categoryName}
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
            {[...props.comments].splice(0, 2).map((_, __) => (
              <img
                className="ip_container"
                src={_.avatar ?? ProfileSVG}
                style={{
                  height: "40px",
                  width: "40px",
                  position: "absolute",
                  left: `${12 * __}pt`,
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
              {props.comments.length}
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

export default AllTickets;

// Reset all tickets order.
// for (let i = 0; i < store.allTickets.recentTickets.length; i++) {
//   const obj = store.allTickets.recentTickets[i];
//   reqArr.push({
//     ticketId: obj.taskTicketId,
//     orderNum: i,
//   });
// }
// for (let i = 0; i < store.allTickets.pendingTickets.length; i++) {
//   const obj = store.allTickets.pendingTickets[i];
//   reqArr.push({
//     ticketId: obj.taskTicketId,
//     orderNum: i,
//   });
// }
// for (let i = 0; i < store.allTickets.inProgressTickets.length; i++) {
//   const obj = store.allTickets.inProgressTickets[i];
//   reqArr.push({
//     ticketId: obj.taskTicketId,
//     orderNum: i,
//   });
// }
// for (let i = 0; i < store.allTickets.completedTickets.length; i++) {
//   const obj = store.allTickets.completedTickets[i];
//   reqArr.push({
//     ticketId: obj.taskTicketId,
//     orderNum: i,
//   });
// }
// return reqArr;
