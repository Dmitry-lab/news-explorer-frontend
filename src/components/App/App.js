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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import currentNewsApi from '../../utils/NewsApi';


function App() {

  const [searchStatus, setSearchStatus] = React.useState({ waiting: false, error: '', success: true });
  const [authPopupIsOpened, setAuthPopupOpened] = React.useState(false);
  const [regPopupIsOpened, setRegPopupOpened] = React.useState(false);
  const [infoPopupIsOpened, setInfoPopupOpened] = React.useState(false);
  const [mobileNavIsOpened, setMobileNavOpened] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [foundNews, setFoundNews] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);

  const history = useHistory();

  const serverError = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'

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

  const handleSearchSubmit = (keyword) => {
    setSearchStatus({ waiting: true, error: '', success: false });

    currentNewsApi.getNews(keyword)
      .then((data) => {
        if (data) {
          console.log(data);
          setFoundNews(data);
          setSearchStatus({ waiting: false, error: '', success: true })
        } else {
          setSearchStatus({ waiting: false, error: 'Поиск не дал результатов', success: false })
        }
      })
      .catch(() => {
        setSearchStatus({ waiting: true, error: serverError, success: false })
      })
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header
              isLoggedIn={isLoggedIn}
              isMobileNavOpened={mobileNavIsOpened}
              onMenuButtonClick={handleMainMenuButtonClick}
              onMobileMenuClick={handleMobileMenuClick}
              onMobileMenuClose={handleMobileMenuClose}
              onSearchSubmit={handleSearchSubmit}
            />
            <Main
              status={searchStatus}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
