import "./profile.css";
import "../../reset.css";
import React, {
  ReactChild,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Footer } from "../footer/footer";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PROFILEAPILINKS } from "./ProfileApiLinks";
import { userActionTypes } from "../userRedux/actionTypes";
import NotSubscribe from "../../images/notSubscribe.svg";
import Svg, { Props as SVGProps } from "react-inlinesvg";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";
import { Modal } from "./Modal/Modal";
import { renderAvatar } from "./renderAvatar";
import { UploadModal } from "./UploadPosts/UploadModal";
import Follow from "../../images/follow.svg";
import { SubscribeModal } from "./SubscribeModal/SubscribeModal";

interface IProps {}

export interface IPosts {
  content: string | undefined;
  path: string | undefined;
  id: number | undefined;
  userId: number | undefined;
  username:string|undefined;


}

export interface ISubscribe {
  id: number | undefined;
  username: string | undefined;
}

type IAppState = any;
let selector = (state: IAppState) => {
  return {
    user: {
      id: state.user.id,
      username: state.user.username,
      token: state.user.token,
    },
  };
};

function Profile() {
  const getInitialPosts = (): IPosts[] => [
    {
      content: undefined,
      path: undefined,
      id: undefined,
      userId: undefined,
      username:undefined
    },
  ];
  const getInitialSubscribe = (): ISubscribe[] => [
    {
      id: undefined,
      username: undefined,
    },
  ];
  const { username } = useParams();
  const navigate = useNavigate();
  const countRef = useRef();
  const { user } = useSelector(selector, shallowEqual);
  const [currentImage, setCurrentImage] = useState<string | undefined>("");
  const [currentTitle, setCurrentTitle] = useState<string | undefined>("");
  const [requestUsername, setRequestUsername] = useState<string>("");
  const [requestCountOfPosts, setRequestCountOfPosts] = useState<string>("");
  const [requestCountOfSubscribers, setRequestCountOfSubscribers] =
    useState<string>("");
  const [requestCountOfSubscribe, setRequestCountOfSubscribe] =
    useState<string>("");
  const [requestUserId, setRequestUserId] = useState<string>("");
  const [requestSubscribe, setRequestSubscribe] = useState<ISubscribe[]>(
    getInitialSubscribe()
  );
  const [requestSubscription, setRequestSubscription] = useState<ISubscribe[]>(
    getInitialSubscribe()
  );

  const [requestPosts, setRequestPosts] = useState<IPosts[]>(getInitialPosts());
  const [isUploadModal, setUploadModal] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isModal, setModal] = React.useState(false);
  const [isSubscribeModal, setIsSubscribeModal] = React.useState(false);
  const [isFollow, setIsFollow] = React.useState(false);
  const onClose = () => setModal(false);
  const onCloseUpload = () => {
    setUploadModal(false);
    navigate("/page/" + username);
  };
  const onUpload = () => {
    setUploadModal(false);
  };

  const fetchUser = async () => {
    let response = await fetch(PROFILEAPILINKS.FIND, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      method: "POST",
      body: JSON.stringify({ username }),
    });
    if (response.ok) {
      let result = await response.json();
      setRequestUsername(result["username"]);
      setRequestCountOfSubscribers(result["subscribers"].length);
      setRequestCountOfSubscribe(result["subscriptions"].length);
      setRequestUserId(result["id"]);
      setRequestSubscribe(result["subscribers"]);
      setRequestSubscription(result["subscriptions"]);
      setRequestCountOfPosts(result["posts"].length);
      setRequestPosts(result["posts"]);
      // eslint-disable-next-line array-callback-return
      requestSubscribe.map((subscribe) => {
        if (subscribe.username === user.username) {
          setIsFollow(true);

        }

      });
      console.log(result["subscribers"]);
      setIsLoading(true);
    } else {
      let redirectTo = (path: string): void => {
        // history.push(path);
        navigate(path);
        //   window.location.reload();
      };

      redirectTo(`/`);
    }
  };
  // const fetchPosts = async () => {
  //   if (user.username === username) {
  //     let response = await fetch(PROFILEAPILINKS.LOAD_POSTS, {
  //       headers: {
  //         Authorization: "Bearer " + user.token,
  //       },
  //       method: "GET",
  //     });
  //     if (response.ok) {
  //       let result = await response.json();
  //       setRequestCountOfPosts(result["posts"].length);
  //       setRequestPosts(result["posts"]);
  //       // console.log(requestPosts);
  //       return;
  //     }
  //   } else {
  //     let response = await fetch(
  //       PROFILEAPILINKS.LOAD_OTHER_USER_POSTS + requestUserId,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + user.token,
  //         },
  //         method: "GET",
  //       }
  //     );
  //     if (response.ok) {
  //       let result = await response.json();
  //       console.log(result);
  //       setRequestCountOfPosts(result["posts"].length);
  //       setRequestPosts(result["posts"]);
  //
  //       setIsPostLoading(true);
  //       // alert("imhere");
  //       return;
  //     }
  //     // alert("imhere");
  //   }
  // };
  const handleClickCheckbox = (source: string, title: string) => {
    requestPosts?.map((post) => {
      let postUrl = "http://localhost" + post.path;

      if (postUrl === source) {

        setCurrentImage(postUrl);

        setCurrentTitle(title);
        console.log(title);
      }
      return post;
    });
  };
  const Add = () => {
    let redirectTo = (path: string): void => {
      // history.push(path);
      navigate(path);
      //   window.location.reload();
    };

    redirectTo(`addPost`);
  };

  const renderPostItem = (postItem: IPosts) => {
    let title = postItem.content;
    let postUrl = "http://localhost" + postItem.path;
    return (
      <div>
        <img
          src={postUrl}
          alt="post"
          className="postSource"
          onClick={() => {
            handleClickCheckbox(postUrl, title!);
          }}
        />
      </div>
    );
  };
  const follow = async () => {
    let response = await fetch(PROFILEAPILINKS.FOLLOW_LINK + requestUserId, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
      method: "POST",
    });
    if (response.ok) {
      let result = await response.json();
      console.log(result);
      // setRequestCountOfPosts(result["posts"].length);
      // setRequestPosts(result["posts"]);

      setIsPostLoading(true);
      // alert("imhere");
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);
  // useEffect(() => {
  //   fetchPosts();
  // }, [username]);
  // useEffect(() => {
  //   follow();
  // }, [username]);
  console.log(requestPosts);
  return (
    <div className="body">
      <div> {Footer()}</div>
      <div className="profileContent">
        <div className="profileInfo">
          {isLoading ? (
            <Svg src={renderAvatar(requestUsername)} className="avatar" />
          ) : null}
          <div className="profileHelper">
            <div className="nicknameHelper">
              <div className="nickname">{requestUsername}</div>
              {username === user.username && isLoading ? (
                <div>
                  <button
                    className="editProfile"
                    onClick={() => setUploadModal(true)}
                  >
                    Добавить пост
                  </button>
                  <UploadModal
                    visible={isUploadModal}
                    title={String(currentTitle)}
                    content={<img src={currentImage} />}
                    token={user.token}
                    footer={<button onClick={onCloseUpload}>Закрыть</button>}
                    onClose={onCloseUpload}
                    onUpload={onUpload}
                  />
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {isLoading && isFollow ? (
                    <div className="subscribeButton">
                      <img
                        className="notSubscribe"
                        src={NotSubscribe}
                        onClick={follow}
                        alt="notSubscribe"
                      />
                    </div>
                  ) : isLoading && !isFollow ? (
                    <div className="followButton">
                      <img
                        className="notSubscribe"
                        src={Follow}
                        onClick={follow}
                        alt="notSubscribe"
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="countOfPublications">
              {" "}
              {requestCountOfPosts} публикаций
            </div>

            <div className="countOfSubscriber">
              {" "}
              {requestCountOfSubscribe} подписок
            </div>
            <div
              className="countOfSubscribers"
              onClick={() => setIsSubscribeModal(true)}
            >
              <div> {requestSubscribe.length} подписчиков</div>
            </div>
            <SubscribeModal
              visible={isSubscribeModal}
              title={String(currentTitle)}
              content={<img src={currentImage} />}
              token={user.token}
              username={user.username}
              subscribers={requestSubscribe}
              onNavigate={navigate}
              footer={
                <button onClick={() => setIsSubscribeModal(false)}>
                  Закрыть
                </button>
              }
              onClose={() => setIsSubscribeModal(false)}
            />
          </div>
          {/*<div className='descriptionProfile'>{requestDescription}</div>*/}
        </div>

        <div className="border" />

        {isLoading && requestPosts?.length ? (
          <button className="postValue" onClick={() => setModal(true)}>
            {requestPosts?.map(renderPostItem)}
            <Modal
              visible={isModal}
              title={String(currentTitle)}
              content={<img src={currentImage} />}
              username={requestUsername}
              footer={<button onClick={onClose}>Закрыть</button>}
              onClose={onClose}
            />
          </button>
        ) : !isPostLoading ? (
          <div className="postEmpty">
            <div className="postEmpty">Постов нет</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Profile };
