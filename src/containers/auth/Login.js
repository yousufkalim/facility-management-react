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
import { handleLogin } from '../../utils/Auth';
import { toast } from 'react-toastify';

import useWindowSize from '../../utils/WindowSize';

function LoginScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [width] = useWindowSize();
  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.login(state);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        email: state.email,
        password: state.password,
      };

      response = await Api('post', '/Login', body);
      if (response?.data?.success) {
        toast.success('Logged In');
        const token = response.data.token;
        const user = {
          id: response.data.userId,
        };
        await handleLogin(token, user);
        navToDashboard();
      }

      console.log(state);
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const navToRegistration = () => {
    navigate('/registration');
  };

  const navToForgotPassword = () => {
    navigate('/forgot_password_1');
  };

  const navToDashboard = () => {
    navigate('/dashboard');
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
            <CustomInput
              enableYoursStyle={{
                color: '#436062',
                fontWeight: '400',
                fontSize: '12px',
              }}
              labelStyle={{
                lineHeight: '26px',
              }}
              labelText={t('Password')}
              inputType="password"
              inputName="Password"
              inputPlaceholder="********"
              enableEyes={true}
              divStyle={{
                marginBottom: '6%',
              }}
              onChange={(e) => _setState('password', e.target.value)}
            />
            <div
              className="forget_password_text d-flex"
              style={{
                cursor: 'pointer',
              }}
              onClick={navToForgotPassword}
            >
              <small>{t('Forgot Password?')}</small>
            </div>
            <CustomButton
              text={t('Login')}
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

export default LoginScreen;
