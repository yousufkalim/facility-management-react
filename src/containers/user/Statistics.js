import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        className="column uxl_children_container"
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
          className="w100"
          style={{
            backgroundColor: "#FFFFFF",
            height: "45vh",
            marginBottom: "2%",
            borderRadius: "20px",
          }}
        >
          <Bar options={options} data={data} />
        </div>
        <div
          className="w100"
          style={{
            backgroundColor: "#FFFFFF",
            height: "30vh",
            borderRadius: "20px",
          }}
        ></div>
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
