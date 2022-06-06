import './profile.css'
import '../../reset.css'
import React, {ReactChild, useCallback, useEffect, useRef, useState} from "react";
import {Footer} from "../footer/footer";

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PROFILEAPILINKS} from "./ProfileApiLinks";
import {userActionTypes} from "../userRedux/actionTypes";
import NotSubscribe from '../../images/notSubscribe.svg'
import Svg, { Props as SVGProps } from 'react-inlinesvg';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-male-sprites';
import {Modal} from "./Modal/Modal";
import {renderAvatar} from "./renderAvatar";
import {UploadModal} from "./UploadPosts/UploadModal";

interface IProps {

}
 export  interface IPosts  {
        title:string|undefined,
        source:string|undefined,

}
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

function Profile(){
    const getInitialPosts = (): IPosts[] => [
        {
            title:undefined,
            source:undefined
        },


    ]
    const {username}=useParams();
const navigate =useNavigate();
    const countRef = useRef();
    const {user} = useSelector(selector, shallowEqual);
    const [currentImage, setCurrentImage] = useState<string | undefined>("");
    const [currentTitle, setCurrentTitle] = useState<string | undefined>("");
    const [requestUsername, setRequestUsername] = useState<string>("");
    const [requestCountOfPosts, setRequestCountOfPosts] = useState<string>("");
    const [requestCountOfSubscribers, setRequestCountOfSubscribers] = useState<string>("");
    const [requestCountOfSubscribe, setRequestCountOfSubscribe] = useState<string>("");
    const [requestDescription, setRequestDescription] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");

    const [requestPosts,setRequestPosts]=useState<IPosts[]>(getInitialPosts());
    const [isUploadModal, setUploadModal] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModal, setModal] = React.useState(false)
    const onClose = () => setModal(false)
    const onCloseUpload = () => setUploadModal(false)
    const onUpload=()=>{

        setUploadModal(false)
    }

    const fetchUser = async () => {
        let response = await fetch(
            PROFILEAPILINKS.PROFILE,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ user.token
                },
                method: "POST",
                body: JSON.stringify({username}),
            }
        );
        if (response.ok) {
            let result = await response.json();

            setRequestUsername(result['username']);
            // setRequestCountOfPosts(result['countOfPosts'].length);
            // setRequestDescription(result['description']);
            setRequestCountOfSubscribers(result['subscribers'].length);
            setRequestCountOfSubscribe(result['subscriptions'].length);
            // setRequestAvatar(result['avatar']);
            setRequestPosts(result['posts']);
setIsLoading(true);
        } else {

            let redirectTo = (path: string): void => {
                // history.push(path);
                navigate(path);
                //   window.location.reload();
            };

            redirectTo(`/`);
        }

    }
    console.log(requestUsername,requestCountOfSubscribe,requestCountOfSubscribers)
    const handleClickCheckbox = (source: string | undefined) => {
        requestPosts?.map(

                post => {
               if(post.source === source) {
                   setCurrentImage(source);
                   setCurrentTitle(post.title);
               }
                   return post;
            })



    }

    const renderPostItem = (postItem: IPosts) => {



        return( <div>

            <img src={postItem.source} alt='post' className='postSource'
                 onClick={() => {
                     handleClickCheckbox(postItem.source)
                 }}/>
        </div>



        )

    }


    useEffect(() => {
        fetchUser()
    }, [])

    return (

        <div className='body'>

            <div>  {Footer()}
            </div>
            <div className='profileContent'>
                <div className='profileInfo'>


                    {isLoading?   <Svg src={renderAvatar(requestUsername)} className="avatar"  />: null }
                    <div className='profileHelper'>
                        <div className='nicknameHelper'>
                            <div className='nickname'>{requestUsername}</div>
                            {username===user.username &&isLoading ?
<div>
                                <button className='editProfile'  onClick={() => setUploadModal(true)}>
                            Добавить пост
                                        </button>
    <UploadModal
        visible={isUploadModal}
        title={(String)(currentTitle)}
        content={<img src={currentImage}/>}
        token={user.token}
        footer={<button onClick={onCloseUpload}>Закрыть</button>}
        onClose={onCloseUpload}
        onUpload={onUpload}

    />
</div>:
                                <div style={{display:"flex"}}>

                                    <div className='subscribeButton'>
                                        {isLoading?  <img  className='notSubscribe' src={NotSubscribe} alt='notSubscribe'/>: null }

                                    </div>
                                </div>
                            }

                        </div>
                        <div className='countOfPublications'> {requestCountOfPosts}  публикаций</div>
                        <div className='countOfSubscribers'> {requestCountOfSubscribers}  подписчиков</div>
                        <div className='countOfSubscriber'> {requestCountOfSubscribe}  подписок</div>

                    </div>
                    {/*<div className='descriptionProfile'>{requestDescription}</div>*/}

                </div>

                <div className='border'/>

                {  isLoading && requestPosts?.length  ?
                    <button className='postValue' onClick={() => setModal(true)}>
                        {requestPosts?.map(renderPostItem)}
                        <Modal
                            visible={isModal}
                            title={(String)(currentTitle)}
                            content={<img src={currentImage}/>}
                            username={requestUsername}
                            footer={<button onClick={onClose}>Закрыть</button>}
                            onClose={onClose}

                        />
                    </button>
                    :
                    isLoading?
                        <div className='postEmpty'>
                            <div className='postEmpty'>Постов нет</div>
                        </div> : null


                }


            </div>

        </div>


    );

};
export {Profile}

