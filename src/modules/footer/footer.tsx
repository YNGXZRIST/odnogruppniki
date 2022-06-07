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
import {shallowEqual, useSelector} from "react-redux";
import {PROFILEAPILINKS} from "../profile/ProfileApiLinks";
type IAppState = any;
let selector = (state: IAppState) => {
    return {
        user: {
            id: state.user.id,
            username: state.user.username,
            token: state.user.token
        },
    };
};
export const Footer = () => {
    const navigate = useNavigate();
    const {user} = useSelector(selector, shallowEqual);
    const [isNavigate, setIsNavigate] = React.useState(false)
    const [requestUser, setRequestUser] = useState<string>("");
    const [isFindLoading, setIsFindLoading] = useState(false)
    const [isFindModal, setFindModal] = React.useState(false)

    const onFindClose = () => {
        setFindModal(false)

    }
    const homeRedirect = () => {
   navigate('/')

    }
    const OnNavigateRedirect=()=> {
        setIsNavigate(true)
        onFindClose();
    }



    let redirectTo = (path: string): void => {
        // history.push(path);
        navigate(path);
        return;
    };
    if (isNavigate){
        redirectTo('/page/'+requestUser);
        setIsNavigate(false);
    }

    const findSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFindModal(true)
        const formData = document.getElementById(
            "findForm"
        ) as HTMLFormElement;
        let newFormData = new FormData(formData);

        let username = newFormData.get("username");


        if (

            typeof username === "string"
        )
        {
            if (username.length){
                let response = await fetch(
                    PROFILEAPILINKS.FIND,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+user.token
                        },
                        method: "POST",
                        body: JSON.stringify({username}),
                    }
                );
                if (response.ok) {
                    let result = await response.json();


                    setRequestUser(result['username']);
                    return user;
                }
                else {
                    return 'error:404'
                }
            }else {

                return 'error:404' }


        }

            };

   const redirectToCurrentUser=()=>{
       navigate('/page/'+user.username);
    }
    return (
        <div className='footer-style'>
            <button className='footerLogo' onClick={homeRedirect}>Одногруппники</button>
            <form  action="/page"
                   onSubmit={findSubmit}
                   method="post"
                   id="findForm" className='find'>
                <img src={loop} alt='loop' className='footerLoop'/>
                <input className='inputFooter' type='text' placeholder="Поиск..."
                       name="username"
                       // onChange={(event => initFindUser(event.target.value))}
                /></form>

            <button className='messageButton'><img src={home} alt='home' className='homeFooterImage' onClick={event =>redirectTo('/feed')}/></button>
            {/*<button className='likeButton'><img src={hearth} alt='like' className='likeFooterImage'/></button>*/}
            <button className='profileButton'><img src={userFooter} alt='profile' className='profileFooterImage' onClick={redirectToCurrentUser}/>
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