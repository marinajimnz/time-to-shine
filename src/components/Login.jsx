/* eslint-disable react/prop-types */ 
// Disables ESLint's rule for prop-types validation in React components.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../parseConfig'; 

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState(''); // State to store the username input.
  const [password, setPassword] = useState(''); // State to store the password input.
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(''); // State to store login error messages.
  const navigate = useNavigate(); // React Router's hook to navigate.

  const handleLogin = async () => {
    try {
      // Attempt to log in the user using Parse's backend services.
      const user = await Parse.User.logIn(username, password);
      console.log('Logged in!', user); // Log the successful login to the console.
      onLoginSuccess(user); // Calls the `onLoginSuccess` callback function passed as a prop.
      navigate('/profile'); // Redirects the user to the '/profile' page upon successful login.
    } catch (error) {
      console.error('Error while logging in:', error); // Logs any login errors.
      setError('Usuario o contraseña incorrectos'); // Sets an error message in case of login failure.
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Input field for username */}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 px-4 py-2 rounded-lg border border-primary-white text-white placeholder-primary-white focus:ring-2 focus:ring-star-orange focus:outline-none"
      />
      {/* Input field for password */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-64 px-4 py-2 rounded-lg border border-primary-white text-white placeholder-primary-white focus:ring-2 focus:ring-star-orange focus:outline-none"
      />
      {/* Login button */}
      <button
        onClick={handleLogin}
        className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-star-orange text-primary-gray hover:border-primary-white focus:outline-auto focus:ring-2 focus:ring-primary-white"
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
