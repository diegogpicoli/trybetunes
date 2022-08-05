import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profile: [],
      loading: false,
    };
  }

  componentDidMount() {
    const recoveryUser = async () => {
      this.setState({
        loading: true,
      });
      const user = await getUser();
      this.setState({
        profile: user,
        loading: false,
      });
    };
    return recoveryUser();
  }

  render() {
    const { profile, loading } = this.state;
    const lorem = `Lorem ipsum dolor sit amet. Rem atque similique et accusantium 
    dignissimos non illo dolores et fugiat recusandae et modi fugit ab consequatur`;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          <div className="profile1">
            <div className="imgLink">
              <FaUserAlt />
            </div>
            <Link to="/profile/edit">
              <button
                className="buttonEditar"
                type="button"
              >
                Editar perfil
              </button>

            </Link>
          </div>
          { loading ? <Carregando /> : (
            <div className="profileItens">
              <h3>Nome</h3>
              <p>{ profile.name }</p>
              <h3>Email</h3>
              <p>{ profile.email === '' ? 'usuario@usuario.com.br' : profile.email}</p>
              <h3>Descrição</h3>
              <p className="textLorem">
                { profile.description === ''
                  ? lorem : profile.description }
              </p>
            </div>)}

        </div>
      </div>
    );
  }
}

export default Profile;
