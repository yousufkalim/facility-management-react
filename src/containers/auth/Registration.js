import React, { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';

import Loader from '../../components/Loader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import LoginBackgroundSVG from '../../assets/LoginBackground.png';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api/index';
import { toast } from 'react-toastify';

import useWindowSize from '../../utils/WindowSize';

function useWindowSizeHeight() {
  const [size, setSize] = useState([window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
  }, []);
  return size;
}
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
  const [height] = useWindowSizeHeight();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.registration(state);

    if (!isValidated) {
      return;
    }

    // if (state.password != state.confirm_password) {
    //   toast.error('Password and Confirm Password pas le même');
    //   return;
    // }
    let response;

    try {
      setIsProcessing(true);

      const body = {
        companyName: '',
        firstName: state.first_name,
        lastName: state.last_name,
        phoneNo: state.phone,
        email: state.email,
        password: state.password,
      };

      response = await Api('post', '/register', body);
      if (response?.data?.success) {
        toast.success(t('Registered Successfully.'));
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
      style={{
        backgroundImage: 'url(' + LoginBackgroundSVG + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
      className="container"
    >
      <div className="reg_screen_top">
        <div style={{ zIndex: '9', marginTop: height < 730 ? '5%' : '10%' }} className="reg_screen_row1">
          <p
            style={{
              fontSize: width < 667 ? '27px' : '36px',
            }}
          >
            Facility
          </p>

          <span
            style={{
              fontSize: width < 667 ? '20px' : '27px',
              color: '%494949',
            }}
          >
            Management
          </span>
          <p className="welcome_note_fm">{t('Welcome to Facility Management, please fill out this form for a fresh start!')}</p>
        </div>
        <div className="reg_screen_row2" style={{ zIndex: '9', marginTop: height < 700 ? '1%' : height < 730 ? '5%' : '10%' }}>
          <div className="reg_screen_row2_container">
            {/* <CustomInput
              labelText={t('Company Name')}
              inputType="text"
              inputName="Name of Company"
              inputPlaceholder={t('Company Name')}
              divStyle={{
                marginBottom: '3%',
              }}
              enableYoursStyle={{
                color: '#436062',
                fontWeight: '400',
                fontSize: '12px',
              }}
              labelStyle={{
                lineHeight: '24px',
              }}
              maxLength="35"
              onChange={(e) => _setState('name_of_company', e.target.value)}
            /> */}
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '5%',
              }}
            >
              <CustomInput
                labelText={t('First name')}
                inputType="text"
                inputName="First Name"
                inputPlaceholder={t('First name')}
                divStyle={{
                  width: '49%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                maxLength="25"
                onChange={(e) => _setState('first_name', e.target.value)}
              />
              <CustomInput
                labelText={t('Last name')}
                inputType="text"
                inputName="Last Name"
                inputPlaceholder={t('Last name')}
                divStyle={{
                  width: '49%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                maxLength="25"
                onChange={(e) => _setState('last_name', e.target.value)}
              />
            </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '5%',
              }}
            >
              <CustomInput
                labelText={t('E-mail address')}
                inputType="email"
                inputName="Adresse e-mail"
                inputPlaceholder="E-mail address"
                divStyle={{
                  width: '49%',
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
                labelText={t('Phone number')}
                inputType="text"
                inputName="Phone Number"
                inputValue={state?.phone}
                inputPlaceholder={t('Phone number')}
                maxLength={13}
                divStyle={{
                  width: '49%',
                }}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelStyle={{
                  lineHeight: '24px',
                }}
                onChange={(e) => _setState('phone', e.target.value.replace(/[^0-9]/g, ''))}
                //onChange={(e) => _setState('phone', e.target.value.replace(^/d(\.\d)*$, ''))}
              />
            </div>
            <div
              className="registration_screen_row2_row1"
              style={{
                marginBottom: '3%',
              }}
            >
              <CustomInput
                labelText={t('Password')}
                inputType="password"
                inputName="Password"
                inputPlaceholder={t('Password')}
                enableEyes={true}
                divStyle={{
                  width: '49%',
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
                labelText={t('Confirm password')}
                inputType="password"
                inputName="Confirm Password"
                inputPlaceholder={t('Confirm password')}
                enableEyes={true}
                divStyle={{
                  width: '49%',
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

            <CustomButton style={{ marginTop: '4%' }} text={t(`S'inscrire`)} onClick={handleSubmit} />
          </div>
          <div
            style={{
              marginBottom: '2%',
              marginRight: '11%',
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
                padding: '5% 0%',
              }}
            >
              {t('Already have an account ?')}
            </p>
            <p
              style={{
                fontSize: width < 992 ? '22px' : '16px',
                color: '#FF8C39',
              }}
            >
              {t('Log in now')}
            </p>
          </div>
        </div>
      </div>
      <Backdrop open={isProcessing}>
        <Loader
          divStyle={{
            marginTop: '45vh',
          }}
        />
      </Backdrop>
    </div>
  );
}

export default RegistrationScreen;
