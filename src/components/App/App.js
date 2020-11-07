import './App.css';
import React from 'react';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import AuthorizationPopup from '../AuthorizationPopup/AuthorizationPopup';
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import { Route, Switch, useHistory } from 'react-router-dom';


function App() {

  const [searchStatus, setSearchStatus] = React.useState({ waiting: false, notFound: false, success: true });
  const [authPopupIsOpened, setAuthPopupOpened] = React.useState(false);
  const [regPopupIsOpened, setRegPopupOpened] = React.useState(false);
  const [infoPopupIsOpened, setInfoPopupOpened] = React.useState(false);
  const [mobileNavIsOpened, setMobileNavOpened] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  // закрытие мобильного меню при открытии окна авторизации и при выходе из сеанса пользователя
  React.useEffect(() => {
    setMobileNavOpened(false);
  }, [authPopupIsOpened, isLoggedIn]);

  const handleEscClick = (evt) => {
    if (evt.key === 'Escape') {
      handleCloseButtonClick();
    }
  }

  // обработка нажатия кнопки на основной панели навигации
  const handleMainMenuButtonClick = () => {
    if (isLoggedIn) {
      setLoggedIn(false);
      history.push('/');
    }
    else {
      setAuthPopupOpened(true);
      document.addEventListener('keydown', handleEscClick);
    }
  }

  // обработка нажатия кнопки закрытия popup'ов
  const handleCloseButtonClick = () => {
    document.removeEventListener('keydown', handleEscClick);
    setAuthPopupOpened(false);
    setRegPopupOpened(false);
    setInfoPopupOpened(false);
  }

   // обработка перехода между popup'ами
  const handleChangePopupClick = () => {
    document.removeEventListener('keydown', handleEscClick);
    if (authPopupIsOpened) {
      setAuthPopupOpened(false);
      setRegPopupOpened(true);
    } else {
      setAuthPopupOpened(true);
      setRegPopupOpened(false);
      setInfoPopupOpened(false);
    }
  }

  const handleOnSubmitLogin = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', handleEscClick);
    setLoggedIn(true);
    setAuthPopupOpened(false);
  }

  const handleOnSubmitRegistration = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', handleEscClick);
    setRegPopupOpened(false);
    setInfoPopupOpened(true);
  }

  const handleMobileMenuClick = (evt) => {
    setMobileNavOpened(true);
  }

  const handleMobileMenuClose = (evt) => {
    setMobileNavOpened(false);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
            isMobileNavOpened={mobileNavIsOpened}
            onMenuButtonClick={handleMainMenuButtonClick}
            onMobileMenuClick={handleMobileMenuClick}
            onMobileMenuClose={handleMobileMenuClose}
          />
          <Main status={searchStatus} />
          <AuthorizationPopup
            isOpened={authPopupIsOpened}
            onSubmit={handleOnSubmitLogin}
            onCloseClick={handleCloseButtonClick}
            onChangePopup={handleChangePopupClick}
          />
          <RegistrationPopup
            isOpened={regPopupIsOpened}
            onSubmit={handleOnSubmitRegistration}
            onCloseClick={handleCloseButtonClick}
            onChangePopup={handleChangePopupClick}
          />
          <InfoPopup
            isOpened={infoPopupIsOpened}
            onCloseClick={handleCloseButtonClick}
            onChangePopup={handleChangePopupClick}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNewsHeader
            newsCount="5"
            isLoggedIn={isLoggedIn}
            isMobileNavOpened={mobileNavIsOpened}
            onMenuButtonClick={handleMainMenuButtonClick}
            onMobileMenuClick={handleMobileMenuClick}
            onMobileMenuClose={handleMobileMenuClose}
          />
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
