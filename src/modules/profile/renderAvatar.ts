import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/croodles';


export  const renderAvatar = (username: string) => {
    let svg=createAvatar(style, {
        seed: username

    });

    return(
        svg

);

}