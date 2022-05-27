import girls from "../../images/девчули1.svg";
import {Link} from "react-router-dom";
import google from "../../images/google.svg";
import React, {useCallback} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

// import { createStore } from 'redux'

interface IProps {
    // userData: respX[]

}
type IAppState = any;
let selector = (state: IAppState) => {
    return {
        user: {
            id: state.id,
            login: state.login
        }
    }
}
export const Registration: React.FC<IProps> = () => {
    const {user} = useSelector(selector, shallowEqual);
    const dispatch = useDispatch();

    const insertUserSelector = useCallback(() => dispatch({type: 'user/insert'}), [])
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = document.getElementById('RegistrationForm') as HTMLFormElement;
        let newFormData = new FormData(formData);
        let email = newFormData.get('email');
        let password = newFormData.get('password');
        let login = newFormData.get('login');
        if (typeof (email) === "string" && typeof (password) === "string" && typeof (login) === "string") {
            let response = await fetch('https://run.mocky.io/v3/ef6ae84b-e077-4af2-a676-b43e70131ac0', {
                method: 'POST',
                body: JSON.stringify({email, password, login})
            });

            if (response.ok) {
                let result = await response.json();

                let id = result['id'];
                let logins = result['login'];

                return result;

            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }
    }


    return (

        <div>

            <div className="body">

                <img src={girls} alt="одногруппники" className="woman"/>
                <div className="register" style={{height: "660px"}}>
                    <div className="title">Одногруппники</div>
                    <div className="buttonMenu">
                        <div className="buttonEnter">
                            <button className="entrance" style={{fontFamily: 'Content,cursive'}}>
                                <Link to={"/"}> Вход</Link></button>
                            <div className="borderEnterRegistrationPage"/>
                        </div>

                        <div className="buttonRegister">
                            <button className="registrationTitle" style={{fontFamily: 'Content,cursive'}}>
                                Регистрация
                            </button>
                            <div className="borderRegisterRegistrationPage"/>
                        </div>
                    </div>
                    <form action="/page" onSubmit={submit} method="post" id="RegistrationForm">
                        <div className="helper">
                            <div className="userNameBox">
                                <div className="nameTitle">Электронный адрес</div>
                                <label htmlFor="userName">
                                    <input className="enterPasswordInput" type="text" name="email" id="email"
                                           placeholder="example@example.com"/>
                                </label>
                            </div>
                            <div className="userPasswordBox">
                                <div className="passwordTitle">Имя пользователя</div>
                                <input className="enterPasswordInput" type="enterNameInput" name="login"
                                       id="userName" placeholder="@nickname"/>
                            </div>
                            <div className="userPasswordBox">
                                <div className="passwordTitle">Пароль</div>
                                <input className="enterPasswordInput" type="password" name="password" id="password"
                                       placeholder="6+ символов"/>
                            </div>
                            <button className="vxodButton">Зарегистрироваться</button>
                            <p className="orTitle">Или</p>
                            <div className="googleButton">
                                <img src={google} alt="google"/>
                                <div className="googleText">Войти с помощью Google</div>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
