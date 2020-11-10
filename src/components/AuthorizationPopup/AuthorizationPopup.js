import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AuthorizationPopup(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (props.isOpened) {
      setEmail('');
      setPassword('');
      setEmailError('');
    }
  }, [props.isOpened])

  const emailChangeHandler = (evt) => {
    setEmail(evt.target.value);
    if ((!evt.target.validity.valid) && evt.target.value)
      setEmailError('Неправильный формат Email')
    else
      setEmailError('');
  }

  const passwordChangeHandler = (evt) => {
    setPassword(evt.target.value);
  }

  return (
    <PopupWithForm
      isOpened={props.isOpened}
      formTitle="Вход"
      buttonText="Войти"
      bottomButtonText="Зарегистрироваться"
      isNoValid={emailError || !email || !password}
      isInfo={false}
      {...props}
    >
      <label className="popup__label" htmlFor="auth-email">Email</label>
      <input
        className="popup__input"
        id="auth-email"
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
        id="auth-password"
        type="password"
        placeholder="Введите пароль"
        required={true}
        value={password}
        onChange={passwordChangeHandler}
      />
    </PopupWithForm>
  )
}

export default AuthorizationPopup;
