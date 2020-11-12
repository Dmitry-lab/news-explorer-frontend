import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegistrationPopup(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  React.useEffect(() => {
    if (props.isOpened) {
      setEmail('');
      setName('');
      setPassword('');
      setEmailError('');
      setNameError('');
    }
  }, [props.isOpened])

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    props.onSubmit(name, email, password);
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

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    if ((!evt.target.validity.valid) && evt.target.value)
      setNameError('Имя должно содержать минимум 2 символа')
    else
      setNameError('');
  }

  return (
    <PopupWithForm
      isOpened={props.isOpened}
      formTitle="Регистрация"
      buttonText="Зарегистрироваться"
      bottomButtonText="Войти"
      isNoValid={emailError || nameError || !name || !email || !password}
      isInfo={false}
      onSubmitClick={handleSubmitClick}
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
        onChange={handleEmailChange}
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
        onChange={handlePasswordChange}
      />
      <label className="popup__label" htmlFor="name">Имя</label>
      <input
        className="popup__input"
        id="name"
        type="text"
        placeholder="Введите своё имя"
        required={true}
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error-text">{nameError}</span>
      <span className="popup__error-text popup__error-text_general">{props.formError}</span>
    </PopupWithForm>
  )
}

export default RegistrationPopup;
