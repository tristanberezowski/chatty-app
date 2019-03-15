import React, {Component} from 'react';

class Message extends Component {
//props: message = {content, type, username}
  constructor(props) {
    super(props);
    this.formatMessage = this.formatMessage.bind(this);
  }

  formatMessage() {
    let { content, username, type } = this.props.message;

    switch (type) {
      case 'name-change':
        return (<span className="message-content system" > {content} changed their name to {username} </span>);
      default:
        return (
          <React.Fragment>
            <span className="message-username">{username}</span>
            <span className={"message-content " + type}>{content}</span>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className="message">
        {this.formatMessage()}
      </div>
    );
  }
}
export default Message;