import React, { Component } from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listCheck: [],
    };
  }

  componentDidMount() {
    const recoveryFavoriteSong = async () => {
      const data = await getFavoriteSongs();
      this.setState({
        listCheck: data,
      });
    };
    return recoveryFavoriteSong();
  }

  songRemove = async (params) => {
    this.setState({
      loading: true,
    });
    await removeSong(params);
    this.setState((valorAnterior) => ({
      listCheck: valorAnterior.listCheck.filter((elemento) => elemento !== params),
      loading: false,
    }));
  }

  render() {
    const { listCheck, loading } = this.state;
    console.log(listCheck);
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Carregando />}
        { listCheck.length > 0
        && listCheck.map((elemento) => (
          <div className="divMusic" key={ elemento.trackName }>
            <div className="divMusic2">
              <img
                className="imgFavorite"
                src={ elemento.artworkUrl100
                  .replace('100x100bb', '500x500bb') }
                alt="imagem"
              />
              <div className="musicFavorite">
                <p>{ elemento.trackName }</p>
                <audio data-testid="audio-component" src={ elemento.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  htmlFor={ elemento.trackId }
                >
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${elemento.trackId}` }
                    name=""
                    checked={ listCheck
                      .some((checkAtual) => checkAtual.trackId === elemento.trackId) }
                    id={ elemento.trackId }
                    onChange={ () => this.songRemove(elemento) }
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
