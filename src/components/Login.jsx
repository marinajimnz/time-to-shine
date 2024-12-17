/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../parseConfig'; // Imports our Parse configuration

const Login = ({onLoginSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // User validation w/ Back4App
      const user = await Parse.User.logIn(username, password);
      console.log('Logged in!', user);
      onLoginSuccess(user); // Calls the onLoginSuccess function passed as a prop
      navigate('/profile'); // Redirects to the profile page
    } catch (error) {
      console.error('Error while logging in:', error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-primary-white  text-white placeholder-primary-white focus:ring-2 focus:ring-star-orange focus:outline-none"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-primary-white text-white placeholder-primary-white focus:ring-2 focus:ring-star-orange focus:outline-none"
            />
            <button 
                onClick={handleLogin}
                className="rounded-lg border border-transparent px-4 py-2 
                            text-base font-medium bg-star-orange text-primary-gray 
                            hover:border-primary-white 
                            focus:outline-auto focus:ring-2 focus:ring-primary-white" >
                Entrar</button>
        </div>
    
  );
};

export default Login;
