import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

import dummy from "../../assets/DummyUser.jpeg";


import { useTranslation } from "react-i18next";
import { borderRadius } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };
const AllUsersModal = ({ open,handleOpen,handleClose}) => {
  const { t } = useTranslation();
  return (
    <>
     <div>
      <Modal
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
           <div style={{display:"flex", justifyContent:"space-between"}}> 
          
            <div> 

              <img style={{width:"150px", borderRadius:"50%", marginTop:"33%"}} src={dummy}/>
            </div>
            
            <div style={{width:"70%"}}> 
            <div style={{display:"flex", flexDirection:"column",  padding:"2% 0%", justifyContent:"center", alignItems:"center", width:"50%"}}> 

              <span style={{color:"#2F696D", fontWeight:"600"}}> Ajouter un nouvel utilisateur</span> 
              <span style={{color:"#8C8C8C"}}>IL sera invité par mail.</span>
            </div>
            <div style={{borderBottom:"2px solid #F4F4F4", width:"40%", marginLeft:"5%"}}> 

            </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: "3%",
                marginTop:"3%"
              }}
            >
              <CustomInput
                // labelText={t("First Name")}
                inputType="text"
                inputName="First Name"
                inputPlaceholder="First Name"
                divStyle={{
                  width: "45%",
                }}
                inputStyle={{
                  border:" 2px solid #8C8C8C",
                    borderRadius: "20px"
                }}
                // onChange={(e) => _setState("firstName", e.target.value)}
              />
              <CustomInput
                // labelText={t("Last Name")}
                inputType="text"
                inputName="Last Name"
                inputPlaceholder="Last Name"
                divStyle={{
                  width: "45%",
                }}
                inputStyle={{
                  border:" 2px solid #8C8C8C",
                    borderRadius: "20px"
                }}
                // onChange={(e) => _setState("lastName", e.target.value)}
              />
            </div>
            <CustomInput
            inputStyle={{
              border:" 2px solid #8C8C8C",
                borderRadius: "20px"
            }}
              // labelText={t("Name of Company")}
              inputType="text"
              inputName="Name of Company"
              inputPlaceholder="Name of Company"
              divStyle={{
                marginBottom: "3%",
              }}
              // onChange={(e) => _setState("companyName", e.target.value)}
            />
            <CustomInput
              // labelText={t("Name of Company")}
              inputType="text"
              inputName="Name of Company"
              inputPlaceholder="Name of Company"
              divStyle={{
                marginBottom: "3%",
              }}
              inputStyle={{
                border:" 2px solid #8C8C8C",
                  borderRadius: "20px"
              }}
              // onChange={(e) => _setState("companyName", e.target.value)}
            />
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: "3%",
              }}
            >
              <CustomInput
                // labelText={t("Email Address")}
                inputType="email"
                inputName="Email Address"
                inputPlaceholder="Email Address"
                divStyle={{
                  width: "45%",
                }}
                inputStyle={{
                  border:" 2px solid #8C8C8C",
                    borderRadius: "20px"
                }}
                // onChange={(e) => _setState("email", e.target.value)}
              />
              <CustomInput
                // labelText={t("Phone Number")}
                inputType="text"
                inputName="Phone Number"
                inputPlaceholder="Phone Number"
                divStyle={{
                  width: "45%",
                }}
                inputStyle={{
                  border:" 2px solid #8C8C8C",
                    borderRadius: "20px"
                }}
                // onChange={(e) => _setState("phoneNo", e.target.value)}
              />
            </div>
           

            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: "3%",
              }}
            >
              <div className="select_input_container"> 
              <select className="all_user_select_input">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
              </div>
        
              <div className="select_input_container"> 
              <select className="all_user_select_input">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
              </div>
            </div>
            <div style={{width:"100%"}} className="select_input_container"> 
              <select className="all_user_select_input">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
              </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: "3%",
              }}
            >
            </div>
            </div>

            </div>
            <div style={{display:"flex", justifyContent:"flex-end"}}> 
            {/* <button 
            style={{
              marginRight:"2%",
            borderRadius:"15px"
            }}
            />
           {t("Close")} 
            </button>  */}
            {/* <button 
            style={{
              marginRight:"2%",
            borderRadius:"15px"
            }}
            />
              {t("Sauvegarder ➕")}
            </button> */}
            <button
            className='btn_all_user'
            >
            {t("Close")} 
            </button>
            <button
             className='btn_all_user'
            >
            {t("Sauvegarder ☑️")}
            </button>
            </div>
            
           
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default AllUsersModal