import React, { useState, useEffect } from 'react';

import Loader from '../../../components/Loader';

import DummyUserSVG from '../../..//assets/DummyUser.jpeg';
import EditSVG from '../../../assets/Edit.svg';
import EditIconSelectedSVG from '../../../assets/EditIconSelected.svg';
import SearchSVG from '../../../assets/Search.svg';
import FooterSVG from '../../../assets/Cornerimage.svg';
import TicketIcon from '../../../assets/TicketIcon.svg';
import TicketTracking from '../../../assets/TicketTracking.svg';
import AsignTicket from '../../../assets/AsignTicket.svg';
import NewRoundTicket from '../../../assets/NewRoundTicket.svg';
import RoundTrackingTicket from '../../../assets/RoundTrackingTicket.svg';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import { Store, UpdateStore } from '../../../StoreContext';
import useWindowSize from '../../../utils/WindowSize';

import * as FormValidations from '../../../utils/Validations';
import Api from '../../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../../utils/Auth';

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
  const updateStore = UpdateStore();
  const user = getUser();
  const [width] = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);
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
      company_name: _profile.companyName,
      passwordChangedStatus: _profile?.passwordChangedStatus,
      trackingTicket: _profile?.trackingTicket,
      assignmentToTicket: _profile?.assignmentToTicket,
      newTicket: _profile?.newTicket,
    });
    setIsLoading(false);
  };
  const getProfile = async () => {
    let response;
    try {
      response = await Api('get', `/Users/userprofile/${user.id}`);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        companyName: state.company_name,
        password: state?.password,
        trackingTicket: state?.trackingTicket,
        assignmentToTicket: state?.assignmentToTicket,
        newTicket: state?.newTicket,
        allowedBuildings: [],
      };

      const bodyuser = {
        employeeId: user.id,
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        companyName: state.company_name,
        password: state?.password,
        trackingTicket: state?.trackingTicket,
        assignmentToTicket: state?.assignmentToTicket,
        allowedBuildings: [],
      };

      if (user?.roleSerial == '1') {
        response = await Api('put', '/Users/update_admin', bodyadmin);
      }
      if (user?.roleSerial == '2') {
        response = await Api('put', '/Users/update_user_profile', bodyuser);
      }

      if (response?.data?.success) {
        toast.success('Profile updated successfully.');
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
                }}
                className="user_profile_info"
              >
                <div className="form_container form_container_account">
                  <div className="input_image_container">
                    <img className="input_image_account" src={DummyUserSVG} />
                  </div>
                  <div style={{ marginTop: '3%' }} className="input_container">
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
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
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
                          value={state.company_name}
                          onChange={(e) => _setState('company_name', e.target.value)}
                        />
                      </div>
                      <div className={`label_input_container ${width > 575 ? 'w-48' : 'w-100'}`}>
                        <label className="label_inputs">Password</label>
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
                <div className="horizental_seperator horizental_seperator_account"></div>
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
                                <img className="tickets_icon_btn" src={TicketIcon} />
                                <span className="tickets_icon_btn_span">Nouveau ticket</span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.newTicket}
                                      onChange={(e) => _setState('newTicket', e.target.checked)}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img className="tickets_icon_btn" src={TicketTracking} />
                                <span className="tickets_icon_btn_span">TicketTracking</span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.trackingTicket}
                                      onChange={(e) => _setState('trackingTicket', e.target.checked)}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img className="tickets_icon_btn" src={AsignTicket} />
                                <span className="tickets_icon_btn_span">AssignmentTicket</span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.assignmentToTicket}
                                      onChange={(e) => _setState('assignmentToTicket', e.target.checked)}
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
                                <img className="tickets_icon_btn" src={TicketTracking} />
                                <span className="tickets_icon_btn_span">TicketTracking</span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.trackingTicket}
                                      onChange={(e) => _setState('trackingTicket', e.target.checked)}
                                      sx={{ m: 1 }}
                                    />
                                  }
                                />
                              </div>
                            </div>
                            <div className="tickets_icon_btn_container">
                              <div style={{ width: '50%' }}>
                                <img className="tickets_icon_btn" src={AsignTicket} />
                                <span className="tickets_icon_btn_span">AssignmentTicket</span>
                              </div>
                              <div>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={state?.assignmentToTicket}
                                      onChange={(e) => _setState('assignmentToTicket', e.target.checked)}
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
