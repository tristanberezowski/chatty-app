import React, {Component} from 'react';

class ChatBar extends Component {

  checkKey = (event) => {
    if(event.key === "Enter") {
      this.props.addMessage(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.props.userChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => this.checkKey(event)}/>
      </footer>
    );
  }
}
export default ChatBar;