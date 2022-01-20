import { useEffect } from 'react';
import { 
  BrowserRouter, 
  Route, 
  Navigate, 
  Routes, 
  Outlet, 
  useLocation 
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

import { currentUser } from './api/Auth';
import { emitJoin, init } from './api/socket';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      currentUser(token)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: res.data.user
          });
          init(dispatch)
          emitJoin(res.data.user.id)
        })
        .catch(err => console.log(err));
    } 

  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<Auth />} />
            {/* Rutas Privadas */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

function RequireAuth() {
  let location = useLocation();
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default App;
