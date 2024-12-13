import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([
    'src/assets/IMG_3966.jpeg',
    'src/assets/IMG_3967.jpeg',
    'src/assets/IMG_3968.jpeg',
  ]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Para almacenar la foto seleccionada
  const [comment, setComment] = useState(''); // Para almacenar el comentario actual
  const [comments, setComments] = useState([]); // Para almacenar todos los comentarios de la foto seleccionada

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotos([...photos, newPhotoUrl]);
      setNewPhoto(null);
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo); // Al hacer clic, ampliamos la foto
    setComments([]); // Limpiar los comentarios al seleccionar una nueva foto
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null); // Cerrar la vista ampliada
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Actualizar el comentario
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]); // Agregar el comentario al array de comentarios
      setComment(''); // Limpiar el campo de comentario
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="photo-upload-section m-4 px-6">
      {/* Encabezado y botón de subir archivo */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Galería del equipo</h2>
        <label
          htmlFor="file-upload"
          className="rounded-lg border border-transparent px-4 py-2 
                    text-base font-medium bg-star-orange text-primary-gray 
                    hover:border-primary-white 
                    focus:outline-auto focus:ring-2 focus:ring-primary-white"
        >
          +
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/* video/*"
          onChange={handlePhotoUpload}
          className="hidden" // Ocultar input de archivo
        />
      </div>

      {/* Slider de fotos */}
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="h-auto w-auto rounded-lg shadow-lg cursor-pointer"
              onClick={() => handlePhotoClick(photo)} // Hacer clic para ampliar la foto
            />
          </div>
        ))}
      </Slider>

      {/* Modal para ver la foto ampliada */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-secondary-gray p-4 rounded-lg max-w-3xl w-full relative">
            <div className="relative">
                {/* Botón de cierre */}    
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-star-orange text-2xl 
                  focus:outline-none mr-2"
                >
                  X
                </button>
              </div>
            <img
              src={selectedPhoto}
              alt="Expanded"
              className="max-w-full h-auto rounded-lg"
            />

            {/* Formulario de comentario */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Añadir un comentario..."
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="rounded-lg border border-transparent px-4 py-2 
                            text-base font-medium bg-star-orange text-primary-gray 
                            hover:border-primary-white 
                            focus:outline-auto focus:ring-2 focus:ring-primary-white"
              >
                Enviar
              </button>
            </form>

            {/* Mostrar los comentarios debajo de la foto */}
            <div className="mt-4">
              <h3 className="font-semibold">Comentarios:</h3>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} className="border-b py-2">{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
