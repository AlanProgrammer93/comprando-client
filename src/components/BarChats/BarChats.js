import React from 'react'
import { useSelector } from 'react-redux';

import Chat from './Chat';

import './BarChats.css'

const BarChats = () => {
    const { chats } = useSelector((state) => ({ ...state }));
    
    return (
        <div className='BarChats'>
            {
                chats.map((chat, index) => (
                    <Chat key={index} chat={chat} index={index} />
                ))
            }
        </div>
    )
}

export default BarChats
