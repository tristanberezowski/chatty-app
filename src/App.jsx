//Main Application Script File

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 1,
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          id: 2,
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          id: 3,
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          id: 4,
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          id: 5,
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          id: 6,
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          id: 7,
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        }
      ],
      currentUser: "Tristan"
    }
    this.addMessage = this.addMessage.bind(this);
    this.newMessageId = this.newMessageId.bind(this);
    this.userChange = this.userChange.bind(this);
  }//end of constructor

  newMessageId() {
    return this.state.messages[this.state.messages.length - 1].id + 1;
  }
  
  userChange(event) {
    this.setState({
      currentUser: event.target.value
    })
  }

  addMessage(content) {
    this.setState({
      messages: this.state.messages.concat({
        id: this.newMessageId(),
        username: this.state.currentUser,
        content: content,
        type: "incomingMessage"
      })
    })
  }

  render() {
    return (
      <div>
      <NavBar />
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} userChange={this.userChange}/>
      </div>
    );
  }
};
export default App;