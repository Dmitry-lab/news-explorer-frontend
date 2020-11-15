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

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    props.onSubmit(email, password);
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    if ((!evt.target.validity.valid) && evt.target.value)
      setEmailError('Неправильный формат Email')
    else
      setEmailError('');
  }

  const handlePasswordChange = (evt) => {
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
      onSubmitClick={handleSubmitClick}
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
        onChange={handleEmailChange}
        pattern="^[a-z0-9!#$%'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
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
        onChange={handlePasswordChange}
      />
      <span className="popup__error-text popup__error-text_general">{props.formError}</span>
    </PopupWithForm>
  )
}

export default AuthorizationPopup;
