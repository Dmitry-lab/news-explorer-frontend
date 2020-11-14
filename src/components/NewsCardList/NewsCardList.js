import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function NewsCardList(props) {

  const formatString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru', { day: 'numeric' }) + ' ' +
      date.toLocaleDateString('ru', { month: 'long' }) + ',' +  date.toLocaleDateString('ru', { year: 'numeric' })
  }

  const currentUser = React.useContext(CurrentUserContext);

  const number = !props.savedNews ? props.newsObj.displayed : 0;
  const currentNewsArr = !props.savedNews ? props.newsObj.news.slice(0, number) : [];

  return (
    <div className="card-list">
      {props.savedNews ?
        currentUser.savedNews.map((item, index) => {
          return (
            <NewsCard
              key={index}
              loggedIn={props.loggedIn}
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
        }) :
        currentNewsArr.map((item, index) => {
          return (
            <NewsCard
              key={index}
              loggedIn={props.loggedIn}
              savedNews={props.savedNews}
              imageSrc={item.urlToImage}
              date={formatString(item.publishedAt)}
              title={item.title}
              text={item.description}
              source={item.source.name}
              keyWord={item.keyWord}
              src={item.url}
              onButtonClick={props.onCardButtonClick}
            />
          )
        })
      }

    </div>
  )
}

export default NewsCardList;
