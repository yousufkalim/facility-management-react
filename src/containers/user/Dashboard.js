import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { Modal } from "@mui/material";

import TagBuildingSVG from "../../assets/TagBuilding.svg";

import TicketTextSVG from "../../assets/TicketText.svg";
import TicketSettingsSVG from "../../assets/TicketSettings.svg";

import TicketCommentSVG from "../../assets/TicketComment.svg";

import User1AvatarSVG from "../../assets/User1Avatar.png";
import User2AvatarSVG from "../../assets/User2Avatar.png";

import UXL from "../../components/UXL";
import TicketDetailModal from "../../components/modals/TicketDetail";

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
  return (
    <UXL>
      <div
        className="row uxl_children_container"
        style={{
          justifyContent: "flex-start",
          backgroundColor: "#F4F4F4",
          overflow: "hidden",
        }}
      >
        {/* Nouveaux Billets */}
        <div
          className="column ds_ml_container"
          style={{
            padding: "2%",
          }}
        >
          <p
            style={{
              padding: "4% 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#A9A9A9",
            }}
          >
            Nouveaux Billets 5
          </p>
          {[1, 2, 3, 4, 5].map((_) => (
            <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
          ))}
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
              padding: "2% 4%",
            }}
          >
            {[1, 2, 3, 4, 5].map((_) => (
              <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
            ))}
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
              padding: "2% 4%",
            }}
          >
            {[1, 2, 3, 4, 5].map((_) => (
              <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
            ))}
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
              padding: "2% 4%",
            }}
          >
            {[1, 2, 3, 4, 5].map((_) => (
              <TicketListTile {...(_ % 2 == 0 ? tickets[0] : tickets[1])} />
            ))}
          </div>
        </div>
      </div>
    </UXL>
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
      <div
        className="row"
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: "12%",
        }}
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
      </div>
      <p
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#8C8C8C",
        }}
      >
        {new Date(props.createdAt).toLocaleDateString("en-US")}
      </p>
      <div
        style={{
          height: "1px",
          width: "100%",
          marginTop: "3%",
          marginBottom: "3%",
          backgroundColor: "#D5D5D5",
        }}
      />
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
              style={{ height: "40px", width: "40px", position: "absolute", left: `${20 * __}pt`, top: "-10pt" }}
            />
          ))}
        </div>

        <div
          className="row"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#8C8C8C",
              fontSize: "14px",
              marginRight: "20%",
            }}
          >
            {props.comments_count}
          </p>
          <img src={TicketCommentSVG} style={{ height: "20px", width: "20px" }} />
        </div>
      </div>
      <Modal open={isTicketDetailModal} onClose={handleIsTicketDetailModalClose} aria-labelledby="Ticket Detail">
        <TicketDetailModal {...props} handleClose={handleIsTicketDetailModalClose} />
      </Modal>
    </div>
  );
}

export default DashboardScreen;
