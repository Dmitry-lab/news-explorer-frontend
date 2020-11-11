import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import notFoundIcon from '../../images/not-found.svg';
import './Main.css'

function Main(props) {
  return (
    <main className="main">
      {props.status.error &&
        <section className="result-section">
          <img className="result-section__icon" src={notFoundIcon} alt="иконка для отображения результата: Ничего не найдено" />
          <h2 className="result-section__title result-section__title_notfound">Ничего не найдено</h2>
          <p className="result-section__info">{props.status.error}</p>
        </section>
      }

      { props.status.waiting &&
        <section className="result-section">
          <Preloader />
          <p className="result-section__info">Идет поиск новостей...</p>
        </section>
      }

      { props.status.success &&
        <section className="result-section">
          <h2 className="result-section__title">Результаты поиска</h2>
          <NewsCardList
            savedNews={false}
            {...props}
          />
          <button
            className={props.moreNews ? "result-section__more-button" : "result-section__more-button result-section__more-button_hidden"}
            onClick={props.onMoreButtonClick}
          >
            Показать ещё
          </button>
        </section>
      }
      <About />
    </main>
  )
}

export default Main;
