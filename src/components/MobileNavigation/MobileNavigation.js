import React from 'react';
import '../Navigation/Navigation.css';
import './MobileNavigation.css';
import logoutIcon from '../../images/logout.svg';
import logoutIconLight from '../../images/logout-light.svg';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import closeButton from '../../images/close.svg';

function MobileNavigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className={props.isMobileNavOpened ? "mobile-navigation mobile-navigation_visible" : "mobile-navigation"}>
      <div className="mobile-navigation__logo">NewsExplorer</div>
      <ul className="mobile-navigation__items">
        <li className="mobile-navigation__item">
          <Link to="/" className="mobile-navigation__item-name">
            Главная
          </Link>
        </li>
        <li className={props.isLoggedIn ? "mobile-navigation__item" : "mobile-navigation__item mobile-navigation__item_hidden"}>
          <Link to="/saved-news" className="mobile-navigation__item-name">
            Сохраненные статьи
          </Link>
        </li>
        <li className="mobile-navigation__item">
          <button className="mobile-navigation__button" onClick={props.onMenuButtonClick}>
            <span className="mobile-navigation__button-name">{currentUser.name ? currentUser.name : "Авторизоваться"}</span>
            {props.isLoggedIn &&
              <img
                src={props.lightStyle ? logoutIconLight : logoutIcon}
                alt="Иконка выхода из сеанса текущего пользователя"
              />
            }
          </button>
        </li>
      </ul>
      <button
        className="mobile-navigation__close-button"
        onClick={props.onMobileMenuClose}
      >
        <img src={closeButton} alt="значок кнопки закрытия мобильного меню" />
      </button>
    </nav>
  )
}

export default MobileNavigation;
