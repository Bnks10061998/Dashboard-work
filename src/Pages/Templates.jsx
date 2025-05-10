import React, { useState, useEffect } from 'react';

const categories = ['All', 'Dashboard', 'E-commerce', 'Portfolio'];

const dummyTemplates = [
  {
    id: 1,
    name: 'Modern Dashboard',
    description: 'A clean and modern dashboard layout.',
    category: 'Dashboard',
    image: 'https://via.placeholder.com/300x180.png?text=Dashboard+1',
    rating: 4,
    usedBy: 1200,
    tag: 'Free',
  },
  {
    id: 2,
    name: 'E-commerce Shop',
    description: 'Template for online stores.',
    category: 'E-commerce',
    image: 'https://via.placeholder.com/300x180.png?text=E-commerce',
    rating: 5,
    usedBy: 950,
    tag: 'Premium',
  },
  {
    id: 3,
    name: 'Personal Portfolio',
    description: 'Great for showcasing personal work.',
    category: 'Portfolio',
    image: 'https://via.placeholder.com/300x180.png?text=Portfolio',
    rating: 3,
    usedBy: 400,
    tag: 'Free',
  },
];

const TemplateScreen = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setTemplates(dummyTemplates);
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Template Gallery</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:text-white'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105"
          >
            {/* Tag */}
            <span className="absolute top-2 left-2 z-10 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
              {template.tag}
            </span>

            {/* Image */}
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-40 object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
              <button
                className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-200"
                onClick={() => setSelectedTemplate(template)}
              >
                Preview
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700"
                onClick={() => alert(`Applied: ${template.name}`)}
              >
                Apply
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold dark:text-white">{template.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < template.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974 4.18.012c.969.003 1.371 1.24.588 1.81l-3.385 2.46 1.269 3.905c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.351 2.859c-.783.57-1.838-.196-1.538-1.118l1.269-3.905-3.385-2.46c-.783-.57-.38-1.807.588-1.81l4.18-.012 1.286-3.974z" />
                  </svg>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-1">{`Used by ${template.usedBy} users`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-700 dark:text-gray-200"
              onClick={() => setSelectedTemplate(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedTemplate.name}</h2>
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 dark:text-gray-300">{selectedTemplate.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateScreen;
