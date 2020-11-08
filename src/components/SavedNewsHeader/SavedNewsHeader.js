import React from 'react';
import Navigation from '../Navigation/Navigation';
import './SavedNewsHeader.css';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

function SavedNewsHeader(props) {
  React.useEffect(() => {
    props.onMobileMenuClose();
  }, [])

  return (
    <header className="news-header">
      <Navigation
        lightStyle={true}
        name="Грета"
        {...props}
      />
      <h1 className="news-header__title">Сохраненные статьи</h1>
      <p className="news-header__wellcome-info">Грета, у вас {props.newsCount} сохраненных статей</p>
      <p className="news-header__info">По ключевым словам: <strong>Природа</strong>, <strong>Тайга</strong> и 2-м другим</p>
      <MobileNavigation
        name={props.isLoggedIn ? "Грета" : ""}
        {...props}
      />
    </header>
  )
}

export default SavedNewsHeader;
