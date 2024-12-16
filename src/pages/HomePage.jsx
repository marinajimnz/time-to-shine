import Login from '../components/Login';
import logo from '/public/logo.svg';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={logo} alt="Logo" className="w-50 pb-11" />
        <Login />
    </div>
  );
};

export default HomePage;
