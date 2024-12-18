/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Parse from '../parseConfig';
import logoPredef from '/public/logo.svg';

const Profile = ({ teamData, setTeamData }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // useEffect para recuperar el logo del usuario cuando el componente se monta
  useEffect(() => {
    const fetchUserLogo = async () => {
      try {
        const currentUser = Parse.User.current();
        if (currentUser) {
          // Verificar si existe un logo y que sea un objeto válido de Parse.File
          const logo = currentUser.get('logo');
          const logoUrl = logo && typeof logo.url === 'function' ? logo.url() : null;

          // Actualizar el estado de teamData con el logo si existe
          setTeamData((prevData) => ({
            ...prevData,
            logo: logoUrl || prevData.logo, // Si no hay logo, mantener el predeterminado
          }));
        }
      } catch (error) {
        console.error('Error al obtener el logo del usuario:', error.message);
      }
    };

    fetchUserLogo();
  }, [setTeamData]);

  // Función para manejar la selección del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Archivo seleccionado:', file);
    }
  };

  // Función para guardar la foto en Back4App
  const handleSavePhoto = async () => {
    if (!selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    try {
      // Crear el archivo Parse.File
      const parseFile = new Parse.File(selectedFile.name, selectedFile);
      console.log('Guardando archivo en Parse...', parseFile);

      // Guardar el archivo en Back4App
      await parseFile.save();
      console.log('Archivo guardado con éxito:', parseFile.url());

      // Obtener el usuario actual
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.error('No hay ningún usuario autenticado.');
        return;
      }

      // Asignar el logo al usuario y guardar los cambios
      currentUser.set('logo', parseFile);
      await currentUser.save();

      // Actualizar el estado local para reflejar el nuevo logo
      setTeamData((prevData) => ({ ...prevData, logo: parseFile.url() }));

      // Cerrar el modal y restablecer el archivo seleccionado
      setIsPhotoModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error al guardar la foto en Back4App:', error.message);
    }
  };

  return (
    <div>
      {/* Imagen de perfil y nombre */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsPhotoModalOpen(true)}
      >
        <img
          src={teamData.logo || logoPredef}
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

            {/* Botón para guardar la foto */}
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
