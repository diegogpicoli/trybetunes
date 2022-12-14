import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      search: '',
      loading: false,
      artista: '',
    };
  }

    searchAlbum = async () => {
      const { search } = this.state;
      this.setState({
        loading: true,
      });
      const retorno = await searchAlbumsAPI(search);
      this.setState({
        album: retorno,
        loading: false,
        artista: search,
        search: '',
      });
    };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search, album, loading, artista } = this.state;
    const minInput = 2;

    const listaAlbum = album.map((elemento) => (
      <div
        className="album"
        key={ elemento.artistId }
      >
        <img
          src={ elemento.artworkUrl100
            .replace('100x100bb', '500x500bb') }
          alt="imagem"
        />
        <h3>{ elemento.collectionName }</h3>
        <Link
          data-testid={ `link-to-album-${elemento.collectionId}` }
          to={ `/album/${elemento.collectionId}` }
        >
          <div className="buttonMusic">Album</div>

        </Link>
      </div>
    ));
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Carregando />
          : (
            <div>
              <div>
                <div className="inputSearch">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    name="search"
                    id=""
                    onChange={ this.onInputChange }
                  />
                  <button
                    className="buttonSearch"
                    data-testid="search-artist-button"
                    disabled={ search.length < minInput }
                    type="submit"
                    onClick={ () => this.searchAlbum() }
                  >
                    Procurar

                  </button>
                </div>
                { artista.length > 0 && (
                  <center>
                    <br />
                    <h2>
                      Resultado de ??lbuns de:
                      {' '}
                      { artista }
                    </h2>

                  </center>
                )}
              </div>
              <div className="albuns">
                { album.length > 0 ? listaAlbum : <h2>Nenhum ??lbum foi encontrado</h2>}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
