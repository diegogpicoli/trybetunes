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
      });
    };
    return retorna();
  }

  render() {
    const { banda, name, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p data-testid="album-name">{ albumName }</p>
        <p data-testid="artist-name">{ name }</p>
        <MusicCard object={ banda } />
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
