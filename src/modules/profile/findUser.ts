import {PROFILEAPILINKS} from "./ProfileApiLinks";
import {shallowEqual, useSelector} from "react-redux";


export const findUser= async (username:string,token:string) => {

    let response = await fetch(
        PROFILEAPILINKS.FIND,

        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token
            },
            method: "POST",
            body: JSON.stringify({username}),
        }
    );
    if (response.ok) {
        let result = await response.json();

        return result['username'];

    }
    else {
    return 'error:404'
    }

}