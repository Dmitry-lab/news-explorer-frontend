import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function InfoPopup(props) {

  return (
    <PopupWithForm
      isOpened={props.isOpened}
      formTitle="Пользователь успешно зарегистрирован!"
      buttonText="Войти"
      bottomButtonText="Войти"
      isInfo={true}
      {...props}
    />
  )
}

export default InfoPopup;
