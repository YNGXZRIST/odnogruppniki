import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import "./SubscribeModal.css";
import Svg from "react-inlinesvg";
import { renderAvatar } from "../renderAvatar";
import "../../../fonts/stylesheet.css";
import "../Modal/Modal.css";
import { IPosts } from "../Profile";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
export interface ISubscribe {
  id: number | undefined;
  username: string | undefined;
}
const getInitialSubscribe = (): ISubscribe[] => [
  {
    id: undefined,
    username: undefined,
  },
];
// интерфейс для пропсов
interface ModalProps {
  visible: boolean;
  title: string;
  subscribers: ISubscribe[];
  username: string;
  token: string;
  content: ReactElement | string;
  footer: ReactElement | string;
  onClose: () => void;

  onNavigate:NavigateFunction
}

export const SubscribeModal = ({
  visible = false,
  title = "",
  content = "",
  footer = "",
  token = "",
  subscribers = getInitialSubscribe(),
  onClose,
  onNavigate,
  username = "",
}: ModalProps) => {
  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };
  const navigateSubscribe=(username:string)=>{
    onNavigate('/page/'+username)
    onClose();
  }
  // c помощью useEffect цепляем обработчик к нажатию клавиш
  // https://ru.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });
  const renderSubscribers = (userItem: ISubscribe) => {
    return (
      <button className="subscribeUser" onClick={()=>navigateSubscribe(userItem.username!)}>
        <div className="subscribe-avatar">
          <Svg
            src={renderAvatar(userItem.username!)}
            className="modal-avatar-helper"
          />

        </div>
          <div className="subscribe-username">{userItem.username}</div>

      </button>
    );
  };
  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  // или возвращаем верстку модального окна
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        {subscribers.map(renderSubscribers)}
        {/*<div  className='modal-image-body'>*/}

        {/*    {content}</div>*/}
        {/*<div className='modal-avatar'><Svg src={renderAvatar(username)} className='modal-avatar-helper'  /></div>*/}

        {/*<div className='modal-login' > {username}</div>*/}
        {/*<div className='modal-title'> {title}</div>*/}
      </div>
    </div>
  );
};
