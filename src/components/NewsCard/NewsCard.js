import React from 'react';
import saveIcon from '../../images/save-icon.svg';
import saveIconMarked from '../../images/save-icon-marked.svg';
import deleteIcon from '../../images/delete-icon.svg';
import './NewsCard.css';


function NewsCard(props) {
  const handleButtonClick = () => {
    const cardInfo = {
      keyword: localStorage.getItem('keyword'),
      title: props.title,
      text: props.text,
      date: props.date,
      source: props.source,
      link: props.src,
      image: props.imageSrc
    }

    if (!props.marked)
      props.onCardSaveClick(cardInfo, props.keyProp);
    else
      props.onCardDeleteClick(props.id);
  }

  return (
    <div className="card">
      <img className="card__image" src={props.imageSrc} alt="картинка карточки новости"/>
      <a className="card__cover" href={props.src} target="_blank" rel="noreferrer"> </a>
      <p className="card__date">{props.date}</p>
      <h3 className="card__title">{props.title}</h3>
      <div className="text-elements">
        <p className="card__text">{props.text}</p>
        <p className="card__source">{props.source}</p>
      </div>

      {props.savedNews ?
        <button className="card__save-button" onClick={handleButtonClick}>
          <img
            className="card__save-image"
            src={deleteIcon}
            alt="иконка на кнопке удаления новости"
          />
        </button> :
        <button className="card__save-button" onClick={handleButtonClick}>
          <img
            className={props.marked && props.loggedIn ? "card__save-image card__save-image_marked" : "card__save-image"}
            src={props.marked && props.loggedIn ? saveIconMarked : saveIcon}
            alt="иконка на кнопке сохранения новости"
          />
        </button>
      }
      {!props.loggedIn && !props.savedNews && <div className="card__save-info">Войдите, чтобы сохранять статьи</div>}
      {props.savedNews && <div className="card__save-info">Убрать из сохраненных</div>}
      {props.savedNews && <div className="card__keyword">{props.keyWord}</div>}
    </div>
  )
}

export default NewsCard;
