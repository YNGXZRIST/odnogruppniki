import {Link} from  "react-router-dom";
import google from '../images/google.svg';
import girls from '../images/девчули1.svg';
import "../reset.css"

const Welcome =()=>{
    return(
        <div>

            <div className="body">

                <img src={girls} alt="одногруппники" className="woman" />
                <div className="register">
                    <div className="title">Одногруппники</div>
                    <div className="buttonMenu">
                        <div className="buttonEnter">
                            <button className="entrance" style={{fontFamily: 'Content,cursive'}}>Вход</button>
                            <div className="borderEnter" />
                        </div>

                        <div className="buttonRegister">
                            <button className="registrationTitle" >
                                <Link to={"/registration"} style={{fontFamily: 'Content,cursive'}}> Регистрация </Link>
                            </button>
                            <div className="borderRegister" />
                        </div>
                    </div>
                    <div className="helper">
                        <div className="userNameBox">
                            <div className="nameTitle">Имя пользователя</div>
                            <label htmlFor="userName">
                                <input className="enterPasswordInput" type="text" name="@nickname" id="userName" placeholder="@nickname" />
                            </label>
                        </div>
                        <div className="userPasswordBox">
                            <div className="passwordTitle">Пароль</div>
                            <input className="enterPasswordInput" type="password" name="password" id="userPassword"  placeholder="6+ символов "/>
                        </div>
                        <button className="vxodButton">Войти</button>
                        <p className="orTitle">Или</p>
                        <div className="googleButton">
                            <img src={google} alt="google" />
                            <div className="googleText">Войти с помощью Google</div>
                        </div>
                        <div className="ForgotPassword">Забыли пароль?</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {Welcome}