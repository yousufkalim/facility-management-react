import React from 'react'
import SBDeleteIcon from "../../../assets/SBDeleteIcon.svg";
import SBEditIcon from "../../../assets/Edit.svg";
import CustomButton from "../../../components/CustomButton";

const Catogories = () => {
  return (
   <>
    <div style={{ width: "100%", height: "100%", marginTop: "3%" }}>
    <div className="user_profile_info">
      <div className="parent_container_header">
        <div className="batments_levels_actions_conatiner category_actions_container d-flex">
          <div className="prnt d-flex batments_levels_container">
            <div> Category</div>
          </div>
          <div>Action</div>
        </div>
      </div>
      <div
        style={{ background: "#ffffff", borderBottom: "0.2px solid #8C8C8C", color: "#00109E"}}
        className="parent_container_header"
      >
        <div style={{ width: "94%",  padding:"1.2% 0%" }} className="batments_levels_actions_conatiner d-flex">
          <div className="d-flex category_edit_delete_container">
            <div style={{ width: "19%" }} className="d-flex">
            <span className="category_tile" style={{background:"#F4F4F4"}}>Plombre</span>
            </div>
            <div style={{ width: "72%" }}>
            </div>
            <div className="d-flex edit_delete_icon_container aic">
              <div className="img_round_container">
                <img
                src={SBEditIcon} />
              </div>
              <div className="img_round_container">
                <img src={SBDeleteIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CustomButton
          text="Ajouter une nouvelle catégorie ➕"
          // onClick={() => handleOpenAddEditBuilding("addbuilding")}
          style={{
            position: "absolute",
            right: "80pt",
            bottom: "80pt",
          }}
        />
   </>
  )
}

export default Catogories