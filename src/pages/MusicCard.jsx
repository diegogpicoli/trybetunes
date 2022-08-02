import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    // const { trackName, previewUrl } = this.state;
    const { object } = this.props;
    const listaMusica = [];
    if (object.length > 0) {
      for (let index = 1; index < object.length; index += 1) {
        listaMusica.push(object[index]);
      }
    }
    console.log(listaMusica);
    return (
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
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  object: PropTypes.isRequired,
};

export default MusicCard;
