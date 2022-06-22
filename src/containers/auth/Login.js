import React, { useState } from "react";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import LoginBackgroundSVG from "../../assets/LoginBackground.png";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as FormValidations from "../../utils/Validations";
import Api from "../../api/index";
import { handleLogin } from "../../utils/Auth";
import { toast } from "react-toastify";

function LoginScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
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

      response = await Api("post", "/Login", body);
      if (response?.data?.success) {
        toast.success("Logged In");
        const token = response.data.token;
        const user = {
          id: response.data.userId,
        };
        handleLogin(token, user);
        navToDashboard();
      }

      console.log(state);
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const navToDashboard = () => {
    navigate("/dashboard");
  };

  const navToRegistration = () => {
    navigate("/registration");
  };

  return (
    <div
      className="container"
      style={{
        // background: "#F4F4F4",
        backgroundImage: "url(" + LoginBackgroundSVG + ")",
        backgroundSize: "cover",
      }}
    >
      <div className="login_screen_top">
        <div
          className="login_screen_row1"
          // style={{
          //   alignItems: "flex-start",
          //   justifyContent: "flex-start",
          //   marginLeft: "10%",
          //   marginTop: "10%",
          // }}
        >
          <p
            style={{
              fontSize: "34px",
              color: "#436062",
            }}
          >
            Facility
          </p>
          <p
            style={{
              fontSize: "24px",
              color: "%494949",
            }}
          >
            Management
          </p>
          <p
          className="welcome_note_fm_login"
            // style={{
            //   paddingTop: "2%",
            //   fontSize: "14px",
            //   color: "%999999",
            // }}
          >
            Welcome to Facility Management, Please put your login credentials to start!
          </p>
        </div>
        <div
          className="login_screen_row2"
          // style={{
          //   justifyContent: "flex-end",
          //   alignItems: "flex-end",
          // }}
        >
          <div
            className="login_screen_row2_container"
            style={{
              marginBottom: "10%",
            }}
          >
            <CustomInput
              labelText={t("Email")}
              inputType="email"
              inputPlaceholder="abc@xyz.com"
              divStyle={{
                marginBottom: "6%",
              }}
              onChange={(e) => _setState("email", e.target.value)}
            />
            <CustomInput
              labelText={t("Password")}
              inputType="password"
              inputName="Password"
              inputPlaceholder="********"
              enableEyes={true}
              divStyle={{
                marginBottom: "6%",
              }}
              onChange={(e) => _setState("password", e.target.value)}
            />
            <p
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#A0A0A0",
                marginBottom: "4%",
              }}
            >
              {t("Forgot Password?")}
            </p>
            <CustomButton
              text={t("Login")}
              type="submit"
              style={{
                marginBottom: "10%",
              }}
              onClick={handleSubmit}
            />
          </div>
          <div
            style={{
              marginBottom: "7%",
              marginRight: "20%",
              cursor: "pointer",
            }}
            onClick={navToRegistration}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#A0A0A0",
              }}
            >
              {t("Don't have an account?")}
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#FF8C39",
              }}
            >
              {t("Register now")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
