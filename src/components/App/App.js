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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import currentNewsApi from '../../utils/NewsApi';
import currentMainApi from '../../utils/MainApi';

function App() {

  const [searchStatus, setSearchStatus] = React.useState({ waiting: false, error: '', success: false });
  const [authPopupIsOpened, setAuthPopupOpened] = React.useState(false);
  const [regPopupIsOpened, setRegPopupOpened] = React.useState(false);
  const [infoPopupIsOpened, setInfoPopupOpened] = React.useState(false);
  const [mobileNavIsOpened, setMobileNavOpened] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isMoreNews, setMoreNews] = React.useState(true);
  const [previousKeyword, setPreviousKeyword] = React.useState('');
  const [formError, setFormError] = React.useState('');

  const [foundNews, setFoundNews] = React.useState({ news: [], displayed: 0 });
  const [currentUser, setCurrentUser] = React.useState({ name: '', _id: '', savedNews: [] });

  const history = useHistory();
  const location = useLocation();

  const serverError = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'

  // загрузка данных о последнем поиске из localStorage при монтировании компонента
  React.useEffect(() => {
    const newsFromStorage = JSON.parse(localStorage.getItem('newsArticles'));
    const newsArrLength = newsFromStorage ? newsFromStorage.news.length : 0;

    if (newsArrLength) {
      setSearchStatus({ waiting: false, error: '', success: true })
      setFoundNews({ news: newsFromStorage.news, displayed: newsFromStorage.displayed });
      setPreviousKeyword(localStorage.getItem('keyword'));
      if (newsArrLength <= newsFromStorage.displayed) {
        setMoreNews(false);
      }
    }
  }, []);

  // загрузка данных о пользователе при монтировании
  React.useEffect(() => {
    if (localStorage.getItem('token'))
      setLoggedIn(true);
  }, []);

  // закрытие мобильного меню при открытии окна авторизации и при выходе из сеанса пользователя
  React.useEffect(() => {
    setMobileNavOpened(false);
  }, [authPopupIsOpened, isLoggedIn]);


  // запись данных в localStorage
  React.useEffect(() => {
    localStorage.setItem('newsArticles', JSON.stringify(foundNews));
  }, [foundNews])

  // получение данные пользователя
  React.useEffect(() => {
    if (isLoggedIn) {
      fillСurrentUser();
    }
  }, [isLoggedIn])

  const handleEscClick = (evt) => {
    if (evt.key === 'Escape') {
      handleCloseButtonClick();
    }
  }

  // получение данных пользователя
  const fillСurrentUser = () => {
    currentMainApi.getUserInfo()
      .then((res) => {
        if (res.data) {
          setCurrentUser({ name: res.data.name, _id: res.data._id, savedNews: [] })
        } else {
          alert('Ошибка сервера при загрузке личных данных. Попробуйте зайти на сайт позднее');
          setLoggedIn(false);
        }
      })
      .catch(() => {
        alert('Ошибка сервера при загрузке личных данных. Попробуйте зайти на сайт позднее');
        setLoggedIn(false);
      })
  }

  // обработка нажатия кнопки на основной панели навигации
  const handleMainMenuButtonClick = () => {
    setFormError('');
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setCurrentUser({ name: '', _id: '', savedNews: [] });
      setLoggedIn(false);
      history.push('/');
    } else {
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
    setFormError('');
    if (authPopupIsOpened) {
      setAuthPopupOpened(false);
      setRegPopupOpened(true);
    } else {
      setAuthPopupOpened(true);
      setRegPopupOpened(false);
      setInfoPopupOpened(false);
    }
  }

  // обработка нажатия кнопки "Искать"
  const handleSearchSubmit = (keyword) => {
    setSearchStatus({ waiting: true, error: '', success: false });
    localStorage.clear();

    currentNewsApi.getNews(keyword)
      .then((data) => {
        if (data.articles.length) {
          setFoundNews({ news: data.articles, displayed: 3 });
          setSearchStatus({ waiting: false, error: '', success: true })
          if (data.articles.length > 3) {
            setMoreNews(true)
          } else {
            setMoreNews(false)
          }

          localStorage.setItem('keyword', keyword);
        } else {
          setSearchStatus({ waiting: false, error: 'Поиск не дал результатов', success: false })
        }
      })
      .catch(() => {
        setSearchStatus({ waiting: false, error: serverError, success: false })
      })
  }

  // обработка нажатия кнопки "Показать ещё"
  const handleMoreButtonClick = () => {
    const newNumber = foundNews.displayed + 3;
    if (newNumber >= foundNews.news.length) {
      setMoreNews(false);
    }
    setFoundNews({ news: foundNews.news, displayed: newNumber });
  }

  const handleOnSubmitLogin = (email, password) => {
    document.removeEventListener('keydown', handleEscClick);
    currentMainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          setLoggedIn(true);
          setAuthPopupOpened(false);
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        setAuthPopupOpened(true);
        if (err === 401) {
          setFormError('Неправильный Email или пароль.');
        } else {
          setFormError('Ошибка сервера. Попробуйте авторизоваться позднее.');
        }
      })

  }

  const handleSubmitRegistration = (name, email, password) => {
    document.removeEventListener('keydown', handleEscClick);
    currentMainApi.register(name, email, password)
      .then((res) => {
        if (res.data) {
          setRegPopupOpened(false);
          setInfoPopupOpened(true);
        } else {
          setFormError('Ошибка сервера. Попробуйте зарегистрироваться снова.')
        }
      })
      .catch((err) => {
        setRegPopupOpened(true);
        if (err === 409) {
          setFormError('Пользователь с таким Email уже существует.');
        } else {
          setFormError('Ошибка сервера. Попробуйте зарегистрироваться снова.');
        }
      })

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
              keyword={previousKeyword}
            />
            <Main
              status={searchStatus}
              newsObj={foundNews}
              loggedIn={isLoggedIn}
              moreNews={isMoreNews}
              onMoreButtonClick={handleMoreButtonClick}
            />
            <AuthorizationPopup
              isOpened={authPopupIsOpened}
              onSubmit={handleOnSubmitLogin}
              onCloseClick={handleCloseButtonClick}
              onChangePopup={handleChangePopupClick}
              formError={formError}
            />
            <RegistrationPopup
              isOpened={regPopupIsOpened}
              onSubmit={handleSubmitRegistration}
              onCloseClick={handleCloseButtonClick}
              onChangePopup={handleChangePopupClick}
              formError={formError}
            />
            <InfoPopup
              isOpened={infoPopupIsOpened}
              onCloseClick={handleCloseButtonClick}
              onChangePopup={handleChangePopupClick}
            />
          </Route>
          <ProtectedRoute path="/saved-news" location={location} loggedIn={isLoggedIn} openAuthFunction={setAuthPopupOpened}>
            <SavedNewsHeader
              newsCount="5"
              isLoggedIn={isLoggedIn}
              isMobileNavOpened={mobileNavIsOpened}
              onMenuButtonClick={handleMainMenuButtonClick}
              onMobileMenuClick={handleMobileMenuClick}
              onMobileMenuClose={handleMobileMenuClose}
            />
            <SavedNews />
          </ProtectedRoute>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
