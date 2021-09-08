import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Input from '../input/input';
import './chat.css';
import Messages from '../messages/messages.js';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPT = 'localhost:5000'; 

    useEffect(() => {
        const { name, room } = queryString.parse(location.search); // parse url string for username and room name

        socket = io(ENDPT); // open a socket to server

        setName(name);
        setRoom(room);
        socket.emit('join', { name, room }, () => {
    
        });

        return () => {
            socket.emit('disconnected');

            socket.off();
        }
    }, [ENDPT, location.search]) // only open a new connection if both of those values change

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);
    return(
        <div className="outer">
            <h1>{room}</h1>
            <div className="inner">
                
                <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }/>
                <Messages messages={messages} name={name}/ >
            </div>
        </div>
    );
};

export default Chat;