// import React, { useState, useEffect } from 'react';

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [selectedImage, setSelectedImage] = useState(null);

  
//   useEffect(() => {
//     const fetchImages = async () => {
//       setImages([
//         { id: 1, url: 'image1.jpg', title: 'Image 1', description: 'Description of image 1' },
//         { id: 2, url: 'image2.jpg', title: 'Image 2', description: 'Description of image 2' },
//       ]);
//     };
//     fetchImages();
//   }, []);

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const filteredImages = images
//     .filter(image => image.title.toLowerCase().includes(filter.toLowerCase()))
//     .sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

//   return (
//     <div className="p-6">
//       {/* Filter and Sort Controls */}
//       <div className="mb-4 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border p-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
//           value={filter}
//           onChange={handleFilterChange}
//         />
//         <select
//           className="border p-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
//           value={sortOrder}
//           onChange={handleSortChange}
//         >
//           <option value="asc">Sort A-Z</option>
//           <option value="desc">Sort Z-A</option>
//         </select>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredImages.map(image => (
//           <div
//             key={image.id}
//             className="relative group rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
//             onClick={() => handleImageClick(image)}
//           >
//             <img
//               src={image.url}
//               alt={image.title}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
//               <div className="text-white text-lg font-bold">{image.title}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Image Preview */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl p-4 w-96 max-w-full">
//             <div className="flex justify-end">
//               <button
//                 className="text-black font-bold text-xl"
//                 onClick={handleCloseModal}
//               >
//                 &times;
//               </button>
//             </div>
//             <img
//               src={selectedImage.url}
//               alt={selectedImage.title}
//               className="w-full h-auto rounded-xl"
//             />
//             <h2 className="mt-4 text-2xl font-semibold">{selectedImage.title}</h2>
//             <p className="mt-2 text-gray-700">{selectedImage.description}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedImage, setSelectedImage] = useState(null);

  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    category: '',
    uploadDate: '',
    tags: '',
    url: ''
  });

  useEffect(() => {
    // Initial mock data
    setImages([
      {
        id: 1,
        url: 'https://via.placeholder.com/400x250',
        title: 'Mountain View',
        description: 'A beautiful view of the mountains.',
        category: 'Nature',
        uploadDate: '2025-04-15',
        tags: ['mountain', 'sunset', 'nature']
      },
    ]);
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handleImageClick = (image) => setSelectedImage(image);
  const handleCloseModal = () => setSelectedImage(null);

  const handleInputChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    if (!newImage.url || !newImage.title) return alert('Title and URL are required');
    setImages([
      ...images,
      {
        ...newImage,
        id: images.length + 1,
        tags: newImage.tags.split(',').map(tag => tag.trim())
      }
    ]);
    setNewImage({ title: '', description: '', category: '', uploadDate: '', tags: '', url: '' });
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(images.map(img => ({
      title: img.title,
      description: img.description,
      category: img.category,
      uploadDate: img.uploadDate,
      tags: img.tags.join(', '),
      url: img.url
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'gallery_images.csv');
  };

  const filteredImages = images
    .filter(image => image.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <div className="p-6">
      {/* Upload Form */}
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-bold">Add New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="title" placeholder="Title" value={newImage.title} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="text" name="url" placeholder="Image URL" value={newImage.url} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="text" name="category" placeholder="Category" value={newImage.category} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="date" name="uploadDate" value={newImage.uploadDate} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="text" name="tags" placeholder="Tags (comma-separated)" value={newImage.tags} onChange={handleInputChange} className="border p-2 rounded" />
          <input type="text" name="description" placeholder="Description" value={newImage.description} onChange={handleInputChange} className="border p-2 rounded" />
        </div>
        <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
      </div>

      {/* Filter & Export */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-4 py-2 rounded-xl w-full md:w-1/3"
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="flex gap-2">
          <select className="border px-4 py-2 rounded-xl" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
          <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Export CSV</button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map(image => (
          <div key={image.id} onClick={() => handleImageClick(image)} className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition">
            <img src={image.url} alt={image.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm text-gray-500">{image.category}</p>
              <p className="text-xs text-gray-400">Uploaded: {image.uploadDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[95%] md:w-[600px] relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-4 text-gray-500 text-2xl font-bold hover:text-red-500">
              &times;
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} className="rounded-lg w-full h-auto" />
            <h2 className="text-2xl font-bold mt-4">{selectedImage.title}</h2>
            <p className="text-gray-600 mt-2">{selectedImage.description}</p>
            <div className="mt-4">
              <p><strong>Category:</strong> {selectedImage.category}</p>
              <p><strong>Uploaded:</strong> {selectedImage.uploadDate}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedImage.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
