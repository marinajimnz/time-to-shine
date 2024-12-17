/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Parse from '../parseConfig';
import Profile from '../components/Profile';
import PhotoUpload from '../components/PhotoUpload';
import TodoList from '../components/TodoList';

const ProfilePage = ({ user }) => {
  const [teamData, setTeamData] = useState(
    {
      logo: '',
      teamName: '',
      photos: [],
  });

  useEffect (() => {
    if (user) {
      // Extract the team data from the user object
      const teamName = user.get('teamName'); // Team name
      const logo = user.get('logo')?.url(); // Logo url
      const photos = user.get('photos') || []; // Array of photos

      setTeamData({ logo, teamName, photos });
    }
  }, [user]);

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-secondary-gray w-full px-4 py-3 flex justify-between items-center">
        <Profile teamData={teamData.logo} setTeamData={setTeamData} />
        <button
          className="rounded-lg border border-transparent px-4 py-2 
                    text-base font-medium bg-star-orange text-primary-gray 
                    hover:border-primary-white 
                    focus:outline-auto focus:ring-2 focus:ring-primary-white"
          onClick={() => {
            Parse.User.logOut();
            window.location.reload();
          }}
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Carrusel de fotos */}
      <PhotoUpload photos={teamData.photos}/>

      {/* Lista de tareas */}
      <TodoList />
    </>
  );
};

export default ProfilePage;
