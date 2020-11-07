import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList'
import './SavedNews.css';

function SavedNews() {
  return (
    <section className="card-section">
      <NewsCardList savedNews= {true}/>
    </section>
  )
}

export default SavedNews;
