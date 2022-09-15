import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

import Avatar from '@mui/material/Avatar';

import { makeStyles } from '@material-ui/core/styles';

import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import Loader from '../../components/Loader';
import CustomAlert from '../../components/modals/CustomAlert';

import ProfileInputSVG from '../../assets/ProfileInput.svg';
import SBSettingsBuildingIconUnSelected from '../../assets/SBSettingsBuildingIconUnSelected.svg';

import { useTranslation } from 'react-i18next';
import EditProfileIcon from '../../assets/Edit.svg';

import useWindowSize from '../../utils/WindowSize';

import { hexToCSSFilter } from 'hex-to-css-filter';
import { hexToRGBA } from '../../utils/Helpers';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
let colorForSelectedChip = '';
const AddUser = ({ existingUser, cb, handleClose, userTileCB }) => {
  const [personName, setPersonName] = React.useState([]);
  const [selectFocus, setSelectFocus] = useState({
    buildings: false,
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const [width] = useWindowSize();
  const useStyles = makeStyles((theme) => ({
    inputRoot: {
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '10px',
        border: 'none',
      },
    },
  }));
  const classes = useStyles();
  const user = getUser();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    enterprise: '',
    building: '',
  });

  const [attachment, setAttachment] = useState(null);
  const [selectedOptionMultiSelect, setSelectedOptionMultiSelect] = useState([]);
  const [isAlert, setIsAlert] = useState(false);

  const store = Store();
  const updateStore = UpdateStore();

  useEffect(() => {
    if (existingUser) {
      let existingdataarr = [];
      existingUser?.allowedBuildings?.map((_) => existingdataarr.push(_?.name));
      setPersonName(existingdataarr);
      setSelectedOptionMultiSelect(existingUser?.allowedBuildings);
      setState({
        first_name: existingUser.firstName,
        last_name: existingUser.lastName,
        email: existingUser.email,
        phone: existingUser.phoneNo,
        enterprise: existingUser.enterprise ?? '',
        building: existingUser.allowedBuildings[0]?.buildingId,
      });
    }
  }, []);
  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };
  const _setBlurFocus = (key, value) => {
    setSelectFocus((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file.type.includes('image')) {
      toast.error('Only image can be selected');
      return;
    }
    setAttachment(file);
  };

  useEffect(() => {
    _load();
  }, []);

  const _load = async () => {
    const _buildings = await getBuildings();
    if (!existingUser) {
      if (_buildings?.length > 0) {
        _setState('building', _buildings[0].value);
      }
    }

    updateStore({
      addUser: {
        ...store.addUser,
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let listwithmatchingdata = store.addUser.buildings.filter(function (word) {
      return personName.includes(word?.text);
    });
    let allowedbuildings = listwithmatchingdata.map((_) => {
      return { buildingId: _?.value };
    });
    setState((pre) => {
      return {
        ...pre,
        building: allowedbuildings,
      };
    });
    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.addUser(state);

    if (!isValidated) {
      return;
    }

    // if (!attachment && !existingUser) {
    //   toast.error('La pièce jointe doit être sélectionnée.');
    //   return;
    // }

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
        enterprise: state.enterprise,
        allowedBuildings: allowedbuildings,
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
        let userID;
        if (existingUser) {
          userID = existingUser.userId;
          userTileCB(existingUser.userId, true);
        } else {
          userID = response.data.id;
        }

        const formData = new FormData();

        formData.append('EmployeeId', userID);
        formData.append('ProfileImage', attachment);
        if (attachment) {
          await Api('post', '/Users/updateprofile_pic', formData);
        }
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
          handleClose();
        }, 3000);

        if (existingUser) {
          setIsAlert(true);
          setTimeout(() => {
            setIsAlert(false);
            handleClose();
          }, 3000);
          //toast.success(response?.data?.message);
        }
        cb();
      }
    } catch (e) {
      console.trace(e);
      //toast.error(e?.data?.errorMessage[0]);
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
                  marginTop: '13%',
                  border: '0px solid',
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
                  <span
                    style={{
                      color: '#2F696D',
                      fontWeight: '600',
                      padding: '3% 0%',
                      lineHeight: '27px',
                      fontSize: '19px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {' '}
                    Ajouter un nouvel utilisateur
                  </span>
                  <span style={{ color: '#8C8C8C' }}>IL sera invité par mail.</span>
                </div>
                <div
                  className="horizental_seperator"
                  style={{
                    width: '50%',
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
                    inputValue={state?.first_name}
                    maxLength="35"
                    enableYoursStyle={{
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '21px',
                      color: '#8C8C8C',
                      marginBottom: '0px',
                      color: selectFocus?.first_name ? '#2f696d' : ' #8C8C8C',
                    }}
                    divStyle={{
                      width: width < 667 ? '100%' : '45%',
                    }}
                    inputStyle={{
                      border: ' 2px solid #8C8C8C',
                      borderRadius: '20px',
                      fontWeight: '600',
                    }}
                    labelStyle={{
                      marginBottom: '8px',
                    }}
                    onChange={(e) => _setState('first_name', e.target.value)}
                    onFocus={() => _setBlurFocus('first_name', true)}
                    onBlur={() => _setBlurFocus('first_name', false)}
                  />
                  <CustomInput
                    ptext="Nom de famille"
                    inputType="text"
                    inputName="Last Name"
                    inputPlaceholder="Last Name"
                    maxLength="35"
                    inputValue={state.last_name}
                    enableYoursStyle={{
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '21px',
                      color: '#8C8C8C',
                      marginBottom: '0px',
                      color: selectFocus?.last_name ? '#2f696d' : ' #8C8C8C',
                    }}
                    divStyle={{
                      width: width < 667 ? '100%' : '45%',
                    }}
                    inputStyle={{
                      border: ' 2px solid #8C8C8C',
                      borderRadius: '20px',
                      fontWeight: '600',
                    }}
                    labelStyle={{
                      marginBottom: '8px',
                    }}
                    onChange={(e) => _setState('last_name', e.target.value)}
                    onFocus={() => _setBlurFocus('last_name', true)}
                    onBlur={() => _setBlurFocus('last_name', false)}
                  />
                </div>
                <CustomInput
                  ptext="E-mail"
                  disabled={existingUser ? true : false}
                  inputValue={state.email}
                  inputStyle={{
                    border: ' 2px solid #8C8C8C',
                    borderRadius: '20px',
                    fontWeight: '600',
                  }}
                  enableYoursStyle={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#8C8C8C',
                    marginBottom: '0px',
                    color: selectFocus?.email ? '#2f696d' : ' #8C8C8C',
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
                  onFocus={() => _setBlurFocus('email', true)}
                  onBlur={() => _setBlurFocus('email', false)}
                />
                <CustomInput
                  ptext="Numéro de portable"
                  inputType="text"
                  inputName="Phone"
                  inputPlaceholder="Phone"
                  inputValue={state.phone}
                  maxLength={13}
                  divStyle={{
                    marginBottom: '3%',
                  }}
                  enableYoursStyle={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#8C8C8C',
                    marginBottom: '0px',
                    color: selectFocus?.phone ? '#2f696d' : ' #8C8C8C',
                  }}
                  inputStyle={{
                    border: ' 2px solid #8C8C8C',
                    borderRadius: '20px',
                    fontWeight: '600',
                  }}
                  labelStyle={{
                    marginBottom: '8px',
                  }}
                  onChange={(e) => _setState('phone', e.target.value.replace(/[^0-9]/g, ''))}
                  onFocus={() => _setBlurFocus('phone', true)}
                  onBlur={() => _setBlurFocus('phone', false)}
                />
                <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                  }}
                />
                {/* <div
                  className="Modal_form_screen_row2_row1"
                  style={{
                    marginBottom: '3%',
                  }}
                >
                  <div style={{ width: '100%' }} className="select_input_container">
                    <label>Entreprise</label>
                    <CustomInput
                      inputValue={state.enterprise}
                      inputStyle={{
                        border: ' 2px solid #8C8C8C',
                        borderRadius: '20px',
                        width: '100%',
                        fontWeight: '600',
                      }}
                      enableYoursStyle={{
                        display: 'none',
                      }}
                      labelStyle={{
                        marginBottom: '8px',
                      }}
                      inputType="text"
                      inputName="Enterprise"
                      inputPlaceholder="Enterprise"
                      divStyle={{
                        marginBottom: '3%',
                      }}
                      onChange={(e) => _setState('enterprise', e.target.value)}
                    />
                  </div>
                </div> */}
                <div style={{ width: '100%', marginBottom: '4%' }} className="select_input_container">
                  <label style={{ color: selectFocus?.buildings ? '#2f696d' : '#8c8c8c' }}>Bâtiments accessibles</label>
                  {/* <select
                    className="all_user_select_input"
                    value={state.building}
                    onChange={(e) => _setState('building', e.target.value)}
                  >
                    {store.addUser.buildings.map((_) => (
                      <option value={_.value}>{_.text}</option>
                    ))}
                  </select> */}
                  <FormControl sx={{ mt: 2, width: 464 }}>
                    {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
                    <Select
                      sx={{
                        border: selectFocus.buildings ? '2px solid #2f696d' : '2px solid #8C8C8C',
                        borderRadius: '20px',
                      }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      onFocus={() =>
                        setSelectFocus((pre) => {
                          return {
                            ...pre,
                            buildings: true,
                          };
                        })
                      }
                      onBlur={() =>
                        setSelectFocus((pre) => {
                          return {
                            ...pre,
                            buildings: false,
                          };
                        })
                      }
                      input={<OutlinedInput className={classes.inputRoot} id="select-multiple-chip" label="Chip" />}
                      renderValue={(Selected) => (
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.2,
                            border: 'none',
                          }}
                        >
                          {Selected.map((_) => {
                            colorForSelectedChip =
                              selectedOptionMultiSelect.filter((val) => val?.text == _).map((value) => value?.color)[0] ||
                              selectedOptionMultiSelect.filter((__) => __?.name == _).map((colorcode) => colorcode.color)[0];
                            return (
                              <Chip
                                // key={value}
                                sx={{
                                  background: hexToRGBA(colorForSelectedChip),
                                  color: colorForSelectedChip,
                                }}
                                label={_}
                                avatar={
                                  <Avatar
                                    className={classes.chip}
                                    sx={{
                                      padding: '4% 4%',
                                      filter: hexToCSSFilter(colorForSelectedChip).filter.replace(';', ''),
                                    }}
                                    alt="batiments"
                                    src={SBSettingsBuildingIconUnSelected}
                                  />
                                }
                              />
                            );
                          })}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {store.addUser.buildings.map((name) => (
                        <MenuItem
                          onClick={() => {
                            setSelectedOptionMultiSelect([...selectedOptionMultiSelect, name]);
                          }}
                          className={classes.chip}
                          key={name?.value}
                          value={name?.text}
                          color={name?.color}
                          style={getStyles(name, personName, theme)}
                        >
                          <span id={name?.color}> {name?.text} </span>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                {t(existingUser ? 'Mettre à jour ☑️' : 'Sauvegarder ☑️')}
              </button>
            </div>
            {isAlert ? (
              <CustomAlert
                text={t(existingUser ? 'User Updated Successfully!' : 'User Added Successfully!')}
                onClose={() => {
                  setIsAlert(false);
                  handleClose();
                }}
              />
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};

export default AddUser;
