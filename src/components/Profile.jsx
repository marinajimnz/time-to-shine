/* eslint-disable react/prop-types */
import { useState } from 'react';
import Parse from '../parseConfig';
import logo from '/public/logo.svg';

const Profile = ({ teamData, setTeamData }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Guarda temporalmente el archivo
    }
  };

  // Guardar la foto seleccionada en Back4App
  const handleSavePhoto = async () => {
    if (selectedFile) {
      const parseFile = new Parse.File(selectedFile.name, selectedFile);
      try {
        // Guarda el archivo en Back4App
        await parseFile.save();

        // Actualiza el usuario actual en Back4App
        const currentUser = Parse.User.current();
        currentUser.set('logo', parseFile);
        await currentUser.save();

        // Actualiza el estado local con la nueva URL de la foto
        setTeamData((prevData) => ({ ...prevData, logo: parseFile.url() }));
        setIsPhotoModalOpen(false); // Cierra el modal
        setSelectedFile(null); // Limpia el archivo seleccionado
      } catch (error) {
        console.error('Error while saving the photo:', error.message);
      }
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsPhotoModalOpen(true)}
      >
        <img
          src={teamData.logo || logo} // Imagen por defecto si no hay logo
          alt="Profile logo"
          className="h-20 w-20 rounded-full border border-star-orange"
        />
        <span className="ml-4 text-xl font-semibold text-primary-white">
          {teamData.teamName || 'Nombre del equipo'}
        </span>
      </div>

      {/* Modal para cambiar la foto */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-primary-gray bg-opacity-60 flex items-center justify-center z-10">
          <div className="bg-secondary-gray p-6 rounded-lg shadow-lg text-center relative">
            {/* Botón de cierre */}
            <button
              className="absolute top-2 right-2 text-primary-white text-2xl focus:outline-none mr-2"
              onClick={() => setIsPhotoModalOpen(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-primary-white">
              Cambiar Foto de Perfil
            </h2>

            {/* Input para subir la foto */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-primary-white mb-4
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border file:border-transparent
                         file:text-base file:font-medium file:bg-star-orange 
                         file:text-primary-gray file:hover:border-primary-white 
                         file:focus:outline-auto focus:ring-2 file:focus:ring-primary-white"
            />

            {/* Botón de confirmación */}
            <button
              onClick={handleSavePhoto}
              className="mt-4 px-6 py-2 bg-star-orange text-primary-gray rounded-lg hover:border-primary-white focus:outline-none focus:ring-2 focus:ring-primary-white"
            >
              Guardar Foto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
