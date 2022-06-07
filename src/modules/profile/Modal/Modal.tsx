import React, {ReactElement} from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import Svg from "react-inlinesvg";
import {renderAvatar} from "../renderAvatar";
import '../../../fonts/stylesheet.css'
// интерфейс для пропсов

interface ModalProps {
    visible: boolean
    title: string
    username: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
}

export const Modal = ({
                          visible = false,
                          title = '',
                          content = '',
                          footer = '',
                          username = '',
                          onClose,
                      }: ModalProps) => {
    // создаем обработчик нажатия клавиши Esc
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

    // или возвращаем верстку модального окна
    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>

                    <span className='modal-close' onClick={onClose}>
            &times;
          </span>
                </div>
                <div  className='modal-image-body'>

                    {content}</div>
                <div className='modal-avatar'><Svg src={renderAvatar(username)} className='modal-avatar-helper'  /></div>

                    <div className='modal-login' > {username}</div>
                <div className='modal-title'> {title}</div>

            </div>
        </div>
    )
}