import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-counter">Users Online: {this.props.onlineUsers}</div>
      </nav>
    )
  }
}

export default NavBar;
