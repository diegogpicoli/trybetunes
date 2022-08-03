import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profile: [],
    };
  }

  componentDidMount() {
    const recoveryUser = async () => {
      const user = await getUser();
      this.setState({
        profile: user,
      });
    };
    return recoveryUser();
  }

  render() {
    const { profile } = this.state;
    if (profile.length !== 0) {
      console.log(profile);
    }

    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        <p>{ profile.name }</p>
        <p>{ profile.email }</p>
        <p>{ profile.description }</p>
        <img data-testid="profile-image" src={ profile.image } alt="" />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
