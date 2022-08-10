import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useSpring, animated } from 'react-spring';

import Tag from '../Tag';

import TicketSettingsSVG from '../../assets/TicketSettings.svg';
import ModalCrossSVG from '../../assets/ModalCross.svg';
import CommentAttachmentSVG from '../../assets/CommentAttachment.svg';
import CommentSendSVG from '../../assets/CommentSend.svg';
import CommentUserSVG from '../../assets/CommentUser.png';

import ReactHtmlParser from 'react-html-parser';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';

function TicketDetailModal(props) {
  const user = getUser();
  const store = Store();
  const updateStore = UpdateStore();
  const [isLoaded, setLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    if (!text) {
      toast.error("Text can't be empty.");
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = new FormData();

      body.append('TaskTicketId', props.taskTicketId);
      body.append('EmployeeId', user.id);
      body.append('MessageText', text);

      response = await Api('post', '/tickets/comment_on_task', body);

      if (response?.data?.success) {
        addCommentToState();
        setText('');
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const addCommentToState = () => {
    const now = new Date();
    const utcNow = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );

    const body = {
      ticketMessageId: null,
      taskTicketId: props.taskTicketId,
      parentId: null,
      employeeName: `${user.firstName} ${user.lastName}`,
      employeePic: `${user.profilePicture}`,
      messageText: text,
      attachFile: null,
      commentDateTime: utcNow,
    };

    let ticket;
    let tickets;
    if (props.flagStatus == 4) {
      ticket = store.allTickets.recentTickets.filter((__) => __.taskTicketId == props.taskTicketId)[0];
      tickets = [...store.allTickets.recentTickets];
    } else if (props.flagStatus == 3) {
      ticket = store.allTickets.pendingTickets.filter((__) => __.taskTicketId == props.taskTicketId)[0];
      tickets = [...store.allTickets.pendingTickets];
    } else if (props.flagStatus == 2) {
      ticket = store.allTickets.inProgressTickets.filter((__) => __.taskTicketId == props.taskTicketId)[0];
      tickets = [...store.allTickets.inProgressTickets];
    } else if (props.flagStatus == 1) {
      ticket = store.allTickets.completedTickets.filter((__) => __.taskTicketId == props.taskTicketId)[0];
      tickets = [...store.allTickets.completedTickets];
    }
    ticket.comments.push(body);
    const index = tickets.map((_) => _.taskTicketId).indexOf(ticket.taskTicketId);
    tickets[index] = ticket;

    if (props.flagStatus == 4) {
      updateStore({
        ...store,
        allTickets: {
          ...store.allTickets,
          recentTickets: tickets,
        },
      });
      ticket = store.allTickets.recentTickets.filter((__) => __.taskTicketId == props.taskTicketId)[0];
    } else if (props.flagStatus == 3) {
      updateStore({
        ...store,
        allTickets: {
          ...store.allTickets,
          pendingTickets: tickets,
        },
      });
    } else if (props.flagStatus == 2) {
      updateStore({
        ...store,
        allTickets: {
          ...store.allTickets,
          inProgressTickets: tickets,
        },
      });
    } else if (props.flagStatus == 1) {
      updateStore({
        ...store,
        allTickets: {
          ...store.allTickets,
          completedTickets: tickets,
        },
      });
    }

    setText('');
  };
  // const handleImagesSelect = (e) => {
  //   console.log(e.target.files[0]);
  // };
  //const animationProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  const animationProps = useSpring({
    opacity: 1,
    delay: 100,
    reset: isLoaded,
    transform: 'translateX(0px)',
    from: {
      opacity: 0,
      transform: 'translateX(250px)',
    },
  });
  return (
    <animated.div
      style={{
        transform: 'none',
        top: '0%',
        height: '100%',
        borderRadius: '0',
        ...animationProps,
      }}
      className="modal_container"
    >
      <div
        className="row w100 aic"
        style={{
          justifyContent: 'space-between',
          padding: '4% 5%',
          backgroundColor: '#F4F4F4',
        }}
      >
        <div className="row">
          <div
            style={{
              paddingRight: '10%',
            }}
          >
            <img
              src={TicketSettingsSVG}
              style={{
                height: '40px',
                width: '40px',
              }}
            />
          </div>
          <div className="column">
            <p
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#436062',
                marginBottom: '1%',
              }}
            >
              {ReactHtmlParser(props.categoryName)}
            </p>
            <p
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#8C8C8C',
                whiteSpace: 'nowrap',
              }}
            >
              {`Ticket n°${props.taskTicketId}`}
            </p>
          </div>
        </div>
        <img src={ModalCrossSVG} style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={props.handleClose} />
      </div>
      <div
        className="column w100"
        style={{
          height: 'auto',
          padding: '0 5%',
        }}
      >
        <p
          style={{
            marginTop: '4%',
            marginBottom: '2%',
            fontSize: '12px',
            color: '#9A9A9A',
          }}
        >
          Bâtiment accessibles
        </p>
        <div
          className="row"
          style={{
            marginBottom: '5%',
          }}
        >
          <div
            className="row"
            style={
              {
                // borderRadius: '20px',
                // backgroundColor: '#D8ECFF',
                // marginRight: '4%',
                // padding: '4%',
              }
            }
          >
            <p
              style={{
                fontSize: '12px',
                whiteSpace: 'nowrap',
                borderRadius: '20px',
                backgroundColor: '#D8ECFF',
                marginRight: '4%',
                padding: '10% 35%',
                fontWeight: '600',
                color: '#494949',
              }}
            >
              {props.building}
            </p>
          </div>
        </div>
        <div className="row w100">
          <div
            className="column"
            style={{
              width: '30%',
            }}
          >
            <div className="column" style={{ marginBottom: '10%' }}>
              <p style={{ fontSize: '13px', color: '#B7B7B7', paddingBottom: '10pt' }}>Lieu</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#494949' }}>
                {props?.details === 'undefined' || !props?.details ? 'NA' : props?.details}
              </p>
            </div>
            {/* <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Catégorie</p>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>{props.categoryName}</p>
            </div> */}
            <div className="column" style={{ marginBottom: '10%' }}>
              <p style={{ fontSize: '13px', color: '#B7B7B7', paddingBottom: '10pt' }}>Assignés</p>
              {/* <Tag color="#F4F4F4" text="Anaïs Moriceau" /> */}
              <div
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#F4F4F4',
                  marginRight: '4%',
                  padding: '10% 35%',
                  fontWeight: '600',
                  color: '#494949',
                }}
              >
                {props?.employeeName ? props?.employeeName : 'NA'}
              </div>
            </div>
          </div>
          <div
            className="column"
            style={{
              width: '30%',
            }}
          >
            <div className="column" style={{ marginBottom: '10%' }}>
              <p style={{ fontSize: '13px', color: '#B7B7B7', paddingBottom: '10pt' }}>Détails du lieu</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#494949' }}>
                {props?.locationDetails == 'undefined' || !props?.locationDetails ? 'NA' : props?.locationDetails}
              </p>
            </div>
            {/* <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Priorité</p>
              <Tag color="#D8ECFF" text={props.taskPriority} />
            </div> */}
            {/* <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Abonnés</p>
              <div className="row">
                <Tag color="#F4F4F4" text="Anaïs Moriceau" divStyle={{ marginRight: "5%" }} />
                <Tag color="#F4F4F4" text="damien dehoul" />
              </div>
            </div> */}
          </div>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#8C8C8C',
            paddingBottom: '2%',
          }}
        >
          Note importante
        </p>
        <p
          style={{
            fontSize: '12px',
            color: '#494949',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula nunc, suscipit id vestibulum vel, gravida
          tincidunt diam. Cras non lacus finibus, auctor elit ut.
        </p>
        <div
          className="w100"
          style={{
            height: '1px',
            marginTop: '3%',
            marginBottom: '3%',
            backgroundColor: '#D5D5D5',
          }}
        />
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#2F696D',
            marginBottom: '3%',
          }}
        >
          Histoire
        </p>
        <div
          className="w100"
          style={{
            padding: '0 5%',
            paddingBottom: '10%',
          }}
        >
          <div
            className="wh100"
            style={{
              position: 'relative',
            }}
          >
            <input
              value={text}
              type="text"
              placeholder="Tapez un commentaire ici"
              className="appbar_row3_input w100"
              style={{
                padding: '10px 15px',
                backgroundColor: '#F4F4F4',
                borderRadius: '20px',
              }}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="column ajc appbar_row3_search_img tdm_comment_images_img">
              <label className="upload-pic-label" htmlFor="imagePicker">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="imagePicker"
                  name="file"
                  hidden
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <img src={CommentAttachmentSVG} />
              </label>
            </div>
            <div
              className="column ajc appbar_row3_search_img tdm_comment_images_img"
              style={{
                right: '2%',
                backgroundColor: '#2F696D',
              }}
              onClick={handleSubmit}
            >
              <img src={CommentSendSVG} />
            </div>
          </div>
        </div>
        <div
          className="column w100"
          style={{
            paddingBottom: '10%',
          }}
        >
          <CustomStepper comments={props.comments} />
        </div>
      </div>
    </animated.div>
  );
}

