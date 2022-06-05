import {PROFILEAPILINKS} from "./ProfileApiLinks";


export const findUser= async (login:string) => {

    let response = await fetch(
        PROFILEAPILINKS.FIND,
        {
            method: "POST",
            body: JSON.stringify({login}),
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