import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegistrationPopup(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");

  React.useEffect(() => {
    if (props.isOpened) {
      setEmail("");
      setName("");
      setPassword("");
      setEmailError("");
      setNameError("");
    }
  }, [props.isOpened])

  const emailChangeHandler = (evt) => {
    setEmail(evt.target.value);
    if ((!evt.target.validity.valid) && evt.target.value)
      setEmailError("Неправильный формат Email")
    else
      setEmailError("");
  }

  const passwordChangeHandler = (evt) => {
    setPassword(evt.target.value);
  }

  const nameChangeHandler = (evt) => {
    setName(evt.target.value);
    if ((!evt.target.validity.valid) && evt.target.value)
      setNameError("Имя должно содержать минимум 2 символа")
    else
      setNameError("");
  }

  return (
    <PopupWithForm
      isOpened={props.isOpened}
      formTitle="Регистрация"
      buttonText="Зарегистрироваться"
      bottomButtonText="Войти"
      isNoValid={emailError || nameError || !name || !email || !password}
      isInfo={false}
      {...props}
    >
      <label className="popup__label" htmlFor="reg-email">Email</label>
      <input
        className="popup__input"
        id="reg-email"
        type="email"
        placeholder="Введите почту"
        required={true}
        value={email}
        onChange={emailChangeHandler}
      />
      <span className="popup__error-text">{emailError}</span>
      <label className="popup__label" htmlFor="reg-password">Пароль</label>
      <input
        className="popup__input"
        id="reg-password"
        type="password"
        placeholder="Введите пароль"
        required={true}
        value={password}
        onChange={passwordChangeHandler}
      />
      <label className="popup__label" htmlFor="name">Имя</label>
      <input
        className="popup__input"
        id="name"
        type="text"
        placeholder="Введите своё имя"
        required={true}
        value={name}
        onChange={nameChangeHandler}
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error-text">{nameError}</span>
    </PopupWithForm>
  )
}

export default RegistrationPopup;
