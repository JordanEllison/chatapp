import React from 'react';
import './message.css';

const Message = ({ message: {user, text}, name }) => {
    let isUser = false;

    let trimmedName = name.trim().toLowerCase();

    if(user === name) {
        isUser = true;
    }

    return (
        isUser
        ? (
            <div className="messageContainer justifyEnd">
                <p className="senderName">{trimmedName}</p>
                <div className="messageTextBoxSelf">
                    <p className="messageText">{text}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <p className="senderName">{trimmedName}</p>
                <div className="messageTextBox">
                    <p className="messageText">{text}</p>
                </div>
            </div>
        )
    );
}

export default Message;