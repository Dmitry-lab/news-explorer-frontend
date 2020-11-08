import React from 'react';
import './Navigation.css';
import logoutIcon from '../../images/logout.svg';
import logoutIconLight from '../../images/logout-light.svg';
import burgerButton from '../../images/burger-button.svg';
import burgerButtonLight from '../../images/burger-button-light.svg';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
  const classForItems = `navigation-bar__item-name ${props.lightStyle ? "navigation-bar__item-name_light" : ""}`;
  const classForButtonName = `navigation-bar__button-name ${props.lightStyle ? "navigation-bar__button-name_light" : ""}`;
  const classForButton = `navigation-bar__button ${props.lightStyle ? "navigation-bar__button_light" : ""}`;
  const activeClassForItems = props.lightStyle ? "navigation-bar__item_selected_light" : "navigation-bar__item_selected_dark";

  return (
    <nav className={props.lightStyle ? "navigation-bar navigation-bar_theme_light" : "navigation-bar navigation-bar_theme_image"}>
      <div className="navigation-bar__logo">NewsExplorer</div>
      <ul className="navigation-bar__items">
        <li className="navigation-bar__item">
          <NavLink exact to="/" className={classForItems} activeClassName={activeClassForItems}>
            Главная
          </NavLink>
        </li>
        <li className={props.isLoggedIn ? "navigation-bar__item" : "navigation-bar__item navigation-bar__item_hidden"}>
          <NavLink to="/saved-news" className={classForItems} activeClassName={activeClassForItems}>
            Сохраненные статьи
          </NavLink>
        </li>
        <li className="navigation-bar__item">
          <button className={classForButton} onClick={props.onMenuButtonClick}>
            <span className={classForButtonName}>{props.name ? props.name : "Авторизоваться"}</span>
            {props.isLoggedIn &&
              <img
                src={props.lightStyle ? logoutIconLight : logoutIcon}
                alt="Иконка выхода из сеанса текущего пользователя"
              />
            }
          </button>
        </li>
      </ul>
      <button className="navigation-bar__burger-button" onClick={props.onMobileMenuClick}>
        <img
          src={props.lightStyle ? burgerButtonLight : burgerButton}
          alt="кнопка отображения мобильного меню"
        />
      </button>
    </nav>
  )
}

export default Navigation;
