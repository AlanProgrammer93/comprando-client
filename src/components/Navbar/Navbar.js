import React from 'react'
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { TiMessages } from 'react-icons/ti';
import { MdPersonOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Navbar.css';

const Navbar = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const history = useNavigate()
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history("/auth");
    };

    return (
        <div className="Navbar">
            <Link to="/" className="Navbar-Logo">
                Comprando
            </Link>

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
                <Link to={`/profile/${user?.id}`} className="Navbar-Menu-option">
                    <MdPersonOutline />
                    <p>Perfil</p>
                </Link>
                <div onClick={logout} style={{ cursor: 'pointer' }} className="Navbar-Menu-option">
                    <FiLogOut />
                    <p>Salir</p>
                </div>
            </div>

        </div>
    )
}

export default Navbar
