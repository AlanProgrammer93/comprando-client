import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import calculateTime from '../../../utils/HandleTime';


import './ProfilePost.css'

const ProfilePost = ({ id, posts }) => {
    
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <div className='ProfilePost'>
            
            {console.log(posts)}
            {
                posts && posts.map((post, index) => (
                    <div className='ProfilePost-container' key={index}>
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
                        <div className='post-details'>
                            <h3>{post.description}</h3>
                            <p>{post.price ? `$${post.price}` : ''}</p>
                            <span>{calculateTime(post.updatedAt)}</span>
                        </div>
                        <div className='post-options'>
                            <p>Opcines/active</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProfilePost
