import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import ProfileView from '../../components/Profile/ProfileView/ProfileView';
import { getUserAndPublications } from '../../api/Publication';
import ProfilePost from '../../components/Profile/ProfilePost/ProfilePost';
import PostModal from '../../components/PostModal/PostModal';

import './Profile.css';


const Profile = () => {
    const {id} = useParams();
    const [viewUser, setViewUser] = useState({})
    const [posts, setPosts] = useState([])
    const [showPostModal, setShowPostModal] = useState(false);

    const token = localStorage.getItem('token')

    useEffect(() => {
        getUserAndPublications({id}, token)
            .then(res => {
                setViewUser({
                    id: res.data.id,
                    role: res.data.role,
                    username: res.data.username,
                })
                setPosts(res.data.posts)
            })
    }, [])

    const addPost = () => {
        setShowPostModal(true)
    }

    const sendMessage = () => {
        console.log("enviar mensajes");
    }

    return (
        <div>
            <Navbar />
            {
                showPostModal && <PostModal setShowPostModal={setShowPostModal} />
            }
            <ProfileView viewUser={viewUser} addPost={addPost} sendMessage={sendMessage} />
            <ProfilePost id={id} posts={posts} />
        </div>
    )
}

export default Profile
