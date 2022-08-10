import TagBuildingSVG from "../assets/TagBuilding.svg";
import TicketTextSVG from "../assets/TicketText.svg";
import TicketSettingsSVG from "../assets/TicketSettings.svg";
import User1AvatarSVG from "../assets/User1Avatar.png";
import User2AvatarSVG from "../assets/User2Avatar.png";

const kRegExpEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const kRegExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const kRegExpPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const kRegExpUserName = /^[a-zA-Z0-9_\.]+$/;

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

const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const buildingColors = ["#00109E", "#9E2600", "#F18200", "#F4F4F4", "#494949", "#00A9B5", "#7B61FF", "#A8A91B"];
const buildingLevels = [
  "Level A",
  "Level B",
  "Level C",
  "Level D",
  "Level E",
  "Level F",
  "Level G",
  "Level H",
  "Level I",
  "Level J",
  "Level K",
  "Level L",
  "Level M",
  "Level N",
  "Level O",
  "Level P",
  "Level Q",
  "Level R",
  "Level S",
  "Level T",
  "Level U",
  "Level V",
  "Level W",
  "Level X",
  "Level Y",
  "Level Z",
];

export { kRegExpEmail, kRegExpPassword, kRegExpPhone, kRegExpUserName, tags, tickets, months, buildingColors, buildingLevels };
