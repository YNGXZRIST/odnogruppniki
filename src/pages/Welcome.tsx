import {Link, useNavigate} from "react-router-dom";
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
      username: state.username,
      token: state.token
    },
  };
};
const Welcome = () => {
  const { user } = useSelector(selector, shallowEqual);
  const dispatch = useDispatch();
const navigate=useNavigate()
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = document.getElementById(
        "RegistrationForm"
    ) as HTMLFormElement;
    let newFormData = new FormData(formData);

    let password = newFormData.get("password");
    let username = newFormData.get("username");
    console.log(password,username)
    if (

        typeof password === "string" &&
        typeof username === "string"
    ) {
      let response = await fetch(
          REGISTRATIONLINKS.AUTH,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",

            body: JSON.stringify({  username,password }),
          }
      );

      if (response.ok) {
        let result = await response.json();

        let id = result["id"];
        let requestUsername = result["username"];

        dispatch({
          type: userActionTypes.USER_AUTH,
          payload: { id, username: requestUsername ,token:result['accessToken']},
        });

        let redirectTo = (path: string): void => {

          navigate(path);

        };

        redirectTo(`/page/`+requestUsername);

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
                  type="username"
                  name="username"
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
