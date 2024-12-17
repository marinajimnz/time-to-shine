/* eslint-disable react/prop-types */
import Login from '../components/Login';
import logo from '/public/logo.svg';

const HomePage = ({onLoginSuccess}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={logo} alt="Logo" className="w-50 pb-11" />
        <Login onLoginSuccess={onLoginSuccess}/>
    </div>
  );
};

export default HomePage;
