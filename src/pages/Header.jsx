import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './style.css';
import imagem from './imgs/trybeTunesIcone.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const returnName = async () => {
      const object = await getUser();
      this.setState({
        userName: object.name,
        loading: false,
      });
    };
    return returnName();
  }

  render() {
    const { loading, userName } = this.state;

    return (
      <header data-testid="header-component">
        <div className="header">
          <img src={ imagem } alt="" />
          { loading ? <div className="usuario">Carregando...</div>
            : (
              <div className="usuario">
                <div className="simulaImg">{ userName[0]}</div>
                <p data-testid="header-user-name">{ userName }</p>
              </div>
            )}

        </div>
        <div className="links">
          <Link className="link" data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link
            className="link white"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos

          </Link>
          <Link
            className="link white"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil

          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
