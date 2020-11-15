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
              keyProp={index}
              loggedIn={props.loggedIn}
              savedNews={props.savedNews}
              id={item._id}
              imageSrc={item.image}
              date={item.date}
              title={item.title}
              text={item.text}
              source={item.source}
              keyWord={item.keyword}
              src={item.link}
              onCardDeleteClick={props.onCardDeleteClick}
              marked={true}
            />
          )
        }) :
        currentNewsArr.map((item, index) => {
          return (
            <NewsCard
              key={index}
              keyProp={index}
              loggedIn={props.loggedIn}
              savedNews={props.savedNews}
              imageSrc={item.urlToImage}
              date={formatString(item.publishedAt)}
              title={item.title}
              text={item.description}
              id={item.savedId}
              source={item.source.name}
              keyWord={item.keyWord}
              src={item.url}
              marked={item.savedId}
              onCardDeleteClick={props.onCardDeleteClick}
              onCardSaveClick={props.onCardSaveClick}
            />
          )
        })
      }

    </div>
  )
}

export default NewsCardList;
