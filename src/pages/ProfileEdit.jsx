import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      email: '',
      description: '',
      imagem: '',
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const recoveryUser = async () => {
      const usuario = await getUser();
      this.setState({
        loading: false,
        userName: usuario.name,
        email: usuario.email,
        description: usuario.description,
        imagem: usuario.image,
      });
    };
    return recoveryUser();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  updateUserSave = async (params) => {
    this.setState({
      loading: true,
    });
    await updateUser(params);
    this.setState({
      loading: false,
    });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const {
      loading,
      userName,
      email,
      description,
      imagem } = this.state;

    let validador = false;
    if (userName <= 0
      || email <= 0
      || description <= 0) {
      validador = true;
    } else {
      validador = false;
    }

    const userObject = {
      name: userName,
      email,
      image: imagem,
      description,
    };

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Carregando />}
        <div className="divForms">
          <div className="divForms2">
            <div className="imgLink">
              <FaUserAlt />
            </div>
          </div>
          <div className="forms">
            <p>Nome</p>
            <input
              className="inputText"
              data-testid="edit-input-name"
              value={ userName }
              type="text"
              name="userName"
              id=""
              onChange={ this.onInputChange }
            />
            <p>E-mail</p>
            <input
              className="inputText"
              data-testid="edit-input-email"
              value={ email }
              type="email"
              name="email"
              id=""
              onChange={ this.onInputChange }
            />
            <p>Descrição</p>
            <textarea
              className="textArea"
              data-testid="edit-input-description"
              value={ description }
              name="description"
              id=""
              cols="30"
              rows="10"
              onChange={ this.onInputChange }
            />
            <button
              className="buttonSearch2"
              disabled={ validador }
              type="submit"
              data-testid="edit-button-save"
              onClick={ () => this.updateUserSave(userObject) }
            >
              Salvar

            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
