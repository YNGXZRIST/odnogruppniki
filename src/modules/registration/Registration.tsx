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
      username: state.username,
    },
  };
};
export const Registration: React.FC<IProps> = () => {
  const { user } = useSelector(selector, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<number | undefined>();
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = document.getElementById(
      "RegistrationForm"
    ) as HTMLFormElement;
    let newFormData = new FormData(formData);

    let password = newFormData.get("password");
    let username = newFormData.get("username");
    let email = newFormData.get("email");

    if (

      typeof password === "string" &&
      typeof username === "string"
    ) {
      let response = await fetch(
        REGISTRATIONLINKS.REGISTRATION,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({email, password, username ,role:['ROLE_ADMIN']}),
        }
      );
      if (response.ok) {
        let result = await response.json();

        let id = result["id"];
        let requestUsername = result["username"];

        dispatch({
          type: userActionTypes.USER_REGISTRATION,
          payload: { id, username: requestUsername },
        });
       let redirectTo = (path: string): void => {
          // history.push(path);
          navigate(path);
         //   window.location.reload();
        };

     redirectTo(`/`);

      } else {
        setError(response.status);
        alert(response.status)

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
                  name="username"
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
              {error? <div className='regError' >Неверно введены данные</div>:null}
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
