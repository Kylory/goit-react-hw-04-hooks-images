import { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = props => {
  const [stateQuery, setStateQuery] = useState('');

  const onChangeQuery = e => {
    setStateQuery(e.target.value);
  };

  // Передає query в state App
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(stateQuery);
    reset();
  };

  const reset = () => {
    setStateQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={stateQuery}
          onChange={onChangeQuery}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
