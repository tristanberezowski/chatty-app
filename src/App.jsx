//Main Application Script File

import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: "Anonymous User",
      socket: {}
    }
    this.addMessage = this.addMessage.bind(this);
    this.userChange = this.userChange.bind(this);
  }//end of constructor

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to ws server");
    this.setState({socket});
    socket.onmessage = (newMessage) => {
      newMessage = JSON.parse(newMessage.data);
      this.addMessage(newMessage);
    }
  }

  userChange(event) {
    this.setState({
      currentUser: event.target.value ? event.target.value : "Anonymous User"
    })
  }

  addMessage(details) {
    this.setState({
      messages: this.state.messages.concat({
        id: details.id,
        username: details.username,
        content: details.content,
        type: details.type
      })
    })
  }

  render() {
    return (
      <div>
      <NavBar />
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} userChange={this.userChange} socket={this.state.socket}/>
      </div>
    );
  }
};
export default App;