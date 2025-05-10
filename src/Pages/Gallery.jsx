import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedImage, setSelectedImage] = useState(null);

  
  useEffect(() => {
    const fetchImages = async () => {
      setImages([
        { id: 1, url: 'image1.jpg', title: 'Image 1', description: 'Description of image 1' },
        { id: 2, url: 'image2.jpg', title: 'Image 2', description: 'Description of image 2' },
      ]);
    };
    fetchImages();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const filteredImages = images
    .filter(image => image.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  return (
    <div className="p-6">
      {/* Filter and Sort Controls */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={handleFilterChange}
        />
        <select
          className="border p-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map(image => (
          <div
            key={image.id}
            className="relative group rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
              <div className="text-white text-lg font-bold">{image.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-4 w-96 max-w-full">
            <div className="flex justify-end">
              <button
                className="text-black font-bold text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl"
            />
            <h2 className="mt-4 text-2xl font-semibold">{selectedImage.title}</h2>
            <p className="mt-2 text-gray-700">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
