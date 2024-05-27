import React from 'react';

const Popup = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 relative max-w-4xl w-full max-h-full overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2">
          X
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image} alt="Popup" className="w-full h-full object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
