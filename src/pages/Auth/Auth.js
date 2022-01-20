import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { postLogin, postRegister } from '../../api/Auth';
import MessageError from '../../components/MessageError/MessageError';

import './Auth.css';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [authState, setAuthState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const history = useNavigate()

    const { username, email, password, confirmPassword } = authState;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthState(prev => ({ ...prev, [name]: value }));
    }

    const register = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError('Todos los campos son requeridos')
            return
        }
        if (username.length < 4) {
            setError('El usuario debe tener al menos 4 caracteres')
            return
        }
        if (!isEmailValid(email)) {
            setError('Email Incorrecto')
            return
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        postRegister({
            username,
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: res.data.user
              });
            history('/')
        })
        .catch(data => {
            setError("Ya existe ese nombre de usuario o correo.")
        })
    }

    const login = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Todos los campos son requeridos')
            return
        }
        if (!isEmailValid(email)) {
            setError('Email Incorrecto')
            return
        }

        postLogin({
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: res.data.user
              });
            history('/')
        })
        .catch(data => {
            setError("Correo o Contraseña Incorrecta.")
        })
    }

    const isEmailValid = (email) => {
        // eslint-disable-next-line no-useless-escape
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailValid.test(String(email).toLowerCase());
    }

    return (
        <div className={`Auth ${showLogin && 'active'}`}>
            {
                error && <MessageError msg={error} setError={setError} />
            }
            <div className="container">
                <div className='blueBg'>
                    <div className='box signin'>
                        <h2>Ya tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className="signinBtn"
                        >Iniciar</button>
                    </div>
                    <div className='box signup'>
                        <h2>No tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className="signupBtn"
                        >Registrate Aqui</button>
                    </div>
                </div>
                <div className={`formBx ${showLogin && 'active'}`}>
                    <div className='form signinForm'>
                        <form>
                            <h3>Iniciar Sesion</h3>
                            <input
                                type="text"
                                name='email'
                                value={authState.email}
                                onChange={handleChange}
                                placeholder='Correo'
                            />
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={login}>
                                Iniciar Sesion
                            </button>
                            <Link to='forgot' className='forgot'>Recuperar Contraseña</Link>
                        </form>
                    </div>

                    <div className='form signupForm'>
                        <form>
                            <h3>Registrarse</h3>
                            <input
                                type="text"
                                name='username'
                                value={authState.username}
                                placeholder='Usuario'
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name='email'
                                value={authState.email}
                                placeholder='Email'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name='confirmPassword'
                                value={authState.confirmPassword}
                                placeholder='Confirmar Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={register}>
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
