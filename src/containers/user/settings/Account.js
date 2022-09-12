import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { hexToCSSFilter } from 'hex-to-css-filter';

import Loader from '../../../components/Loader';

import DummyUserSVG from '../../..//assets/DummyUser.jpeg';
import EditSVG from '../../../assets/Edit.svg';
import EditIconSelectedSVG from '../../../assets/EditIconSelected.svg';
import SearchSVG from '../../../assets/Search.svg';
import FooterSVG from '../../../assets/Cornerimage.svg';
import TicketIcon from '../../../assets/TicketIcon.svg';
import TicketTracking from '../../../assets/TicketTracking.svg';
import AsignTicket from '../../../assets/AssignTicket.svg';
import EditProfileIcon from '../../../assets/Edit.svg';
import NewRoundTicket from '../../../assets/NewRoundTicket.svg';
import RoundTrackingTicket from '../../../assets/RoundTrackingTicket.svg';
import ProfileInputSVG from '../../../assets/ProfileInput.svg';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import { Store, UpdateStore } from '../../../StoreContext';
import useWindowSize from '../../../utils/WindowSize';

import * as FormValidations from '../../../utils/Validations';
import Api from '../../../api';
import { toast } from 'react-toastify';
import { getUser, setUser } from '../../../utils/Auth';

