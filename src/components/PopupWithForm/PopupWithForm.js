import React from 'react';
import './PopupWithForm.css';
import closeButton from '../../images/close.svg';

function PopupWithForm(props) {

  const handlePopupClick = (evt) => {
    if (evt.target.classList.contains('popup'))
      props.onCloseClick();
  }

  return (
    <div className={props.isOpened ? "popup popup_opened" : "popup"} onClick={handlePopupClick}>
      <form className="popup__form" onSubmit={props.onSubmitClick} noValidate>
        <h2 className="popup__title">{props.formTitle}</h2>
        {props.children}

        {!props.isInfo &&
          <button
            type="submit"
            className={props.isNoValid ? "popup__submit-button popup__submit-button_locked" : "popup__submit-button"}
            disabled={props.isNoValid}
          >
            {props.buttonText}
          </button>
        }

        <button
          type="button"
          className="popup__close-button"
          onClick={props.onCloseClick}
        >
          <img src={closeButton} alt="значок кнопки закрытия всплывающего окна" />
        </button>

        <div className= {props.isInfo ? " popup__bottom-block popup__bottom-block_displaced" : "popup__bottom-block"}>
          {!props.isInfo &&  <span className="popup__bottom-text">или</span> }

          <button
            type="button"
            className={props.isInfo ? "popup__bottom-button popup__bottom-button_increased" : "popup__bottom-button"}
            onClick={props.onChangePopup}
          >
            {props.bottomButtonText}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PopupWithForm;
