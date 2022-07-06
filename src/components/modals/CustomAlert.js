import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const CustomAlert = ({ text }) => {
  return (
    <>
      <div
        style={{
          height: "30vh",
          width: "28vw",
          background: "#2F696D",
          borderRadius: "50px",
        }}
        className="modal_container"
      >
        <div className="circle_container">
          <div id="outer-circle">
            <div id="inner-circle">
              <DoneRoundedIcon
                className="done_icon"
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "69%",
                  left: "16%",
                  color: "#2F696D",
                }}
              />
            </div>
          </div>
          <div className="alert_box_text"> Ticket Created Successfully!</div>
        </div>
      </div>
    </>
  );
};

export default CustomAlert;
