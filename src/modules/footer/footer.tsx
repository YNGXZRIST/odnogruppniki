import React, {useCallback, useEffect, useState} from "react";

import './footerStyle.css';
import '../../reset.css';
import loop from '../../images/loope.svg';
import airplane from '../../images/airplane.svg';
import home from '../../images/home.svg';
import userFooter from '../../images/userFooter.svg';
import hearth from '../../images/hearth.svg';
import {log} from "util";
import {findUser} from "../profile/findUser";
import {Modal} from "../profile/Modal/Modal";
import {FindModal} from "./FindModal/FindModal";
import {IPosts} from "../profile/Profile";
import {useNavigate} from "react-router-dom";


export const Footer = () => {
    const navigate = useNavigate();

    const [isNavigate, setIsNavigate] = React.useState(false)
    const [requestUser, setRequestUser] = useState<string>("");
    const [isFindLoading, setIsFindLoading] = useState(false)
    const [isFindModal, setFindModal] = React.useState(false)
    const onFindClose = () => setFindModal(false)
    const OnNavigateRedirect=()=> {
        setIsNavigate(true)
        onFindClose();
    }


    const initFindUser = async (username: string) => {
        setFindModal(true)
        let user: string = await findUser(username);
        setRequestUser(user);
        return user;
    }
    let redirectTo = (path: string): void => {
        // history.push(path);
        navigate(path);
        //   window.location.reload();
    };
    if (isNavigate){
        redirectTo('/page/'+requestUser);
        setIsNavigate(false);
    }
    console.log(isNavigate)
    const findSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = document.getElementById(
            "findForm"
        ) as HTMLFormElement;
        let newFormData = new FormData(formData);

        let username = newFormData.get("username");


        if (

            typeof username === "string"
        )
        {
            await initFindUser(username);
        }

            };


    return (
        <div className='footer-style'>
            <div className='footerLogo'>Одногруппники</div>
            <form  action="/page"
                   onSubmit={findSubmit}
                   method="post"
                   id="findForm" className='find'>
                <img src={loop} alt='loop' className='footerLoop'/>
                <input className='inputFooter' type='text' placeholder="Поиск..."
                       name="username"
                       // onChange={(event => initFindUser(event.target.value))}
                /></form>

            <button className='messageButton'><img src={home} alt='home' className='homeFooterImage'/></button>
            {/*<button className='likeButton'><img src={hearth} alt='like' className='likeFooterImage'/></button>*/}
            <button className='profileButton'><img src={userFooter} alt='profile' className='profileFooterImage'/>
            </button>
            <FindModal
                visible={isFindModal}
                isNavigate={isNavigate}
                footer={<button onClick={onFindClose}>Закрыть</button>}
                onClose={onFindClose}
                OnNavigate={OnNavigateRedirect}
                title={requestUser}/>
        </div>);
}