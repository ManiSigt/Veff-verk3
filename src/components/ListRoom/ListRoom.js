import React from 'react';
import { PropTypes } from 'prop-types';

/* eslint-disable no-console */
class ListRoom extends React.Component {
    componentDidMount() {

        this.context.socket.emit('rooms');
        this.context.socket.on('roomlist', (roomlist) => {
            console.log(roomlist);
            let rooms = [];
            for (let o in roomlist) {
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
    createRoom(){

        const { socket } = this.context;
        socket.emit('joinroom', {room:this.state.room}, (roomCreated, reason) => {
            if (roomCreated) {
                this.props.changeRoom(this.state.room);
                this.context.socket.emit('rooms');
            } else {
                console.log(reason);
            }
        });
        //this.setState({ room: '' });
    }

    handleClick(room){
        const { socket } = this.context;
        socket.emit('joinroom', {room:room}, (roomjoined, reason) => {
            if (roomjoined) {
                this.setState({room: room});
                console.log(this.state.room);
                this.props.changeRoom(this.state.room);
            } else {
                console.log(reason);
            }
        });
    }


    render(){
        const { rooms } = this.state;
        return (
            <div>
                {rooms.map(m => ( <div onClick={() => this.handleClick(m)}  className={'roomListItem'} key={m}>{m} </div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder='Create Room'
                        className="input input-big"
                        onInput={(e) => this.setState({ room: e.target.value })} />
                    <button type="button" className="btn pull-right" onClick={() => this.createRoom()}>Send</button>
                </div>
            </div>
        )}


}
ListRoom.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ListRoom;