import React from 'react'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'

import './HomeLeft.css'

const HomeLeft = ({addPost}) => {

    return (
        <>
            <div className="Navbar-search">
                <input type="text" placeholder="Buscar" />
                <AiOutlineSearch />
            </div>
            <div className="Home-left-handler">
                {/* Hacer Menu del controlador */}
                <ul>
                    <li onClick={addPost}><AiOutlinePlus />Publicar </li>
                    <li>Publicar + </li>
                    <li>Publicar + </li>
                </ul>
            </div>

            <div className="Home-left-products">
                <h3>Productos en venta</h3>
                <div>
                    <p>sdfsdagds</p>
                    <p>sdfsdagds</p>
                    <p>sdfsdagds</p>
                    <p>sdfsdagds</p>
                </div>

            </div>
        </>
    )
}

export default HomeLeft
