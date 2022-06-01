import React from "react";

import ModalCrossSVG from "../../assets/ModalCross.svg";

function TicketDetailModal(props) {
  return (
    <div
      className="modal_container"
      style={{
        height: "80vh",
        width: "50vw",
      }}
    >
      <div
        className="row"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "90pt",
          padding: "0 5%",
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
        className="column"
        style={{
          width: "100%",
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
        <div
          className="row"
          style={{
            width: "40%",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <div className="column">
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Lieu</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>R+5</p>
          </div>
          <div className="column">
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Détails du lieu</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>WC HOMME</p>
          </div>
        </div>
        <div
          className="row"
          style={{
            width: "40%",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <div className="column">
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Catégorie</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#494949" }}>Plomberie</p>
          </div>
          <div
            className="column"
            style={{
              alignItems: "flex-end",
            }}
          >
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Priorité</p>
            <div
              className="row"
              style={{
                borderRadius: "20px",
                backgroundColor: "#D8ECFF",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  padding: "5px",
                }}
              >
                Normale
              </p>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            width: "40%",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <div className="column">
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Assignés</p>
            <div
              className="row"
              style={{
                borderRadius: "20px",
                backgroundColor: "#F4F4F4",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  padding: "5px",
                }}
              >
                Anaïs Moriceau
              </p>
            </div>
          </div>
          <div
            className="column"
            style={{
              alignItems: "flex-end",
            }}
          >
            <p style={{ fontSize: "13px", color: "#B7B7B7", paddingBottom: "10pt" }}>Priorité</p>
            <div
              className="row"
              style={{
                borderRadius: "20px",
                backgroundColor: "#F4F4F4",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  padding: "5px",
                }}
              >
                Anaïs Moriceau
              </p>
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
      </div>
    </div>
  );
}

export default TicketDetailModal;
