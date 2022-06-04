import girls from "../../images/девчули-reg.svg";
import {Link, Navigate, useNavigate} from "react-router-dom";
import google from "../../images/google.svg";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { userActionTypes } from "../userRedux/actionTypes";
import {createBrowserHistory} from 'history';
import {history, ROUTES_PATH} from "../history";
import {REGISTRATIONLINKS} from "./RegistrationApiLinks";

interface IProps {
  // userData: respX[]
}

type IAppState = any;
let selector = (state: IAppState) => {
  return {
    user: {
      id: state.id,
      login: state.login,
    },
  };
};
export const Registration: React.FC<IProps> = () => {
  const { user } = useSelector(selector, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = document.getElementById(
      "RegistrationForm"
    ) as HTMLFormElement;
    let newFormData = new FormData(formData);

    let password = newFormData.get("password");
    let login = newFormData.get("login");

    if (

      typeof password === "string" &&
      typeof login === "string"
    ) {
      let response = await fetch(
        REGISTRATIONLINKS.REGISTRATION,
        {
          method: "POST",
          body: JSON.stringify({ password, login }),
        }
      );

      if (response.ok) {
        let result = await response.json();

        let id = result["id"];
        let requestLogin = result["login"];

        dispatch({
          type: userActionTypes.USER_REGISTRATION,
          payload: { id, login: requestLogin },
        });
       let redirectTo = (path: string): void => {
          // history.push(path);
         navigate(path);
          // window.location.reload();
        };

       // redirectTo(`/page/${requestLogin}`);

      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    }
  };


  return (
    <div>
      <div className="body">
        <img src={girls} alt="одногруппники" className="woman-reg" />
        <div className="register" style={{ height: "660px" }}>
          <div className="title">Одногруппники</div>
          <div className="buttonMenu">
            <div className="buttonEnter">
              <button
                className="entrance"
                style={{ fontFamily: "Content,cursive" }}
              >
                <Link to={"/"}> Вход</Link>
              </button>
              <div className="borderEnterRegistrationPage" />
            </div>

            <div className="buttonRegister">
              <button
                className="registrationTitle"
                style={{ fontFamily: "Content,cursive" }}
              >
                Регистрация
              </button>
              <div className="borderRegisterRegistrationPage" />
            </div>
          </div>
          <form
            action="/page"
            onSubmit={submit}
            method="post"
            id="RegistrationForm"
          >
            <div className="helper">
              <div className="userNameBox">
                <div className="nameTitle">Электронный адрес</div>
                <label htmlFor="userName">
                  <input
                    className="enterPasswordInput"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                  />
                </label>
              </div>
              <div className="userPasswordBox">
                <div className="passwordTitle">Имя пользователя</div>
                <input
                  className="enterPasswordInput"
                  type="enterNameInput"
                  name="login"
                  id="userName"
                  placeholder="@nickname"
                />
              </div>
              <div className="userPasswordBox">
                <div className="passwordTitle">Пароль</div>
                <input
                  className="enterPasswordInput"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="6+ символов"
                />
              </div>
              <button className="vxodButton">Зарегистрироваться</button>
              {/*<p className="orTitle">Или</p>*/}
              {/*<div className="googleButton">*/}
              {/*  <img src={google} alt="google" />*/}
              {/*  <div className="googleText">Войти с помощью Google</div>*/}
              {/*</div>*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
