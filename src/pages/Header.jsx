import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
        { loading ? <Carregando />
          : (
            <div>
              <p data-testid="header-user-name">{ userName }</p>
              <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
