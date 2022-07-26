import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Backdrop from '@mui/material/Backdrop';

import Loader from '../../components/Loader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import LoginBackgroundSVG from '../../assets/LoginBackground.png';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api/index';
import { toast } from 'react-toastify';

import useWindowSize from '../../utils/WindowSize';

function ForgotPassword1Screen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    email: '',
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

    const isValidated = FormValidations.forgotPassword1(state);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        email: state.email,
        callBackURL: window.location.href.includes('localhost')
          ? 'http://localhost:3000/forgot_password_2'
          : 'https://facilitymanagement-demo.web.app/forgot_password_2',
      };

      response = await Api('post', '/forgetPassword', body);
      if (response?.data?.success) {
        toast.success('Email Sent.');
        navToLogin();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const navToRegistration = () => {
    navigate('/registration');
  };

  const navToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: 'url(' + LoginBackgroundSVG + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <div className="login_screen_top">
        <div className="login_screen_row1">
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
          <p className="welcome_note_fm_login">Welcome to Facility Management, Please put your login credentials to start!</p>
        </div>
        <div className="login_screen_row2">
          <div
            className="login_screen_row2_container"
            style={{
              marginBottom: '10%',
            }}
          >
            <p
              style={{
                fontWeight: '600',
                fontSize: '20px',
                color: '#2F696D',
                paddingBottom: '2%',
              }}
            >
              Forgot Password
            </p>
            <p
              style={{
                fontSize: '14px',
                color: '#2F696D',
                paddingBottom: '7%',
              }}
            >
              Enter your email and we sent your verification code
            </p>
            <CustomInput
              enableYoursStyle={{
                color: '#436062',
                fontWeight: '400',
                fontSize: '12px',
              }}
              labelText={t('Email Address')}
              inputType="email"
              inputPlaceholder="abc@xyz.com"
              divStyle={{
                marginBottom: '6%',
              }}
              labelStyle={{
                lineHeight: '26px',
              }}
              onChange={(e) => _setState('email', e.target.value)}
            />
            <CustomButton
              text={t('Send Code')}
              type="submit"
              style={{
                marginTop: '5%',
                fontSize: '20px',
                padding: '2% 6%',
                borderRadius: '18px',
              }}
              onClick={handleSubmit}
            />
          </div>
          <div
            style={{
              marginBottom: '7%',
              marginRight: '30%',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'end',
              lineHeight: '18px',
            }}
            onClick={navToRegistration}
          >
            <p
              style={{
                fontSize: '15px',
                color: '#FFFFFF',
              }}
            >
              {t("Don't have an account?")}
            </p>
            <p
              style={{
                fontSize: width < 992 ? '22px' : '16px',
                color: '#FF8C39',
              }}
            >
              {t('Register now')}
            </p>
          </div>
        </div>
      </div>
      <Backdrop open={isProcessing}>
        <Loader />
      </Backdrop>
    </div>
  );
}

export default ForgotPassword1Screen;
