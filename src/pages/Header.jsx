import React, { Component } from 'react';
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
        { loading ? <Carregando /> : <p data-testid="header-user-name">{ userName }</p>}
      </header>
    );
  }
}

export default Header;
