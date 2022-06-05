import React, {ReactElement} from 'react'

import './FindModal.css'
import Svg from "react-inlinesvg";
import {renderAvatar} from "../../profile/renderAvatar";
// import '../../../../fonts/stylesheet.css'
import NotFound from '../../../images/Мальчишка.svg';
// интерфейс для пропсов
interface ModalFindProps {
    visible: boolean
    title: string
    isNavigate: boolean
    footer: ReactElement | string
    onClose: () => void
    OnNavigate:()=>void
}

export const FindModal = ({
                          visible = false,
                          title = '',
                              isNavigate=false,
                          footer = '',
                              OnNavigate,
                          onClose,
                      }: ModalFindProps) => {
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
        <div className='modal-findPage' onClick={onClose}>
            <div className='triangle'> </div>
            <div className='modal-find' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>

                    <span className='modal-close' onClick={onClose}>
            &times;
          </span>
                </div>
                {title!=='error:404'?
                    <button className='profile-modal-find' onClick={OnNavigate}>
                        <div className='modal-find-avatar'><Svg src={renderAvatar(title)} className='modal-avatar-helper'  /></div>
                        <div className='modal-nickname'>{title}</div>
                    </button>



                    :
                    <div  className='notFoundImage'>
                        <img src={NotFound}/>
                        <div className='notFoundText'>Пользователь не найден</div>
                    </div>
                }



            </div>
        </div>
    )
}