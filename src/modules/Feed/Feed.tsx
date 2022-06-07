import {Footer} from "../footer/footer";
import React, {useEffect, useState} from "react";
import  './Feed.css';
import {PROFILEAPILINKS} from "../profile/ProfileApiLinks";
import {shallowEqual, useSelector} from "react-redux";
import {IPosts} from "../profile/Profile";
import {Modal} from "../profile/Modal/Modal";
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
function Feed() {
    const getInitialPosts = (): IPosts[] => [
        {
            content: undefined,
            path: undefined,
            id: undefined,
            userId: undefined,
        },
    ];

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
            <div>
                <img
                    src={postUrl}
                    alt="post"
                    className="feedSource"
                    // onClick={
                    // () => {
                    //     handleClickCheckbox(postUrl, title);
                    // }}
                />
            </div>
        );
    };
    useEffect(() => {
        fetchFeed();
    }, []);
    return(
        <div className="feed-body">
            <div> {Footer()}</div>
        <div className='newsFeed'>
            <div  className='card'>
                {isLoading && requestPosts?.length ? (
                    <button className="postValue">
                        {requestPosts?.map(renderPostItem)}

                    </button>) :null}

            </div>
        </div>
        </div>
    )
}
export {Feed}