import React from 'react';
import { PropTypes } from 'prop-types';
/* eslint-disable no-console */
class ChatWindow extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('updatechat', (room, msg) => {
            // Update the message state
            console.log(msg);
            let messages = [];
            for(let i = 0; i < msg.length; i++){
                messages.push(`${(new Date()).toLocaleTimeString('is')} - ${msg[i].nick} : ${msg[i].message}`);
            }

            this.setState({ messages });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            msg: '',
            messages: [],
        };
    }
    sendMessage() {
        const { socket } = this.context;
        socket.emit('sendmsg', {msg:this.state.msg, roomName:this.props.currentRoom});
        this.setState({ msg: '' });
    }
    render() {
        const { messages, msg } = this.state;
        return (
            <div className="chat-window">
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
}

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

ChatWindow.defaultProps = {
    currentRoom: 'lobby'
};

export default ChatWindow;