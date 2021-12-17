import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer';

import { postDeletePublication, postPhoto, postPublication } from '../../api/Publication';

import './PostModal.css'


const PostModal = ({ setShowPostModal }) => {
    const [values, setValues] = useState({
        description: '',
        price: 0
    })
    const [images, setImages] = useState([])
    const [imagesUrls, setImagesUrls] = useState([])
    const [loading, setLoading] = useState(false)

    const fileResize = (e) => {
        let files = e.target.files;
        let totalImages = files.length + images.length

        if (totalImages > 4) {
            console.log("No puedes subir mas de 4 imagenes");
            return
        }

        if (files) {
            setLoading(true)
            const token = localStorage.getItem('token')
            for (let i = 0; i < files.length; i++) {

                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {

                    try {
                        
                        postPhoto({ image: uri }, token)
                            .then(res => {
                                let dataImage = {
                                    public_id: res.data.public_id,
                                    preview: URL.createObjectURL(files[i])
                                }
                                setImages(prev => [...prev, dataImage])
                                setImagesUrls(prev => [...prev, res.data])
                            })
                        
            
                    } catch (error) {
                        console.log("algo salio mal ", error);
                    }

                },
                    'base64'
                );

            }
            setLoading(false)
        }
    }

    const deleteImage = (public_id) => {
        const imageDeleted = images.filter((ima) => ima.public_id !== public_id);
        setImages(imageDeleted);
        const token = localStorage.getItem('token')
        postDeletePublication({
            public_id
        }, token)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }

    const submitPost = () => {
        if (images.length < 1) {
            console.log("Debes tener al menos 1 imagen");
            return
        }
        if (!values.description) {
            console.log("Debes tener una descripcion");
            return
        }
        const token = localStorage.getItem('token')
        postPublication({
            images: imagesUrls,
            description: values.description,
            price: values.price
        }, token)
        .then(res => {
            console.log(res.data);
            setShowPostModal(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='PostModal'>
            <div className='PostModal-container'>
                <p className='closeModal' onClick={() => setShowPostModal(false)}>X</p>
                <label className='uploadImages'>
                    Subir Imagenes
                    <input
                        type="file"
                        hidden
                        multiple
                        accept='image/*'
                        onChange={fileResize}
                    />
                </label>
                <div className='uploadImagesPreview'>
                    {
                        images && images.map((ima, index) => (
                            <>
                                <img src={ima.preview} key={index} alt={index} />
                                <div className='deleteImage' onClick={() => deleteImage(ima.public_id)}>
                                    X
                                </div>
                            </>
                        ))
                    }
                </div>
                <textarea
                    placeholder='Descripcion'
                    className='textareaPost'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                />

                <div className='price'>
                    <input
                        type='number'
                        placeholder='Precio'
                        min={1}
                        name='price'
                        value={values.price}
                        onChange={handleChange}
                    />
                    <p>Opcional</p>
                </div>
                <button className='btnCustom' onClick={submitPost}>ACEPTAR</button>
            </div>
        </div>
    )
}

export default PostModal
