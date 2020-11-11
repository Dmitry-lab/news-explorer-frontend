import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {

  const formatString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru', { day: 'numeric' }) + ' ' +
      date.toLocaleDateString('ru', { month: 'long' }) + ',' +  date.toLocaleDateString('ru', { year: 'numeric' })
  }

  const number = props.newsObj.displayed;
  const currentNewsArr = props.newsObj.news.slice(0, number);

  return (
    <div className="card-list">
      {currentNewsArr.map((item) => {
        return (
          <NewsCard
            loggedIn={props.loggedIn}
            marked={false}
            savedNews={props.savedNews}
            imageSrc={item.urlToImage}
            date={formatString(item.publishedAt)}
            title={item.title}
            text={item.description}
            source={item.source.name}
            keyWord={item.keyWord}
            src={item.url}
          />
        )
      })}

    </div>
  )
}

export default NewsCardList;
