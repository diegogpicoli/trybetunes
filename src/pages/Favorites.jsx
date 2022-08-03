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
          <div key={ elemento.trackName }>
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
              htmlFor="favorite"
            >
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${elemento.trackId}` }
                name=""
                checked={ listCheck
                  .some((checkAtual) => checkAtual.trackId === elemento.trackId) }
                id="favorite"
                onChange={ () => this.songRemove(elemento) }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
