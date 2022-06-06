import React, {ReactElement} from 'react'
import ReactDOM from 'react-dom'
import '../Modal/Modal.css'
import Svg from "react-inlinesvg";
import {renderAvatar} from "../renderAvatar";
import {REGISTRATIONLINKS} from "../../registration/RegistrationApiLinks";
import {userActionTypes} from "../../userRedux/actionTypes";
// import '../../../fonts/stylesheet.css'
// интерфейс для пропсов

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

    const uploadFile = (file:any ) => {
        console.log("Uploading file...");
        const API_ENDPOINT = "https://file.io";
        const request = new XMLHttpRequest();
        const formData = new FormData();

        request.open("POST", API_ENDPOINT, true);
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        };
        formData.append("file", file[0]);
        request.send(formData);
    };


    function handleFileSelect(evt:any) {
        let file = evt.target.files;
        let f = file[0];

        if (!f.type.match('image.*')) {
            alert("Image only please....");
        }
        return f
        let reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {


            };
        })(f);

        reader.readAsDataURL(f);
    }

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>

                    <span className='modal-close' onClick={onClose}>
            &times;
          </span>
                </div>
                <form      action="/page" method="post"  className='modal-form' onSubmit={submit} id='UploadForm'>
                    <div className="container">
                        <div className="row">
                            <label>Загрузить один файл:</label>
                            <input type="file" id="file" name="file" />
                        </div>
                        <div className="row">
                            <span id="output"/>
                        </div>
                        <input type={"text"}  name="text" placeholder={"Напишите что-нибудь..."} />
                    </div>
                    <button onClick={event => submit}>Отправить даныне</button>
                </form>

            </div>
        </div>
    )
}