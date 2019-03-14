import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

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
      this.props.userChange(event);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this.changeName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => this.newMessage(event)}/>
      </footer>
    );
  }
}
export default ChatBar;