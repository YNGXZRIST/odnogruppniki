import './profile.css'
import '../../reset.css'
import React, {ReactChild, useCallback, useEffect, useState} from "react";
import {Footer} from "../footer/footer";
import Shelbi from '../../images/shelbi.jpg';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {PROFILEAPILINKS} from "./ProfileApiLinks";
import {userActionTypes} from "../userRedux/actionTypes";
import NotSubscribe from '../../images/notSubscribe.svg'
import exp from "constants";
interface IProps {

}
interface IPosts  {
        title:string|undefined,
        source:string|undefined,

}
type IAppState = any;
let selector = (state: IAppState) => {
    return {
        user: {
            id: state.user.id,
            login: state.user.login,
        },
    };
};

function Profile(){
    const {login}=useParams();

    const dispatch = useDispatch();
    const {user} = useSelector(selector, shallowEqual);

    const [requestLogin, setRequestLogin] = useState<string>("");
    const [requestCountOfPosts, setRequestCountOfPosts] = useState<string>("");
    const [requestCountOfSubscribers, setRequestCountOfSubscribers] = useState<string>("");
    const [requestCountOfSubscribe, setRequestCountOfSubscribe] = useState<string>("");
    const [requestDescription, setRequestDescription] = useState<string>("");
    const [requestAvatar,setRequestAvatar]=useState<string>("");
    const [requestPosts,setRequestPosts]=useState<IPosts[] | null>(null);
    // const [requestName, setRequestName] = useState<string>("");

    const fetchUser = async () => {
        let response = await fetch(
            PROFILEAPILINKS.PROFILE,
            {
                method: "POST",
                body: JSON.stringify({login}),
            }
        );
        if (response.ok) {
            let result = await response.json();

            setRequestLogin(result['login']);
            setRequestCountOfPosts(result['countOfPosts']);
            setRequestDescription(result['description']);
            setRequestCountOfSubscribers(result['countOfSubscribers']);
            setRequestCountOfSubscribe(result['countOfSubscribe']);
            setRequestAvatar(result['avatar']);
            setRequestPosts(result['posts']);

        } else {
            alert("Ошибка HTTP: " + response.status);
        }

    }

    const renderPostItem = (postItem: IPosts) => {

        return(

            <img src={postItem.source} alt='post' className='postSource'/>

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



                    <img src={requestAvatar} className="avatar"/>
                    <div className='profileHelper'>
                        <div className='nicknameHelper'>
                            <div className='nickname'>{requestLogin}</div>
                            {login===user.login?

                                <button className='editProfile' >
                                <Link to={`/page/edit/`}> Редактировать профиль</Link>
                                        </button>:
                                <div style={{display:"flex"}}>
                                    <button className='sendMessageProfile' >
                                        <Link to={`/page/subscribe/${requestLogin}`}> Отправить сообщение</Link>
                                    </button>
                                    <div className='subscribeButton'>
                                        <img  className='notSubscribe' src={NotSubscribe} alt='notSubscribe'/>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className='countOfPublications'> {requestCountOfPosts}  публикаций</div>
                        <div className='countOfSubscribers'> {requestCountOfSubscribers}  подписчиков</div>
                        <div className='countOfSubscriber'> {requestCountOfSubscribe}  подписок</div>

                    </div>
                    <div className='descriptionProfile'>{requestDescription}</div>

                </div>

                <div className='border'/>
                <div className='postValue'>
                    {requestPosts?.map(renderPostItem)}
                </div>


            </div>

        </div>


    );

};
export {Profile}

