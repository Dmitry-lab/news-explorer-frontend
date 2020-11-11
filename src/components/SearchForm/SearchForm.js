import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');

  const handleInputChange = (evt) => setKeyword(evt.target.value);

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    if (keyword)
      props.onSearchSubmit(keyword);
  }

  React.useEffect(() => {
    setKeyword(props.keyword)
  }, [props.keyword])

  return (
    <form className="search-form" onSubmit={handleSearchSubmit} noValidate>
      <input
        className="search-form__search-string"
        type="text"
        placeholder="Введите тему новости"
        value={keyword}
        onChange={handleInputChange}
        required
      />
      <button className="search-form__button" type="submit">Искать</button>
    </form>
  )
}

export default SearchForm;
