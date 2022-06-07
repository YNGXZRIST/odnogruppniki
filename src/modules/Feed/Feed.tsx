import {Footer} from "../footer/footer";
import React from "react";
import  './Feed.css';
function Feed() {

    return(
        <div className="feed-body">
            <div> {Footer()}</div>
        <div className='newsFeed'>
            <div  className='card'></div>
        </div>
        </div>
    )
}
export {Feed}