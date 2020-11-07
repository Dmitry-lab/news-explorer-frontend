import React from 'react';
import Avatar from '../../images/avatar.jpg'
import './About.css';

function About() {
  return (
    <section className="about">
      <img className="about__image" src={Avatar} alt="Фото или аватар автора" />
      <div className="about__text-content">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__description">Доброго времени суток! Меня зовут Серпков Дмитрий,
          я выпускник фактультета веб-разработки Яндекс-практикума и junior frontend developer.
        </p>
      </div>
    </section>
  )
}

export default About;
