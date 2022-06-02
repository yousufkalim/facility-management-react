import React, { useState } from "react";

import ModalCrossSVG from "../../assets/ModalCross.svg";
import CommentAttachmentSVG from "../../assets/CommentAttachment.svg";
import CommentSendSVG from "../../assets/CommentSend.svg";
import CommentUserSVG from "../../assets/CommentUser.png";

function TicketDetailModal(props) {
  return (
    <div
      className="modal_container"
      style={{
        height: "80vh",
        width: "50vw",
        overflowY: "scroll",
      }}
    >
      <div
        className="row w100 aic"
        style={{
          justifyContent: "space-between",
          padding: "4% 5%",
          backgroundColor: "#F4F4F4",
        }}
      >
        <div className="row">
          <div
            style={{
              paddingRight: "10%",
            }}
          >
            <img
              src={props.icon}
              style={{
                height: "40px",
                width: "40px",
              }}
            />
          </div>
          <div className="column">
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#436062",
                marginBottom: "1%",
              }}
            >
              {props.title}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#8C8C8C",
              }}
            >
              Ticket n°1528
            </p>
          </div>
        </div>
        <img src={ModalCrossSVG} style={{ height: "30px", width: "30px", cursor: "pointer" }} onClick={props.handleClose} />
      </div>
      <div
        className="column w100"
        style={{
          height: "auto",
          padding: "0 5%",
        }}
      >
        <p
          style={{
            marginTop: "4%",
            marginBottom: "2%",
            fontSize: "12px",
            color: "#9A9A9A",
          }}
        >
          Bâtiment accessibles
        </p>
        <div
          className="row"
          style={{
            marginBottom: "5%",
          }}
        >
          {props.tags.map((_) => (
            <div
              className="row"
              style={{
                borderRadius: "20px",
                backgroundColor: _.color,
                marginRight: "4%",
                padding: "4%",
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
        <div className="row w100">
          <div
            className="column"
            style={{
              width: "30%",
            }}
          >
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Lieu</p>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>R+5</p>
            </div>
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Catégorie</p>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>Plomberie</p>
            </div>
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Assignés</p>
              <Tag color="#F4F4F4" text="Anaïs Moriceau" />
            </div>
          </div>
          <div
            className="column"
            style={{
              width: "30%",
            }}
          >
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Détails du lieu</p>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>WC HOMME</p>
            </div>
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Priorité</p>
              <Tag color="#D8ECFF" text="Normale" />
            </div>
            <div className="column" style={{ marginBottom: "10%" }}>
              <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Abonnés</p>
              <div className="row">
                <Tag color="#F4F4F4" text="Anaïs Moriceau" divStyle={{ marginRight: "5%" }} />
                <Tag color="#F4F4F4" text="damien dehoul" />
              </div>
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#8C8C8C",
            paddingBottom: "2%",
          }}
        >
          Note importante
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#494949",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula nunc, suscipit id vestibulum vel, gravida
          tincidunt diam. Cras non lacus finibus, auctor elit ut.
        </p>
        <div
          className="w100"
          style={{
            height: "1px",
            marginTop: "3%",
            marginBottom: "3%",
            backgroundColor: "#D5D5D5",
          }}
        />
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#2F696D",
            marginBottom: "3%",
          }}
        >
          Histoire
        </p>
        <div
          className="w100"
          style={{
            padding: "0 5%",
            paddingBottom: "10%",
          }}
        >
          <div
            className="wh100"
            style={{
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Tapez un commentaire ici"
              className="appbar_row3_input w100"
              style={{
                padding: "10px 15px",
                backgroundColor: "#F4F4F4",
                borderRadius: "20px",
              }}
            />
            <div
              className="column ajc appbar_row3_search_img tdm_comment_images_img"
              style={{
                right: "8%",
                backgroundColor: "#FFFFFF",
                boxShadow: "2px 2px 2px #d1cbc6",
              }}
            >
              <img src={CommentAttachmentSVG} />
            </div>
            <div
              className="column ajc appbar_row3_search_img tdm_comment_images_img"
              style={{
                right: "2%",
                backgroundColor: "#2F696D",
              }}
            >
              <img src={CommentSendSVG} />
            </div>
          </div>
        </div>
        <div
          className="column w100"
          style={{
            paddingBottom: "10%",
          }}
        >
          <CustomStepper />
        </div>
      </div>
    </div>
  );
}

function Tag({ text, color, divStyle, pStyle }) {
  return (
    <div
      className="row"
      style={{
        borderRadius: "20px",
        backgroundColor: color,
        ...divStyle,
      }}
    >
      <p
        style={{
          fontSize: "12px",
          whiteSpace: "nowrap",
          padding: "5px",
          ...pStyle,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function CustomStepper() {
  return (
    <div className="column w100 ajc">
      <div
        className="column w100"
        style={{
          marginBottom: "5pt",
        }}
      >
        <div className="row ajc w100">
          <div className="column">
            <p style={{ fontSize: "12px", color: "#8C8C8C" }}>Thursday 21, Apr 2022</p>
            <p style={{ fontSize: "13px", color: "#8C8C8C", fontWeight: "600" }}>7:00 PM</p>
          </div>
          <img src={CommentUserSVG} className="ip_container" style={{ height: "40pt", width: "40pt", margin: "0 10pt" }} />
          <p style={{ fontSize: "12px", color: "#8C8C8C", fontWeight: "600" }}>Damien dehoul a commenté2</p>
        </div>
        <div
          className="row ajc w100"
          style={{
            paddingLeft: "46%",
          }}
        >
          <div
            style={{
              height: "90%",
              width: "1px",
              marginRight: "10pt",
              backgroundColor: "#D5D5D5",
            }}
          />
          <div
            className="column w100"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "20pt",
              padding: "15pt",
            }}
          >
            <p
              className="w100"
              style={{
                fontSize: "14px",
                color: "#2F696D",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula nunc, suscipit id vestibulum vel, gravida
              tincid Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Vestibulum ligula nunc, suscipit id vestibulum vel, gravida tincid Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula nunc, suscipit id
              vestibulum vel, gravida tincid Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vestibulum ligula nunc, suscipit id vestibulum vel, gravida tincid Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula
              nunc, suscipit id vestibulum vel, gravida tincid Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>

      <div
        className="row"
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "80%",
        }}
      >
        <div
          style={{
            height: "10pt",
            width: "10pt",
            borderRadius: "50%",
            backgroundColor: "#2F696D",
            marginRight: "10pt",
          }}
        />
        <p style={{ fontSize: "12px", color: "#8C8C8C", fontWeight: "600" }}>Damien dehoul a créé le ticket Fuite d'eau lavabo</p>
      </div>
    </div>
  );
}

export default TicketDetailModal;
