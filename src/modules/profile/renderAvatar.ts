import {createAvatar} from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";
import Svg from "react-inlinesvg";
import React from "react";

export  const renderAvatar = (login: string) => {
    let svg=createAvatar(style, {
        seed: login

    });

    return(
        svg

);

}