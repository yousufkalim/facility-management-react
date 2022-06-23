import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import UXL from "../../components/UXL";

import StatisticsHeadBlackSVG from "../../assets/StatisticsHeadBlack.png";
import StatisticsHeadGreenSVG from "../../assets/StatisticsHeadGreen.png";
import StatisticsHeadYellowSVG from "../../assets/StatisticsHeadYellow.png";

import { Store, UpdateStore } from "../../StoreContext";

const headArr = [
  {
    title: "tickets créés",
    description: "depuis le début",
    color: "#5B5B5B",
    background: StatisticsHeadBlackSVG,
  },
  {
    title: "tickets résolus",
    description: "depuis le débuts",
    color: "#44787B",
    background: StatisticsHeadGreenSVG,
  },
  {
    title: "tickets",
    description: "actuellement en cours",
    color: "#FF974D",
    background: StatisticsHeadYellowSVG,
  },
];

const footArr = [
  {
    title: "Bâtiment Rough",
    color: "#9E2600",
    value: 78,
  },
  {
    title: "Bâtiment Bleu",
    color: "#00109E",
    value: 54,
  },
  {
    title: "Bâtiment Jaune",
    color: "#A8A91B",
    value: 23,
  },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Tickets",
    },
  },
  layout: {
    padding: {
      top: 20,
      left: 100,
      right: 100,
      bottom: 20,
    },
  },
  maintainAspectRatio: false,
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
const data = {
  labels,
  datasets: [],
};
for (let i = 0; i < headArr.length; i++) {
  const obj = headArr[i];
  data.datasets.push({
    label: obj.title,
    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    backgroundColor: obj.color,
  });
}

function StatisticsScreen() {
  const { t } = useTranslation();
  const store = Store();
  return (
    <UXL appBarText="Statistics">
      <div
        className="column wh100"
        style={{
          backgroundColor: "#F4F4F4",
          padding: "3% 2%",
          width: store?.isSideBar ? "97%" : "100%",
        }}
      >
        <div className="row w100 header_list_container">
          {headArr.map((_) => (
            <HeaderListTile {..._} />
          ))}
        </div>
        <div
          className="w100 bar_conatiner"
        >
          <Bar options={options} data={data} />
        </div>
        <div
          className="column w100 jcc percentage_container"
          // style={{
          //   backgroundColor: "#FFFFFF",
          //   height: "30vh",
          //   borderRadius: "20px",
          //   // padding: "2%, 3%",
          // }}
        >
          <p style={{ marginLeft: "3%", marginBottom: "3%", color: "#4F4F4F", fontWeight: "600" }}>
            Emplacement avec la plupart des tickets
          </p>
          <div className="column jcc w100">
            {footArr.map((_) => (
              <div className="row aic" style={{ width: "80%", marginBottom: "1%" }}>
                <p style={{ paddingLeft: "6%", paddingRight: "3%", color: _.color, fontWeight: "600" }}>{_.title}</p>
                <div
                  style={{
                    height: "10pt",
                    width: `${5 * _.value}pt`,
                    maxWidth: "50%",
                    backgroundColor: _.color,
                    borderRadius: "20px",
                    paddingLeft: "6%",
                  }}
                />
                <p style={{ paddingLeft: "3%", fontSize: "16px", color: _.color }}>{_.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UXL>
  );
}

function HeaderListTile(props) {
  return (
    <div className="row aic header_list_tile_container">
      <div
        className="column"
        style={{
          padding: "10% 0",
          paddingLeft: "20pt",
          paddingRight: "180pt",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: props.color,
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: props.color,
          }}
        >
          {props.description}
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <img
          src={props.background}
          style={{
            position: "absolute",
            height: "60pt",
            width: "100pt",
            left: "-100pt",
            bottom: "-30pt",
          }}
        />
        <p
          style={{
            position: "absolute",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FFFFFF",
            left: "-60pt",
            bottom: "-8pt",
          }}
        >
          100
        </p>
      </div>
    </div>
  );
}

export default StatisticsScreen;
