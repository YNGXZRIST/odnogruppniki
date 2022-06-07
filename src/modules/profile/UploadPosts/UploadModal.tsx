import React, {ReactElement} from 'react'
import ReactDOM from 'react-dom'
import './UploadModal.css'
import Svg from "react-inlinesvg";
import {renderAvatar} from "../renderAvatar";
import {REGISTRATIONLINKS} from "../../registration/RegistrationApiLinks";
import {userActionTypes} from "../../userRedux/actionTypes";
import {useNavigate} from "react-router-dom";
// import '../../../fonts/stylesheet.css'
// интерфейс для пропсов
import '../Modal/Modal.css'
interface ModalProps {
    visible: boolean
    title: string
    token: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
    onUpload: () => void
}

export const UploadModal = ({
                                visible = false,
                                title = '',
                                content = '',
                                footer = '',
                                token = '',
                                onClose,
                                onUpload
                            }: ModalProps) => {

    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }


    // c помощью useEffect цепляем обработчик к нажатию клавиш
    // https://ru.reactjs.org/docs/hooks-effect.html
    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    // если компонент невидим, то не отображаем его
    if (!visible) return null
    const fileInput = document.querySelector("#fileId");

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
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

            content !== null

        ) {
            let response = await fetch('http://localhost/api/profile/post/add_post', {

                headers: {

                    'Authorization': 'Bearer ' + token
                },

                method: 'POST',
                body: (newFormData)
            });

            let result = await response.json();
            onClose();


            return;


        }


        const formElem = async (e: any) => {
            e.preventDefault();
            const formData = document.getElementById(
                "formElem"
            ) as HTMLFormElement;
            let newFormData = new FormData(formData);
            let content = newFormData.get("content");
            let username = newFormData.get("image");
            let response = await fetch('http://localhost/api/profile/post/add_post', {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                method: 'POST',
                body: formData.get('content')
            });

            let result = await response.json();

            alert(result.message);
        };
    }





    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-upload-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                </div>
                    <span className='modal-close' onClick={onClose}>
            &times;
          </span>
                    <div className='formElement'>
                        <form id="formElem" onSubmit={submit}>

                           <input type="file" id='content' name="image" accept="image/*" />
                            <input type="text" name="content" placeholder='описание...'className='inputContent'/>
                            <input type="submit" id='subButton'/>
                        </form>
                    </div>

                </div>

            <p id="log"/>
        </div>

            )

            }