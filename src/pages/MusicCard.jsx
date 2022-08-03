import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listCheck: [],
      listaRecovery: [],
    };
  }

  componentDidMount() {
    const recoveryFavoriteSong = async () => {
      const data = await getFavoriteSongs();
      console.log(data);
      this.setState({
        listCheck: data,
      });
    };
    return recoveryFavoriteSong();
  }

  songAdd = async (params, event) => {
    console.log(event.target.checked);
    this.setState({
      loading: true,
    });
    await addSong(params);
    if (!event.target.checked) {
      this.setState((valorAnterior) => ({
        listCheck: [...valorAnterior.listCheck, params],
      }));
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { object } = this.props;
    const { loading, listCheck } = this.state;
    const listaMusica = [];
    if (object.length > 0) {
      for (let index = 1; index < object.length; index += 1) {
        listaMusica.push(object[index]);
      }
    }
    return (
      <div>
        { loading && <Carregando />}

        <div>
          { object.length > 0
        && null}
          { object.length > 0
        && listaMusica.map((elemento) => (
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
              Favorito
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${elemento.trackId}` }
                name=""
                checked={ listCheck
                  .some((checkAtual) => checkAtual.trackId === elemento.trackId) }
                id="favorite"
                onChange={ (event) => this.songAdd(elemento, event) }
              />
            </label>
          </div>
        ))}
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  object: PropTypes.isRequired,
};

export default MusicCard;
