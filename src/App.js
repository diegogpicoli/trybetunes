import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  // componentDidUpdate() {
  //   const { loading } = this.state;
  //   console.log(loading, history);
  //   const { history } = this.props;
  //   if (loading === true) {
  //     history.push('/search');
  //   }
  // }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login { ...props } />) }
          />
          <Route
            exact
            path="/search"
            render={ () => (<Search />) }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
