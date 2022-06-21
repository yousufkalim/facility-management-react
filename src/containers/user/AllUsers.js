import React, { useState } from "react";

import UXL from "../../components/UXL";

import dummy from '../../assets/DummyUser.jpeg'
import badge from '../../assets/Badge.svg'

import { Store } from "../../StoreContext";

const items = [
  {
    id: 0,
    text: "Invitations envoyées",
  },
  {
    id: 1,
    text: "Utilisateurs",
  },
];
const userDetail = [
  {
    id: "ihtisham",
    name: "ihtisham",
    designation: "AXA",
  },
  {
    id: "hassan",
    name: "hassan",
    designation: "VXA",
  },
  {
    id: "shuja",
    name: "shuja",
    designation: "Developer",
  },
  {
    id: "umar",
    name: "umar",
    designation: "Developer",
  },
];
const AllUsers = () => {
  const [activeTabId, setActiveTabId] = useState("");
  const store = Store();

  const ActiveTab = (activetabid) => {
    setActiveTabId(activetabid);
  };
  return (
    <>
      <UXL appBarText="Allusers">
        <div
          className="row uxl_children_container"
          style={{
            justifyContent: "flex-start",
            backgroundColor: "#F4F4F4",
            overflow: "hidden",
            width: store?.isSideBar ? "97%" : "100%",
          }}
        >
          <div
            className="column ds_ml_container"
          >
            <div className="tab_container">
              {items?.map((val) => (
                <p
                  className={` ${val?.id == activeTabId ? "active_tab" : ""}`}
                  id={val?.id}
                  onClick={() => ActiveTab(val?.id)}
                >
                  {val?.text}
                </p>
              ))}
            </div>
            {activeTabId == 0 ? (
              <>
              </>
            ) : null}
            {activeTabId == 1 ? (
              <>
                <UserCard />
              </>
            ) : null}

            <div style={{ marginTop: "30px" }}></div>
          </div>
        </div>
      </UXL>
    </>
  );
};

function UserCard() {
  return (
    <>
      {
        userDetail?.map((val)=>(
          <div className="user_detail_conatiner">
            <div className="user_detail_img_detail_container">
                <div className="badge_container">
                    <img
                
                    src={badge}
                    />
                </div>
                <img 
                src={dummy}
                /> 
                <div className="user_detail_name_designation"> 
            <span className="user_name">{val?.name}</span>
            <span className="user_designation">{val?.designation}</span>
                </div>
           
            </div>
           
          </div>
        ))
      }
    </>
  );
}
export default AllUsers;