const switchesAdmin = [
  {
    image: TicketIcon,
    text: 'Nouveau ticket',
  },
  {
    image: TicketTracking,
    text: 'Suivi de ticket',
  },
  {
    image: AsignTicket,
    text: 'Assignation à un ticket',
  },
];
const switchesUser = [
  {
    image: TicketTracking,
    text: 'Suivi de ticket',
    name: 'TicketTracking',
  },
  {
    image: AsignTicket,
    text: 'Assignation à un ticket',
    name: 'AssignmentTicket',
  },
];

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 32,
    height: 14,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#2F696D',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 10,
      height: 10,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#494949' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const Account = ({ userInfo }) => {
  const store = Store();
  const { t } = useTranslation();
  const user = getUser();
  const [width] = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);
  const [attachment, setAttachment] = useState(null);
  const [existingimage, setexistingimage] = useState(); ////state for existing Profile Picture
  const [checked, setchecked] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company_name: '',
  });
  const [edit, setEdit] = useState(false);

  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };

  useEffect(() => {
    _load();
  }, []);

  const _load = async () => {
    const _profile = await getProfile();
    setState({
      first_name: _profile.firstName,
      last_name: _profile.lastName,
      email: _profile.email,
      phone: _profile.phoneNo,
      enterprise: _profile.enterprise,
      passwordChangedStatus: _profile?.passwordChangedStatus,
      trackingTicket: _profile?.trackingTicket,
      assignmentToTicket: _profile?.assignmentToTicket,
      newTicket: _profile?.newTicket,
      profilePicture: _profile?.profilePicture,
      allowedBuildings: _profile?.allowedBuildings,
    });
    setIsLoading(false);
  };
  const getProfile = async () => {
    let response;
    try {
      response = await Api('get', `/Users/userprofile/${user.id}`);
      console.log(response, 'response');
      const _profile = response.data.data;
      return _profile;
    } catch (e) {
      console.trace(e);
    }
  };

  const handleEdit = async (e) => {
    if (!edit) {
      setEdit(true);
    } else {
      await handleSubmit(e);
      setEdit(false);
    }
  };
  ////////onchange function for profile picture
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      toast.error('Only image can be selected');
      return;
    }
    setAttachment(file);
  };
  const handleSubmit = async (event, togglebtnname, value) => {
    event.preventDefault();

    console.log(togglebtnname, 'togglebtnname');
    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.updateAdmin(state);

    if (!isValidated) {
      return;
    }

    let response;
    try {
      setIsProcessing(true);

      const bodyadmin = {
        userId: user.id,
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        enterprise: state.enterprise,
        password: state?.password,
        trackingTicket: togglebtnname == 'trackingTicket' ? value : state?.trackingTicket,
        assignmentToTicket: togglebtnname == 'assignmentToTicket' ? value : state?.assignmentToTicket,
        newTicket: togglebtnname == 'newTicket' ? value : state?.newTicket,
        allowedBuildings: [],
      };

      const bodyuser = {
        employeeId: user.id,
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        enterprise: state.enterprise,
        password: state?.password,
        trackingTicket: togglebtnname == 'trackingTicket' ? value : state?.trackingTicket,
        assignmentToTicket: togglebtnname == 'assignmentToTicket' ? value : state?.assignmentToTicket,
        allowedBuildings: state?.allowedBuildings,
      };

      if (user?.roleSerial == '1') {
        response = await Api('put', '/Users/update_admin', bodyadmin);
        const formData = new FormData();
        formData.append('EmployeeId', user.id);
        formData.append('ProfileImage', attachment);
        if (attachment) {
          await Api('post', '/Users/updateprofile_pic', formData);
        }
      }
      if (user?.roleSerial == '2') {
        response = await Api('put', '/Users/update_user_profile', bodyuser);
        const formData = new FormData();
        formData.append('EmployeeId', user.id);
        formData.append('ProfileImage', attachment);
        if (attachment) {
          await Api('post', '/Users/updateprofile_pic', formData);
        }
      }

      if (response?.data?.success) {
        if (!togglebtnname) {
          toast.success(t('Profile updated successfully.'));
          const _profile = await getProfile();
          let obj = {
            ..._profile,
            id: _profile?.userId,
            roleSerial: user?.roleSerial,
          };
          setUser(obj);
        }
        setState((pre) => {
          return {
            ...pre,
            password: '',
          };
        });
        _load();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };
  console.log(state, 'state');
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="row uxl_children_container"
          style={{
            justifyContent: 'flex-start',
            backgroundColor: '#F4F4F4',
            overflow: 'hidden',
            width: store?.isSideBar ? '97%' : '100%',
            paddingLeft: store?.isSideBar && width < 667 ? '1%' : '',
          }}
        >
          <div
            style={{
              width: width < 992 || userInfo?.roleSerial == 2 ? '100%' : '82%',
            }}
            className="footer_image_container"
          >
            <img className="footer_image" src={FooterSVG} />
            <div style={{ width: '100%', height: '100%', marginTop: '3%' }}>
              <div
                style={{
                  width: width < 575 || userInfo?.roleSerial == 2 ? '95%' : '90%',
                  height: '90%',
                  overflow: 'unset',
                }}
                className="user_profile_info"
              >
                <div className="form_container form_container_account">
                  <div className="input_image_container">
                    <label>
                      <input
                        disabled={!edit}
                        type="file"
                        accept="image/*"
                        hidden
                        id="filePickersettings"
                        name="file"
                        onChange={handleFileSelect}
                      />
                      {edit ? (
                        <img
                          style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: '119px',
                            right: '0%',
                            border: '2px solid #f4f4f4',
                            borderRadius: '50%',
                            background: '#f4f4f4',
                            width: '29px',
                            padding: '6px',
                          }}
                          src={EditProfileIcon}
                        />
                      ) : (
                        <></>
                      )}
                    </label>

                    <img
                      style={{ marginTop: '10%' }}
                      className="input_image"
                      src={
                        attachment
                          ? URL.createObjectURL(attachment)
                          : state?.profilePicture
                          ? state.profilePicture
                          : ProfileInputSVG
                      }
                    />
                  </div>

                  <div className="input_container">
                    <div
                      className="input_row"
                      style={{
                        width: '100%',
                        flexDirection: width < 575 ? 'column' : 'row',
                      }}
                    >
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">Prénom</label>
                        <input
                          disabled={!edit}
                          className="account_edit_inputs"
                          maxLength="25"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          placeholder="prénom"
                          value={state.first_name}
                          onChange={(e) => _setState('first_name', e.target.value)}
                        />
                      </div>
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">Nom de famille</label>
                        <input
                          disabled={!edit}
                          maxLength="25"
                          className="account_edit_inputs"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          placeholder="nom de famille"
                          value={state.last_name}
                          onChange={(e) => _setState('last_name', e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className="input_row"
                      style={{
                        width: '100%',
                        flexDirection: width < 575 ? 'column' : 'row',
                      }}
                    >
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">E-mail</label>
                        <input
                          disabled={!edit}
                          className="account_edit_inputs"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          placeholder="email"
                          value={state.email}
                          onChange={(e) => _setState('email', e.target.value)}
                        />
                      </div>
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">Numéro de portable</label>
                        <input
                          disabled={!edit}
                          className="account_edit_inputs"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          type="number"
                          placeholder="numéro de portable"
                          maxLength={13}
                          value={state.phone}
                          onChange={(e) => _setState('phone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className="input_row"
                      style={{
                        width: '100%',
                        flexDirection: width < 575 ? 'column' : 'row',
                      }}
                    >
                      {/* <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">Entreprise</label>
                        <input
                          disabled={!edit}
                          maxLength="25"
                          className="account_edit_inputs"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          placeholder="entreprise"
                          value={state.enterprise}
                          onChange={(e) => _setState('enterprise', e.target.value)}
                        />
                      </div> */}
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">{t('Password')}</label>
                        <input
                          disabled={!edit}
                          className="account_edit_inputs"
                          style={{
                            border: edit ? '2px solid #8C8C8C' : '',
                            padding: edit ? '2.5% 8%' : '2.5% 0%',
                            fontWeight: '600',
                          }}
                          value={state?.password}
                          placeholder={state?.passwordChangedStatus ? state?.passwordChangedStatus : ''}
                          onChange={(e) => _setState('password', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: edit ? '#2F696D' : '',
                      color: edit ? '#ffffff' : '',
                      width: width < 575 ? '30%' : width < 992 ? '25%' : edit ? '18%' : '11%',
                    }}
                    className="row edit_icon_text_container"
                    onClick={handleEdit}
                  >
                    <div className="edit_icon_container d-flex aic jcc">
                      <img src={edit ? EditIconSelectedSVG : EditSVG} />
                    </div>
                    <p style={{ fontSize: '12px' }}>{edit ? 'Sauvegarder' : 'Éditer'}</p>
                  </div>
                </div>
                <div style={{ marginTop: '0%' }} className="horizental_seperator horizental_seperator_account"></div>
                <div className="configuration_conatiner">
                  <div className="accunt_configuration_container">
                    <span>Configuration</span>
                    <p>
                      Attention, la modification d'un des champs ci-dessous peut provoquer la désassignaiton automatique de
                      l'utilisateur sur des tickets
                    </p>
                  </div>
                  <div
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className="tickets_container"
                  >
                    <div className="tickets-status_container">
                      <p> Rôle</p>
                      <p className="responsable-span" style={{}}>
                        {userInfo?.roleSerial == 1 ? 'Admin' : 'User'}
                      </p>
                      <p>Alertes par mail</p>
                      {userInfo?.roleSerial == 1 ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img
                                  style={{
                                    filter: state?.newTicket ? hexToCSSFilter('#2F696D').filter.replace(';', '') : '',
                                  }}
                                  className="tickets_icon_btn"
                                  src={TicketIcon}
                                />
                                <span
                                  style={{
                                    color: state?.newTicket ? '#2F696D' : '',
                                  }}
                                  className="tickets_icon_btn_span"
                                >
                                  Nouveau ticket
                                </span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.newTicket}
                                      onChange={(e) => {
                                        _setState('newTicket', e.target.checked);
                                        handleSubmit(e, 'newTicket', e.target.checked);
                                      }}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img
                                  style={{
                                    filter: state?.trackingTicket ? hexToCSSFilter('#2F696D').filter.replace(';', '') : '',
                                  }}
                                  className="tickets_icon_btn"
                                  src={TicketTracking}
                                />
                                <span
                                  style={{
                                    color: state?.trackingTicket ? '#2F696D' : '',
                                  }}
                                  className="tickets_icon_btn_span"
                                >
                                  Suivi de ticket
                                </span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.trackingTicket}
                                      onChange={(e) => {
                                        _setState('trackingTicket', e.target.checked);
                                        handleSubmit(e, 'trackingTicket', e.target.checked);
                                      }}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img
                                  style={{
                                    filter: state?.assignmentToTicket ? hexToCSSFilter('#2F696D').filter.replace(';', '') : '',
                                  }}
                                  className="tickets_icon_btn"
                                  src={AsignTicket}
                                />
                                <span
                                  style={{
                                    color: state?.assignmentToTicket ? '#2F696D' : '',
                                  }}
                                  className="tickets_icon_btn_span"
                                >
                                  Assignation à un ticket
                                </span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.assignmentToTicket}
                                      onChange={async (e) => {
                                        _setState('assignmentToTicket', e.target.checked);
                                        handleSubmit(e, 'assignmentToTicket', e.target.checked);
                                      }}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </>
                        </div>
                      ) : (
                        <></>
                      )}
                      {userInfo?.roleSerial == 2 ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img
                                  style={{
                                    filter: state?.trackingTicket ? hexToCSSFilter('#2F696D').filter.replace(';', '') : '',
                                  }}
                                  className="tickets_icon_btn"
                                  src={TicketTracking}
                                />
                                <span
                                  style={{
                                    color: state?.trackingTicket ? '#2F696D' : '',
                                  }}
                                  className="tickets_icon_btn_span"
                                >
                                  Suivi de ticket
                                </span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.trackingTicket}
                                      onChange={(e) => {
                                        _setState('trackingTicket', e.target.checked);
                                        handleSubmit(e, 'trackingTicket', e.target.checked);
                                      }}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img
                                  style={{
                                    filter: state?.assignmentToTicket ? hexToCSSFilter('#2F696D').filter.replace(';', '') : '',
                                  }}
                                  className="tickets_icon_btn"
                                  src={AsignTicket}
                                />
                                <span
                                  style={{
                                    color: state?.assignmentToTicket ? '#2F696D' : '',
                                  }}
                                  className="tickets_icon_btn_span"
                                >
                                  Assignation à un ticket
                                </span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.assignmentToTicket}
                                      onChange={(e) => {
                                        _setState('assignmentToTicket', e.target.checked);
                                        handleSubmit(e, 'assignmentToTicket', e.target.checked);
                                      }}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
