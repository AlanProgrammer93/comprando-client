import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar'
import HomeLeft from '../../components/Home/HomeLeft/HomeLeft';
import PostModal from '../../components/PostModal/PostModal';
import { getPublications } from '../../api/Publication';

import './Home.css'
import calculateTime from '../../utils/HandleTime';


const Home = () => {
    const [posts, setPosts] = useState([]);

    const [showPostModal, setShowPostModal] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

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

    return (
        <div>
            {console.log(user)}
            <Navbar />
            {
                showPostModal && <PostModal setShowPostModal={setShowPostModal} />
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
                                    <Link to={'/'}>{post.user.username}</Link>
                                    <span>{calculateTime(post.updatedAt)}</span>
                                </div>
                                <p className='postDescription'>{post.description}</p>
                                <button className="post-send-message">
                                    Enviar Mensaje
                                </button>
                            </div>
                        )) : (
                            <p>No Hay Publicaciones</p>
                        )
                    }

                </div>

                <div className="Home-right">
                    right
                </div>
            </div>
        </div>
    )
}

export default Home
