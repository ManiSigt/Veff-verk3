import React from 'react';

/* eslint-disable no-console */
class Image extends React.Component {
    componentDidMount() {
        this.context.socket.emit('rooms');
        this.context.socket.on('roomlist', (roomlist) => {
            console.log(roomlist);
            let rooms = Object.assign([], this.state.rooms);
            for (var o in roomlist) {
                rooms.push(o);
                console.log(rooms);
            }
            this.setState({rooms});
        });
    }
    constructor(props){
        super(props);
        this.state = {
            rooms: []
        };
    }

    render(){
        return (
       <div>
            {rooms.map(m => ( <div onClick={this.onItemClick} className={'roomListItem'} key={m}>{m} </div> ))}
        </div>
        )}


}

export default Image;