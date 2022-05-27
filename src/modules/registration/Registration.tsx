import girls from "../../images/девчули1.svg";
import {Link} from "react-router-dom";
import google from "../../images/google.svg";
import React from "react";
import { createStore } from 'redux';

interface IProps {
    // userData: respX[]

}
const Store=createStore();

const Registration:React.FC<IProps> = () => {
    const submit =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = document.getElementById('RegistrationForm' )as HTMLFormElement;
        let newFormData=new FormData(formData);
        let email=newFormData.get('email');
        let password=newFormData.get('password');
        let login=newFormData.get('login');
        if (typeof(email)==="string" &&typeof(password)==="string" && typeof(login)==="string" ){
            let response = await fetch('https://run.mocky.io/v3/d95c3641-6810-4733-bf1c-ed371212fb81', {
                method: 'POST',
                body: JSON.stringify({email,password,login})
            });

            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                               // получаем тело ответа (см. про этот метод ниже)
                let result = await response.json();
            console.log(response.status)
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }



        // if (isLoading) return
        // setIsLoading(true)
        // if (!(firstNameError || loginError || lastNameError || nicknameError || passwordError)) {
        //     RegistrationAPI.SingUP(lastName, firstName, login, password, nickname, gender)
        //         .then(response => {
        //             if (response.status == 200) {
        //                 setIsDone(true)
        //             } else {
        //                 setNicknameError(ErrorType.NICKNAME)
        //                 setNicknameErrorText([RegistrationAPI.getErrorText(ErrorType.NICKNAME, "")])
        //                 return response.json()
        //             }
        //         })
        // } else {
        //     alert("Ошибка")
        // }
        // setIsLoading(false)
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
export {Registration}