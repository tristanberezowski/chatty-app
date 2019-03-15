import React, {Component} from 'react';

class ChatBar extends Component {
// props: currentUser, socket, addMessage, userChange

  newMessage = (event) => {
    if(event.key === "Enter") {
      let msg = JSON.stringify({
        content: event.target.value,
        username: this.props.currentUser,
        type: 'incoming-message'
      });
      this.props.socket.send(msg);
      event.target.value = '';
    }
  }

  changeName = (event) => {
    if(event.key === "Enter") {
      let msg = JSON.stringify({
        content: this.props.currentUser,
        username: event.target.value,
        type: 'name-change'
      });
      this.props.socket.send(msg);
      this.props.userChange(event);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your user-name (optional)" onKeyDown={this.changeName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.newMessage}/>
      </footer>
    );
  }
}
export default ChatBar;