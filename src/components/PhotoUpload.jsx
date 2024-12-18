import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import photo1 from '/src/assets/IMG_3966.jpeg';
import photo2 from '/src/assets/IMG_3967.jpeg';
import photo3 from '/src/assets/IMG_3968.jpeg';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([photo1, photo2, photo3]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotos([...photos, newPhotoUrl]);
      setNewPhoto(null);
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setComments([]);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
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
              X
            </button>
            <img
              src={selectedPhoto}
              alt="Expanded"
              className="max-w-full h-auto rounded-lg mb-4"
            />
            <form onSubmit={handleCommentSubmit} className="mt-2">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Añadir un comentario..."
                className="w-full p-2 border rounded-lg resize-none"
              />
              <button
                type="submit"
                className="mt-2 rounded-lg border border-transparent px-4 py-2 
                            text-base font-medium bg-star-orange text-primary-gray 
                            hover:border-primary-white 
                            focus:outline-auto focus:ring-2 focus:ring-primary-white"
              >
                Enviar
              </button>
            </form>
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
