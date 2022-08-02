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
      <div key={ elemento.artistId }>
        <img src={ elemento.artworkUrl100 } alt="imagem" />
        <p>{ elemento.collectionName }</p>
        <Link
          data-testid={ `link-to-album-${elemento.collectionId}` }
          to={ `/album/${elemento.collectionId}` }
        >
          Album

        </Link>
      </div>
    ));
    console.log(listaAlbum);
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Carregando />
          : (
            <div>
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
                onClick={ () => this.searchAlbum() }
              >
                Procurar

              </button>
              { artista.length > 0 && (
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artista }
                </p>
              )}
              { album.length > 0 ? listaAlbum : <p>Nenhum álbum foi encontrado</p>}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
