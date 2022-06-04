import { Link } from "react-router-dom";
import google from "../images/google.svg";
import girls from "../images/девчули1.svg";
import "../reset.css";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import React from "react";
import {REGISTRATIONLINKS} from "../modules/registration/RegistrationApiLinks";
import {userActionTypes} from "../modules/userRedux/actionTypes";
import {history} from "../modules/history";
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
const Welcome = () => {
  const { user } = useSelector(selector, shallowEqual);
  const dispatch = useDispatch();

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
          history.push(path);
          window.location.reload();
        };

        redirectTo(`/page/${requestLogin}`);

      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    }
  };
  return (
    <div>
      <div className="body">
        <img src={girls} alt="одногруппники" className="woman" />
        <div className="register">
          <div className="title">Одногруппники</div>
          <div className="buttonMenu">
            <div className="buttonEnter">
              <button
                className="entrance"
                style={{ fontFamily: "Content,cursive" }}
              >
                Вход
              </button>
              <div className="borderEnter" />
            </div>

            <div className="buttonRegister">
              <button className="registrationTitle">
                <Link
                  to={"/registration"}
                  style={{ fontFamily: "Content,cursive" }}
                >
                  {" "}
                  Регистрация{" "}
                </Link>
              </button>
              <div className="borderRegister" />
            </div>
          </div>

          <div className="helper">
            <form
                action="/page"
                onSubmit={submit}
                method="post"
                id="RegistrationForm"
            >
            <div className="userNameBox">
              <div className="nameTitle">Имя пользователя</div>
              <label htmlFor="userName">
                <input
                  className="enterPasswordInput"
                  type="login"
                  name="login"
                  id="userName"
                  placeholder="@nickname"
                />
              </label>
            </div>
            <div className="userPasswordBox">
              <div className="passwordTitle">Пароль</div>
              <input
                className="enterPasswordInput"
                type="password"
                name="password"
                id="userPassword"
                placeholder="6+ символов "
              />
            </div>
            <button className="vxodButton">Войти</button>
            {/*<p className="orTitle">Или</p>*/}
            {/*<div className="googleButton">*/}
            {/*  <img src={google} alt="google" />*/}
            {/*  <div className="googleText">Войти с помощью Google</div>*/}
            {/*</div>*/}
            {/*<div className="ForgotPassword">Забыли пароль?</div>*/}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
export { Welcome };
