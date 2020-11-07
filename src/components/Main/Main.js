import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import notFoundIcon from '../../images/not-found.svg';
//import { Switch, Route } from 'react-router-dom'
import './Main.css'

function Main(props) {
  return (
    <main className="main">
      <section className="result-section">
        {props.status.notFound &&
          <>
            <img className="result-section__icon" src={notFoundIcon} alt="иконка для отображения результата: Ничего не найдено" />
            <h2 className="result-section__title result-section__title_notfound">Ничего не найдено</h2>
            <p className="result-section__info">К сожалению по вашему запросу ничего не найдено.</p>
          </>
        }

        { props.status.waiting &&
          <>
            <Preloader />
            <p className="result-section__info">Идет поиск новостей...</p>
          </>
        }

        { props.status.success &&
          <>
            <h2 className="result-section__title">Результаты поиска</h2>
            <NewsCardList savedNews={false} />
            <button className="result-section__more-button">Показать ещё</button>
          </>
        }
      </section>
      <About />
    </main>
  )
}

export default Main;
