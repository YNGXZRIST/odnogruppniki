import { Footer } from "../footer/footer";
import React, { useEffect, useState } from "react";
import "./Feed.css";
import { PROFILEAPILINKS } from "../profile/ProfileApiLinks";
import { shallowEqual, useSelector } from "react-redux";

import { Modal } from "../profile/Modal/Modal";
import {renderAvatar} from "../profile/renderAvatar";
import Svg from "react-inlinesvg";
import {useNavigate} from "react-router-dom";
type IAppState = any;
interface IPosts {
    content: string | undefined;
    path: string | undefined;
    id: number | undefined;
    userId: number | undefined;
    username:string| undefined


}
let selector = (state: IAppState) => {
  return {
    user: {
      id: state.user.id,
      username: state.user.username,
      token: state.user.token,
    },
  };
};
function Feed() {
  const getInitialPosts = (): IPosts[] => [
    {
      content: undefined,
      path: undefined,
      id: undefined,
      userId: undefined,
        username:undefined
    },
  ];
const navigate=useNavigate();
  const { user } = useSelector(selector, shallowEqual);
  const [isLoading, setIsLoading] = useState(false);
  const [requestPosts, setRequestPosts] = useState<IPosts[]>(getInitialPosts());
  const fetchFeed = async () => {
    let response = await fetch(PROFILEAPILINKS.FEED, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
      method: "GET",
    });
    if (response.ok) {
      let result = await response.json();

      setRequestPosts(result["posts"]);
      setIsLoading(true);
    } else {
      let redirectTo = (path: string): void => {
        // history.push(path);
        // navigate(path);
        //   window.location.reload();
      };

      // redirectTo(`/`);
    }
  };

  const renderPostItem = (postItem: IPosts) => {
    let title = postItem.content;
    let postUrl = "http://localhost" + postItem.path;
    return (
      <button  className='card' onClick={()=>navigate(('/page/'+postItem.username!))}>
          <div className='footer'>
              <Svg src={renderAvatar(postItem.username!)}
                   className='footer-avatar'/>
              <div className='footer-login'>
                  { postItem.username}
              </div>
          </div>

        <img
          src={postUrl}
          alt="post"
          className="feedSource"

        />
          <div className='post-content'>
              { postItem.content}
          </div>
      </button>
    );
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <div className="feed-body">
      <div> {Footer()}</div>
      <div className="newsFeed">
        {isLoading && requestPosts?.length ? (

            <div className="feedImage">
              {requestPosts?.map(renderPostItem)}
            </div>

        ) : null}
      </div>
    </div>
  );
}
export { Feed };
