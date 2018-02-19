import React from 'react';


class Image extends React.Component {
    getlist() {
        const { socket } = this.context;
        socket.on('users', function() {

            let messages = Object.assign([], this.state.messages);
            messages.push(`${(new Date()).toLocaleTimeString()} - ${msg}`);
            this.setState({ messages });
        });
    }

    render(){
        return 'helo'
    }


};

export default Image;