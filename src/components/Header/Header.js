import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

function Header(props) {
  React.useEffect(() => {
    props.onMobileMenuClose();
  }, [])

  return (
    <header className="header">
      <Navigation
        lightStyle={false}
        name={props.isLoggedIn ? "Грета" : ""}
        {...props}
      />
      <h1 className="header__title">Что творится в мире?</h1>
      <p className="header__info">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <SearchForm />
      <MobileNavigation
        name={props.isLoggedIn ? "Грета" : ""}
        {...props}
      />
    </header>
  )
}

export default Header;
