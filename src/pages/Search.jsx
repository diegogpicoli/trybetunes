import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;
    const minInput = 2;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          data-testid="search-artist-input"
          type="text"
          name="search"
          id=""
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ search.length < minInput }
          type="submit"
        >
          Procurar

        </button>
      </div>
    );
  }
}

export default Search;
