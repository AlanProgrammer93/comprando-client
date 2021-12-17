import React from 'react'
import {AiOutlineHome, AiOutlineMessage} from 'react-icons/ai';
import {TiMessages} from 'react-icons/ti';
import {MdPersonOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="Navbar-Logo">
                Comprando
            </div>
            
            <div className="Navbar-Menu">
                <Link to="/" className="Navbar-Menu-option">
                    <AiOutlineHome />
                    <p>Inicio</p>
                </Link>
                <a href="/" className="Navbar-Menu-option">
                    <TiMessages />
                    <p>Foro</p>
                </a>
                <a href="/" className="Navbar-Menu-option">
                    <AiOutlineMessage />
                    <p>Mensajes</p>
                </a>
                <Link to="/profile" className="Navbar-Menu-option">
                    <MdPersonOutline />
                    <p>Perfil</p>
                </Link>
            </div>

        </div>
    )
}

export default Navbar
