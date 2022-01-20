import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import SenderMe from './SenderMe';
import SenderOther from './SenderOther';
import { emitSendNewMsg } from '../../api/socket';

import './Chat.css'

const Chat = ({ chat, index }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [open, setOpen] = useState(true)
    const [msg, setMsg] = useState('')

    console.log("CHAT INDIVIDUAL ", chat);

    const sendMsg = (e) => {
        e.preventDefault()
        emitSendNewMsg(user.id, chat.id, msg)
        setMsg('')
    }

    return (
        <div
            className={`chat ${open ? 'active' : ''}`}
            key={index}
        >
            <div className='chat-container'>
                <div className="chat-header">
                    <div className="user-avatar" onClick={() => setOpen(!open)}>
                        <div className="img-container">
                            <img src="/images/perfil.png" />
                        </div>
                        <div className="user-status-info">
                            <a href="#">{chat.username}</a>
                            <p>Active now</p>
                        </div>
                    </div>

                    <div className="chat-comm">
                        <nav>
                            <a href="#">
                                <img src="/images/close.svg" />
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="chat-body">
                    {
                        chat.messages.map(message => (
                            message.sender === user.id ? (
                                <SenderMe msg={message.msg} />
                            ) : (
                                <SenderOther msg={message.msg} />
                            )
                        ))
                    }
                </div>

                <div className="chat-footer">
                    <form onSubmit={sendMsg}>
                        <input
                            type="textarea"
                            placeholder="Type a message..."
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                        />
                    </form>
                    <div className="chat-media">
                        <nav>
                            <a href="#">
                                <img className="upload" src="/images/upload.svg" alt="" />
                            </a>
                        </nav>
                        <a href="#">
                            <img className="like" src="/images/like.svg" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Chat
