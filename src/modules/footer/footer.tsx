import React, {useCallback, useEffect, useState} from "react";

import './footerStyle.css';
import '../../reset.css';
import loop from '../../images/loope.svg';
import airplane from '../../images/airplane.svg';
import home from '../../images/home.svg';
import userFooter from '../../images/userFooter.svg';
import hearth from '../../images/hearth.svg';

export const Footer = () => {
    return (
        <div className='footer-style'>
            <div className='footerLogo'>Одногруппники</div>
            <div className='find'>
                <img src={loop} alt='loop' className='footerLoop'/>
                <input className='inputFooter' type='text' placeholder="Поиск..."/></div>
            <button className='messageButton'><img src={airplane} alt='message' className='messageFooterImage'/>
            </button>
            <button className='homeButton'><img src={home} alt='home' className='homeFooterImage'/></button>
            <button className='likeButton'><img src={hearth} alt='like' className='likeFooterImage'/></button>
            <button className='profileButton'><img src={userFooter} alt='profile' className='profileFooterImage'/></button>

        </div>);
}