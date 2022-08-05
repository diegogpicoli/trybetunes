import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listCheck: [],
    };
  }

  componentDidUpdate() {
    const recoveryFavoriteSong = async () => {
      const data = await getFavoriteSongs();
      this.setState({
        listCheck: data,
      });
    };
    return recoveryFavoriteSong();
  }

  songAdd = async (params, event) => {
    this.setState({
      loading: true,
    });
    await addSong(params);
    if (!event.target.checked) {
      this.setState((valorAnterior) => ({
        listCheck: [...valorAnterior.listCheck, params],
        loading: false,
      }));
    } else {
      await removeSong(params);
      this.setState((valorAnterior) => ({
        listCheck: valorAnterior.listCheck.filter((elemento) => elemento !== params),
        loading: false,
      }));
    }
  }

  render() {
    const { object } = this.props;
    const { loading, listCheck } = this.state;
    const listaMusica = object
      .filter((elemento) => elemento.trackId);
    return (
      <div>
        <div>
          { loading ? <Carregando /> : null }
          { object.length > 0
        && listaMusica.map((elemento) => (
          <div className="musicPlayer" key={ elemento.trackName }>
            <h3>{ elemento.trackName }</h3>
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
              className="labelFavoritar"
            >
              <input
                className="inputCheckbox"
                type="checkbox"
                data-testid={ `checkbox-music-${elemento.trackId}` }
                name=""
                checked={ listCheck
                  .some((checkAtual) => checkAtual.trackId === elemento.trackId) }
                id={ elemento.trackId }
                onChange={ (event) => this.songAdd(elemento, event) }
              />
              Favoritar
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
