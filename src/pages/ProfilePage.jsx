import { useState } from 'react';
import Profile from '../components/Profile';
import PhotoUpload from '../components/PhotoUpload';
import TodoList from '../components/TodoList';

const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState('/path/to/default-profile.jpg');

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-secondary-gray w-full px-4 py-3 flex justify-between items-center">
        <Profile profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />
        <button
          className="rounded-lg border border-transparent px-4 py-2 
                    text-base font-medium bg-star-orange text-primary-gray 
                    hover:border-primary-white 
                    focus:outline-auto focus:ring-2 focus:ring-primary-white"
          onClick={() => alert('Cerrar sesión')}
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Carrusel de fotos */}
      <PhotoUpload />

      {/* Lista de tareas */}
      <TodoList />
    </>
  );
};

export default ProfilePage;
