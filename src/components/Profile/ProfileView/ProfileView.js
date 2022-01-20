import React from 'react'
import { useSelector } from 'react-redux';

import './ProfileView.css'

const ProfileView = ({viewUser, addPost, sendMessage}) => {
    
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <div className='ProfileView'>
            
            <img src='https://enorcerna.com/wp-content/uploads/2021/06/frases-de-Madara-Uchiha.png' />
            <div className='ProfileView-info'>
                <img src='https://i1.wp.com/regionps.com/wp-content/uploads/2019/09/jump-force-madara-echiha-4.jpg?resize=1140%2C641&ssl=1' />
                <div className='ProfileView-title'>
                    <h2>{viewUser.username}</h2>
                    <button onClick={user.id === viewUser.id ? addPost : sendMessage} className='post-send-message'>
                        {user.id === viewUser.id ? 'Publicar' : 'Enviar Mensaje'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileView
