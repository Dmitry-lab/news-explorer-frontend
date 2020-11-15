import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList'
import './SavedNews.css';

function SavedNews(props) {
  return (
    <section className="card-section">
      <NewsCardList savedNews={true} onCardDeleteClick={props.onCardDeleteClick}/>
    </section>
  )
}

export default SavedNews;
