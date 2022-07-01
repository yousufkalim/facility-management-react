import React from 'react'

import CustomInput from "../CustomInput";

import { useTranslation } from "react-i18next";

const AddBuilding = () => {

    const { t } = useTranslation();

    const colorsarray = [
      {
        color: "#00109E",
      },
      {
        color: "#9E2600",
      },
      {
        color: "#F18200",
      },
      {
        color: "#F4F4F4",
      },
      {
        color: "#494949",
      },
      {
        color: "#00A9B5",
      },
      {
        color: "#7B61FF",
      },
      {
        color: "#9B9E00",
      },
    ];
    const levels = [
      {
        text: "Level A",
      },
      {
        text: "Level B",
      },
      {
        text: "Level C",
      },
      {
          text: "Level A",
        },
        {
          text: "Level B",
        },
        {
          text: "Level C",
        },
        {
          text: "Level A",
        },
        {
          text: "Level B",
        },
        {
          text: "Level C",
        },
        {
          text: "Level A",
        },
        {
          text: "Level B",
        },
        {
          text: "Level C",
        },
    ];
  return (
   <>
     <div style={{padding:"1% 4%"}} className="allusers_modal">
        <div className="modal_parent_container">
          <div style={{ width: "100%" }} className="form_heading_text edit_building_header">
            <span style={{ color: "#2F696D", fontWeight: "600" }}>Add le bâtiment</span>
            <span style={{ color: "#8C8C8C" }}>Cela s'affichera lorsque vous ajouterez de nouveaux tickets ou utilisateurs</span>
            <div className="horizental_seperator"></div>
            <CustomInput
              ptext="Nom du bâtiment"
              inputType="text"
              inputName="Bâtiment Orange"
              inputPlaceholder="Bâtiment Orange"
              //   inputValue={state.first_name}
              enableYoursStyle={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#8C8C8C",
                marginBottom: "0px",
              }}
              divStyle={{
                width: "100%",
              }}
              inputStyle={{
                border: " 2px solid #8C8C8C",
                borderRadius: "20px",
              }}
              labelStyle={{
                marginBottom: "8px",
              }}
              //   onChange={(e) => _setState("first_name", e.target.value)}
            />
            <div  className="colors_btn_container">
              <span className="colors_heading"> Couleur du bâtiment</span>
              <div className="colors_container d-flex space-between aic">
                {colorsarray.map((color) => (
                  <div style={{ background: color?.color }} className="colored_circle">
                    {" "}
                  </div>
                ))}
                <div>
                  <span
                    style={{ color: "#8C8C8C", borderBottom: "0.8px solid #8C8C8C" }}
                    onClick={() => console.log("clicked")}
                    className="load_more_btn"
                  >
                    {" "}
                    Load More
                  </span>{" "}
                </div>
              </div>
              <span className="colors_heading"> Lieu</span>
              <div className="levels_box_container">
                        {levels.map((_) => (
                          <span className="levels" style={{background:"#D8ECFF", padding: "2% 2%"}}>{_?.text} </span>
                        ))}
                     <div className="d-flex aic"> <span onClick={()=>console.log("clicked")} className="load_more_btn"> Load More</span></div>  
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", margin:"2%" }}>
                <button onClick={() => console.log("fdf")} className="btn_all_user">
                  {t("Jeter")}
                </button>
                <button className="btn_all_user" onClick={()=>console.log("")}  >
                  {t("Sauvegarder ☑️")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default AddBuilding