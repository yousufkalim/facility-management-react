import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Backdrop from '@mui/material/Backdrop';

import Loader from '../../components/Loader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomAlert from '../../components/modals/CustomAlert';

import LoginBackgroundSVG from '../../assets/LoginBackground.png';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api/index';
import { toast } from 'react-toastify';

import useWindowSize from '../../utils/WindowSize';

const CreatePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [renderAlert, setRenderAlert] = useState(false);
  const [state, setState] = useState({
    password: '',
    password_re: '',
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
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('id');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.forgotPassword2(state);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        userId: token,
        password: state.password,
        confirmPassword: state.password_re,
      };

      response = await Api('put', '/Users/update_user_profile/ChangePassword', body);
      if (response?.data?.success) {
        setRenderAlert(true);
        setTimeout(() => {
          setRenderAlert(false);
          navToLogin();
        }, 2000);
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
    <>
      {renderAlert ? (
        <>
          <CustomAlert text={t('Password Set Successfully!')} />
        </>
      ) : (
        <></>
      )}
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
            <p className="welcome_note_fm_login">
              {t('Welcome to Facility Management, please enter your login credentials to get started!')}
            </p>
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
                {t('Create your Password')}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#2F696D',
                  paddingBottom: '7%',
                }}
              >
                {t('Create your Password and login')}
              </p>
              <CustomInput
                enableEyes={true}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelText={t('Password')}
                inputType="password"
                inputPlaceholder="********"
                divStyle={{
                  marginBottom: '6%',
                }}
                labelStyle={{
                  lineHeight: '26px',
                }}
                onChange={(e) => _setState('password', e.target.value)}
              />
              <CustomInput
                enableEyes={true}
                enableYoursStyle={{
                  color: '#436062',
                  fontWeight: '400',
                  fontSize: '12px',
                }}
                labelText={t('Confirm Password')}
                inputType="password"
                inputPlaceholder="********"
                divStyle={{
                  marginBottom: '6%',
                }}
                labelStyle={{
                  lineHeight: '26px',
                }}
                onChange={(e) => _setState('password_re', e.target.value)}
              />
              <CustomButton
                text={t('Create Password')}
                type="submit"
                style={{
                  marginTop: '5%',
                  fontSize: '18px',
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
                {t('You do not have an account?')}
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
          <Loader
            divStyle={{
              marginTop: '45vh',
            }}
          />
        </Backdrop>
      </div>
    </>
  );
};

export default CreatePassword;
