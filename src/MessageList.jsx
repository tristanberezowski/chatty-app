import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    // Create array of messages to put in the message list
    const messageList = this.props.messages.map( (message) => (
      <Message message={message} key={message.id} />
    ));

    return (
      <main className="messages">
        {messageList}
      </main>
    )
  }
}

export default MessageList;