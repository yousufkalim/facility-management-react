import React, { useState } from 'react';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import LoginBackgroundSVG from '../../assets/LoginBackground.png';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api/index';
import { toast } from 'react-toastify';

import useWindowSize from '../../utils/WindowSize';

function RegistrationScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    name_of_company: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };
  const [width] = useWindowSize();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.registration(state);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        companyName: state.name_of_company,
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        password: state.password,
      };

      response = await Api('post', '/register', body);
      if (response?.data?.success) {
        toast.success('Registered Successfully.');
        navToLogin();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const navToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className="container"
      style={{
        // background: "#F4F4F4",
        backgroundImage: 'url(' + LoginBackgroundSVG + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <div className="reg_screen_top">
        <div className="reg_screen_row1">
          <p
            style={{
              fontSize: '34px',
              color: '#436062',
            }}
          >
            Facility
          </p>
          <span
            style={{
              fontSize: '24px',
              color: '%494949',
            }}
          >
            Management
          </span>
          <p className="welcome_note_fm">Welcome to Facility Management, Please fill out this form to fresh start!</p>
        </div>
        <div
          className="reg_screen_row2"
          // style={{
          //   justifyContent: "flex-end",
          //   alignItems: "flex-end",
          //   width: "70%",
          // }}
        >
          <div
            className="reg_screen_row2_container"
            // style={{
            //   marginBottom: "10%",
            //   width: "70%",
            // }}
          >
            <CustomInput
              labelText={t('Name of Company')}
              inputType="text"
              inputName="Name of Company"
              inputPlaceholder="Name of Company"
              divStyle={{
                marginBottom: '6%',
              }}
              enableYoursStyle={{
                color: '#436062',
                fontWeight: '400',
                fontSize: '12px',
              }}
              labelStyle={{
                lineHeight: '24px',
              }}
              onChange={(e) => _setState('name_of_company', e.target.value)}
            />
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '6%',
              }}
            >
              <CustomInput
                labelText={t('First Name')}
                inputType="text"
                inputName="First Name"
                inputPlaceholder="First Name"
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('first_name', e.target.value)}
              />
              <CustomInput
                labelText={t('Last Name')}
                inputType="text"
                inputName="Last Name"
                inputPlaceholder="Last Name"
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('last_name', e.target.value)}
              />
            </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '6%',
              }}
            >
              <CustomInput
                labelText={t('Email Address')}
                inputType="email"
                inputName="Email Address"
                inputPlaceholder="Email Address"
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('email', e.target.value)}
              />
              <CustomInput
                labelText={t('Phone Number')}
                inputType="number"
                inputName="Phone Number"
                inputPlaceholder="Phone Number"
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('phone', e.target.value)}
              />
            </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '6%',
              }}
            >
              <CustomInput
                labelText={t('Password')}
                inputType="password"
                inputName="Password"
                inputPlaceholder="Password"
                enableEyes={true}
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('password', e.target.value)}
              />
              <CustomInput
                labelText={t('Confirm Password')}
                inputType="password"
                inputName="Confirm Password"
                inputPlaceholder="Confirm Password"
                enableEyes={true}
                divStyle={{
                  width: '45%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('confirm_password', e.target.value)}
              />
            </div>
            <CustomButton text={t('Register')} onClick={handleSubmit} />
          </div>
          <div
            style={{
              marginBottom: '2%',
              marginRight: '20%',
              cursor: 'pointer',
              padding: width < 667 ? '3%' : '',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'end',
            }}
            onClick={navToLogin}
          >
            <p
              style={{
                fontSize: '15px',
                color: '#ffffff',
              }}
            >
              {t('Already have an Account ?')}
            </p>
            <p
              style={{
                fontSize: width < 992 ? '22px' : '16px',
                color: '#FF8C39',
              }}
            >
              {t('Log in Now')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationScreen;
