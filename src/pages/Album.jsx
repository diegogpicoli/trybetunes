import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      banda: [],
      name: '',
      albumName: '',
    };
  }

  componentDidMount() {
    const retorna = async () => {
      const { match } = this.props;
      const { params: id } = match;
      const object = await getMusics(id.id);
      this.setState({
        banda: object,
        name: object[0].artistName,
        albumName: object[0].collectionName,
        imagem: object[0].artworkUrl100.replace('100x100bb', '500x500bb'),
      });
    };
    return retorna();
  }

  render() {
    const { banda, name, albumName, imagem } = this.state;
    console.log(banda[0]);
    return (
      <div data-testid="page-album">
        <Header />
        <div className="albumFull">
          <div className="albumPart1">
            <img
              className="imgAlbum"
              src={ imagem }
              alt="ola"
            />
            <h2 data-testid="album-name">{ albumName }</h2>
            <p data-testid="artist-name">{ name }</p>
            <div />
          </div>
          <MusicCard object={ banda } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