function CustomStepper({ comments }) {
  return (
    <div className="column w100 ajc">
      {comments.map((_) => (
        <CommentListTile {..._} />
      ))}
      <div
        className="row"
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '51%',
        }}
      >
        <div
          style={{
            height: '10pt',
            width: '10pt',
            borderRadius: '50%',
            backgroundColor: '#2F696D',
            marginRight: '10pt',
          }}
        />
        <p style={{ fontSize: '12px', color: '#8C8C8C', fontWeight: '600' }}>L'administrateur a créé un ticket</p>
      </div>
    </div>
  );
}

function CommentListTile(props) {
  return (
    <div
      className="column w100"
      style={{
        marginBottom: '5pt',
      }}
    >
      <div className="row ajc w100">
        <div className="column">
          <p style={{ fontSize: '12px', color: '#8C8C8C' }}>
            {moment.utc(props.commentDateTime).local().format('LT dddd D,MMM YYYY').length < 35
              ? moment.utc(props.commentDateTime).local().format('LT dddd D,MMM YYYY')
              : moment.utc(props.commentDateTime).local().format('LT dddd D,MMM YYYY').slice(0, 32) + '...'}
          </p>
        </div>
        <img
          src={props.employeePic ?? CommentUserSVG}
          className="ip_container"
          style={{ height: '40pt', width: '40pt', margin: '0 10pt' }}
        />
        <p style={{ fontSize: '12px', color: '#8C8C8C', fontWeight: '600' }}>{`${props.employeeName} a ajouté un commentaire`}</p>
      </div>
      <div
        className="row ajc w100"
        style={{
          paddingLeft: '46%',
        }}
      >
        <div
          style={{
            height: '90%',
            width: '1px',
            marginRight: '10pt',
            backgroundColor: '#D5D5D5',
          }}
        />
        <div
          className="column w100"
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '20pt',
            padding: '15pt',
          }}
        >
          <p
            className="w100"
            style={{
              fontSize: '14px',
              color: '#2F696D',
            }}
          >
            {props.messageText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailModal;
