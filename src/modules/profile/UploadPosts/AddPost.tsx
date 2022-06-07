import React from "react";
import {shallowEqual, useSelector} from "react-redux";
import './Upload.css'
import {useNavigate} from "react-router-dom";
interface IProps {
    // userData: respX[]
}
type IAppState = any;
let selector = (state: IAppState) => {
    return {
        user: {
            id: state.user.id,
            username: state.user.username,
            token: state.user.token
        },
    };
};
export const AddPost: React.FC<IProps> = () => {
    const navigate=useNavigate();
    const { user } = useSelector(selector, shallowEqual);
    const formElem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = document.getElementById(
            "formElem"
        ) as HTMLFormElement;
      let newFormData = new FormData(formData);
        let content = newFormData.get("content");
       let image = newFormData.get("image");
        // event.preventDefault();
        // console.log(content,image);
        if (

        content !==null

        ){
            let response = await fetch('http://localhost/api/profile/post/add_post', {

                headers: {

                    'Authorization':'Bearer '+ user.token
                },

                method: 'POST',
                body:(newFormData)
            });

            let result = await response.json();


                let redirectTo = (path: string): void => {
                    // history.push(path);
                    navigate(path);
                    //   window.location.reload();
                };

                redirectTo(`/page/`+user.username);
                return;



        }



    };
return(
    <form id="formElem" onSubmit={formElem} >

            <input type="text" name="content" className='uploadButton'/>


        Картинка: <input type="file" name="image" accept="image/*"/>
        <input type="submit"/>
    </form>
)
}
