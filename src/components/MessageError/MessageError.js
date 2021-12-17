import React, { useEffect } from 'react'
import './MessageError.css';

const MessageError = ({msg, setError}) => {
    useEffect(() => {
        setTimeout(() => 
            setError('')
        , 3000)
        // eslint-disable-next-line
    }, []) 

    return (
        <div className='MessageError'>
            {msg}
        </div>
    )
}

export default MessageError
