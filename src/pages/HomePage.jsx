import Login from '../components/Login';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="public/logo.svg" alt="Logo" className="w-50 pb-11" />
        <Login />
    </div>
  );
};

export default HomePage;
