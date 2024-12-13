import { useState } from 'react';

const Profile = ({ profilePhoto, setProfilePhoto }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setProfilePhoto(newPhotoUrl); // Actualiza la foto de perfil en el componente padre
      setIsPhotoModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center cursor-pointer" 
            onClick={() => setIsPhotoModalOpen(true)}>
        <img
          src={profilePhoto} // Mostramos la imagen actualizada
          alt="Profile"
          className="h-20 w-20 rounded-full border border-star-orange"
        />
        <span className="ml-4 text-xl font-semibold text-primary-white">Clover Gloves</span>{/* Nombre del equipo */} 
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
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-sm text-primary-white mb-4
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border file:border-transparent
                         file:text-base file:font-medium file:bg-star-orange 
                         file:text-primary-gray file:hover:border-primary-white 
                         file:focus:outline-auto focus:ring-2 file:focus:ring-primary-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
