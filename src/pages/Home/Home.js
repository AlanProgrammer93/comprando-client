import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar'
import HomeLeft from '../../components/Home/HomeLeft/HomeLeft';
import PostModal from '../../components/PostModal/PostModal';
import BarChats from '../../components/BarChats/BarChats';

import { getPublications } from '../../api/Publication';
import { addChat } from '../../api/Message';
import calculateTime from '../../utils/HandleTime';

import './Home.css'

const Home = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([]);

    const [showPostModal, setShowPostModal] = useState(false);
    const { user, chats } = useSelector((state) => ({ ...state }));

    const token = localStorage.getItem('token')

    const addPost = () => {
        setShowPostModal(true)
    }

    useEffect(() => {
        getPublications(1, token)
            .then(res => {
                setPosts(res.data)
            })
    }, [token])

    const showChat = (user) => {
        addChat(user._id, token)
            .then(res => {
                const newChat = {
                    id: user._id,
                    username: user.username,
                    /* urlPhot: 'sadgsdg', */
                    messages: res.data.chat.messages,
                    active: true
                }
                dispatch({
                    type: "ADD_CHAT",
                    payload: [...chats, newChat]
                });
            })
    }

    return (
        <div>
            {console.log("USER ", user)}
            {console.log("CHATS ", chats)}
            {console.log("POSTS ", posts)}

            <Navbar />
            {
                showPostModal && <PostModal setShowPostModal={setShowPostModal} />
            }
            {
                chats && <BarChats />
            }
            <div className="Home">
                <div className="Home-left">
                    <HomeLeft addPost={addPost} />
                </div>

                <div className="Home-center">
                    {
                        posts ? posts.map((post, index) => (
                            <div className="post" key={index}>
                                <Carousel
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={true}
                                    autoPlay
                                    infiniteLoop
                                >
                                    {
                                        post.images.map((image, index) => (
                                            <img src={image.url} key={index} alt="" />
                                        ))
                                    }
                                </Carousel>
                                <div className='postedBy'>
                                    <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
                                    <span>{calculateTime(post.updatedAt)}</span>
                                </div>
                                <p className='postDescription'>{post.description}</p>
                                {
                                    user?.id !== post.user._id &&  (
                                        <button onClick={() => showChat(post.user)} className="post-send-message">
                                            Enviar Mensaje
                                        </button>
                                    )
                                    
                                }
                            </div>
                        )) : (
                            <p>No Hay Publicaciones</p>
                        )
                    }
                </div>

                <div className="Home-right">
                    right
                    {
                        chats.map(res => (
                            <p>{res.username}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
