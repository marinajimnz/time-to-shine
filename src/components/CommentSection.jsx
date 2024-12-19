/* eslint-disable react/prop-types */
import { useState } from 'react';

const Comments = ({ comments, onAddComment }) => {
  const [comment, setComment] = useState(''); // Estado local para el nuevo comentario.

  // Maneja el cambio en el textarea
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Maneja el envío del formulario
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment); // Llama a la función pasada como prop para agregar el comentario.
      setComment(''); // Limpia el campo de texto.
    }
  };

  return (
    <div className="comments-section">
      {/* Formulario para agregar un comentario */}
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

      {/* Lista de comentarios */}
      <div className="mt-4">
        <h3 className="font-semibold">Comentarios:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
