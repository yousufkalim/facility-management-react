import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import UXL from "../../components/UXL";

function StatisticsScreen() {
  const { t } = useTranslation();
  return (
    <UXL appBarText="Statistics">
      <div
        className="column uxl_children_container"
        style={{
          padding: "3% 2%",
        }}
      >
        <div></div>
      </div>
    </UXL>
  );
}

export default StatisticsScreen;
