import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  loginOk = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { nameUser } = this.state;
    await createUser({ name: nameUser });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { nameUser, loading } = this.state;
    const minInput = 3;

    return (
      <div>
        { loading ? <Carregando />
          : (
            <div data-testid="page-login">
              <input
                type="text"
                name="nameUser"
                id=""
                data-testid="login-name-input"
                value={ nameUser }
                onChange={ this.onInputChange }
              />
              <button
                type="submit"
                disabled={ nameUser.length < minInput }
                data-testid="login-submit-button"
                onClick={ this.loginOk }
              >
                Entrar
              </button>
            </div>
          )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
