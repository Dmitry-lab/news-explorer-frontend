import React from 'react';
import facebookIcon from '../../images/facebook.svg';
import githubIcon from '../../images/github.svg';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">&copy; 2020 NewsExplorer, Powered by News API </div>
      <div className="footer__links">
        <ul className="footer__text-links">
          <li className="footer__list-item">
            <Link className="footer__text-link" to="/">Главная</Link>
          </li>
          <li className="footer__list-item">
            <a className="footer__text-link" href="https://praktikum.yandex.ru/" target="blank">Яндекс.практикум</a>
          </li>
        </ul>
        <ul className="footer__social-links">
          <li className="footer__list-item">
            <a href="https://github.com/Dmitry-lab?tab=repositories" target="_blank" rel="noreferrer"><img src={githubIcon} alt="Иконка github"/></a>
          </li>
          <li className="footer__list-item">
            <a href="https://www.facebook.com/yandex.praktikum/" target="_blank" rel="noreferrer"><img src={facebookIcon} alt="Иконка facebook"/></a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
