import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="notFound" data-testid="page-not-found">
        <h1>Ops..</h1>
        <p>
          A página que você está procurando não foi encontrada
        </p>
      </div>
    );
  }
}

export default NotFound;
