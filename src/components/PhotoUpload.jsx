import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PlusIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Comments from '/src/components/CommentSection.jsx'; // Importamos el nuevo componente.
import photo1 from '/src/assets/IMG_3966.jpeg';
import photo2 from '/src/assets/IMG_3967.jpeg';
import photo3 from '/src/assets/IMG_3968.jpeg';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([photo1, photo2, photo3]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]); // Lista de comentarios.

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotos([...photos, newPhotoUrl]);
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setComments([]); // Resetea los comentarios al cambiar de foto.
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]); // Agrega un nuevo comentario.
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Galería del equipo</h2>
        <label
          htmlFor="file-upload"
          className="rounded-lg border border-transparent px-4 py-2 
                    text-base font-medium bg-star-orange text-primary-gray 
                    hover:border-primary-white 
                    focus:outline-auto focus:ring-2 focus:ring-primary-white"
        >
          <PlusIcon className="h-4 w-4" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/* video/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="h-auto w-auto rounded-lg shadow-lg cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            />
          </div>
        ))}
      </Slider>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-secondary-gray p-4 rounded-lg w-96 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 rounded-lg border border-transparent px-4 py-2 
              text-base font-medium bg-star-orange text-primary-gray 
              hover:border-primary-white focus:outline-none focus:ring-2 focus:ring-primary-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <img
              src={selectedPhoto}
              alt="Expanded"
              className="max-w-full h-auto rounded-lg mb-4"
            />
            {/* Usamos el componente Comments */}
            <Comments comments={comments} onAddComment={handleAddComment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
