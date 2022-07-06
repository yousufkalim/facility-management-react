import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import Loader from '../../components/Loader';

import ProfileInputSVG from '../../assets/ProfileInput.svg';

import { useTranslation } from 'react-i18next';
import EditProfileIcon from '../../assets/Edit.svg';

import useWindowSize from '../../utils/WindowSize';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';

const AddUser = ({ existingUser, cb, handleClose }) => {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  const user = getUser();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    enterprise: '',
    is_badge_nfc: '0',
    building: '',
  });
  const [attachment, setAttachment] = useState(null);

  const store = Store();
  const updateStore = UpdateStore();

  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  useEffect(() => {
    if (existingUser) {
      setState({
        first_name: existingUser.firstName,
        last_name: existingUser.lastName,
        email: existingUser.email,
        phone: existingUser.phoneNo,
        enterprise: existingUser.businessId,
        is_badge_nfc: existingUser.badgeNFC ? '1' : '0',
        building: existingUser.allowedBuildings[0]?.buildingId,
      });
    }
  }, []);

  useEffect(() => {
    if (store.addUser.isLoading) {
      _load();
    }
  }, []);

  const _load = async () => {
    const _enterprises = await getEnterprises();
    const _buildings = await getBuildings();

    updateStore({
      addUser: {
        ...store.addUser,
        enterprises: _enterprises,
        buildings: _buildings,
        isLoading: false,
      },
    });
  };

  const getBuildings = async () => {
    let response;
    try {
      response = await Api('get', `/buildings/dropdown`);
      const _buildings = response.data.data;
      return _buildings;
    } catch (e) {
      console.trace(e);
    }
  };

  const getEnterprises = async () => {
    let response;
    try {
      response = await Api('get', `/business/dropdown`);
      const _enterprises = response.data.data;
      return _enterprises;
    } catch (e) {
      console.trace(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.addUser(state);

    if (!isValidated) {
      return;
    }

    if (!attachment && !existingUser) {
      toast.error('Attachment must be selected.');
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        password: '12345678',
        parentId: user.id,
        badgeNFC: state.is_badge_nfc == '1' ? true : false,
        businessId: state.enterprise,
        allowedBuildings: [
          {
            buildingId: state.building,
          },
        ],
      };

      if (existingUser) {
        response = await Api('put', '/Users/update_user_profile', {
          ...body,
          employeeId: existingUser.userId,
        });
      } else {
        response = await Api('post', '/register_by_admin', body);
      }

      if (response?.data?.success) {
        if (attachment) {
          let userID;
          if (existingUser) {
            userID = existingUser.userId;
          } else {
            userID = response.data.id;
          }

          const formData = new FormData();

          formData.append('EmployeeId', userID);
          formData.append('ProfileImage', attachment);

          await Api('post', '/Users/updateprofile_pic', formData);
        }
        if (existingUser) {
          toast.success('User updated successfully.');
        } else {
          toast.success('User added successfully.');
        }
        cb();
        handleClose();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  return (
    <>
      <Box className="allusers_modal">
        {store.addUser.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="modal_parent_container">
              <div style={{ position: 'relative' }}>
                <label>
                  <input type="file" accept="image/*" hidden id="filePicker" name="file" onChange={handleFileSelect} />
                  <img className="edit_icon_image edit_icon_image_modal" src={EditProfileIcon} style={{ cursor: 'pointer' }} />
                </label>
              </div>
              <img
                style={{
                  marginTop: '10%',
                }}
                className="input_image"
                src={
                  attachment
                    ? URL.createObjectURL(attachment)
                    : existingUser?.profilePicture
                    ? existingUser.profilePicture
                    : ProfileInputSVG
                }
              />
              <div className="form_heading_box">
                <div className="form_heading_text">
                  <span style={{ color: '#2F696D', fontWeight: '600' }}> Ajouter un nouvel utilisateur</span>
                  <span style={{ color: '#8C8C8C' }}>IL sera invité par mail.</span>
                </div>
                <div
                  className="horizental_seperator"
                  style={{
                    margin: width < 850 ? 'auto' : 'unset',
                  }}
                />
                <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                    marginTop: '3%',
                  }}
                >
                  <CustomInput
                    ptext="Prénom"
                    inputType="text"
                    inputName="First Name"
                    inputPlaceholder="First Name"
                    inputValue={state.first_name}
                    enableYoursStyle={{
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '21px',
                      color: '#8C8C8C',
                      marginBottom: '0px',
                    }}
                    divStyle={{
                      width: width < 667 ? '100%' : '45%',
                    }}
                    inputStyle={{
                      border: ' 2px solid #8C8C8C',
                      borderRadius: '20px',
                    }}
                    labelStyle={{
                      marginBottom: '8px',
                    }}
                    onChange={(e) => _setState('first_name', e.target.value)}
                  />
                  <CustomInput
                    ptext="Nom de famille"
                    inputType="text"
                    inputName="Last Name"
                    inputPlaceholder="Last Name"
                    inputValue={state.last_name}
                    enableYoursStyle={{
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '21px',
                      color: '#8C8C8C',
                      marginBottom: '0px',
                    }}
                    divStyle={{
                      width: width < 667 ? '100%' : '45%',
                    }}
                    inputStyle={{
                      border: ' 2px solid #8C8C8C',
                      borderRadius: '20px',
                    }}
                    labelStyle={{
                      marginBottom: '8px',
                    }}
                    onChange={(e) => _setState('last_name', e.target.value)}
                  />
                </div>
                <CustomInput
                  ptext="E-mail"
                  inputValue={state.email}
                  inputStyle={{
                    border: ' 2px solid #8C8C8C',
                    borderRadius: '20px',
                  }}
                  enableYoursStyle={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#8C8C8C',
                    marginBottom: '0px',
                  }}
                  labelStyle={{
                    marginBottom: '8px',
                  }}
                  inputType="email"
                  inputName="Email"
                  inputPlaceholder="Email"
                  divStyle={{
                    marginBottom: '3%',
                  }}
                  onChange={(e) => _setState('email', e.target.value)}
                />
                <CustomInput
                  ptext="Numéro de portable"
                  inputType="text"
                  inputName="Phone"
                  inputPlaceholder="Phone"
                  inputValue={state.phone}
                  divStyle={{
                    marginBottom: '3%',
                  }}
                  enableYoursStyle={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#8C8C8C',
                    marginBottom: '0px',
                  }}
                  inputStyle={{
                    border: ' 2px solid #8C8C8C',
                    borderRadius: '20px',
                  }}
                  labelStyle={{
                    marginBottom: '8px',
                  }}
                  onChange={(e) => _setState('phone', e.target.value)}
                />
                <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                  }}
                ></div>
                <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                  }}
                >
                  <div className="select_input_container">
                    <label>Entreprise</label>
                    <select
                      style={{ marginTop: '6%' }}
                      className="all_user_select_input"
                      value={state.enterprise}
                      onChange={(e) => _setState('enterprise', e.target.value)}
                    >
                      {store.addUser.enterprises.map((_) => (
                        <option value={_.value}>{_.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="select_input_container">
                    <label>Badge NFC</label>
                    <select
                      style={{ marginTop: '6%' }}
                      className="all_user_select_input"
                      value={state.is_badge_nfc}
                      onChange={(e) => _setState('is_badge_nfc', e.target.value)}
                    >
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
                <div style={{ width: '100%' }} className="select_input_container">
                  <label>Bâtiments accessibles</label>
                  <select
                    className="all_user_select_input"
                    value={state.building}
                    onChange={(e) => _setState('building', e.target.value)}
                  >
                    {store.addUser.buildings.map((_) => (
                      <option value={_.value}>{_.text}</option>
                    ))}
                  </select>
                </div>
                <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                  }}
                ></div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => handleClose()} className="btn_all_user">
                {t('Close')}
              </button>
              <button className="btn_all_user" onClick={handleSubmit}>
                {t('Sauvegarder ☑️')}
              </button>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default AddUser;
