import React from 'react';
import './SearchForm.css';

function SearchForm() {

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
  }

  return (
    <form className="search-form" onSubmit={onSubmitHandler}>
      <input className="search-form__search-string" type="text" placeholder="Введите тему новости" />
      <button className="search-form__button" type="submit">Искать</button>
    </form>
  )
}

export default SearchForm;
