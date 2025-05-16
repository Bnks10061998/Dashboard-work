// import React, { useState } from 'react';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// // Dummy data for projects
// const dummyProjects = [
//   {
//     id: 1,
//     name: 'Website Redesign',
//     client: 'John Doe',
//     status: 'In Progress',
//     deadline: '2025-05-20',
//     description: 'Redesign of company website to modern standards.',
//     priority: 'High',
//     teamMembers: ['Alice', 'Bob'],
//   },
//   {
//     id: 2,
//     name: 'Logo Design',
//     client: 'Acme Inc.',
//     status: 'Completed',
//     deadline: '2025-04-15',
//     description: 'Creating a new logo for Acme Inc.',
//     priority: 'Medium',
//     teamMembers: ['Charlie', 'David'],
//   },
//   {
//     id: 3,
//     name: 'Branding Kit',
//     client: 'Pixel Studio',
//     status: 'Pending',
//     deadline: '2025-05-25',
//     description: 'Design a complete branding kit for Pixel Studio.',
//     priority: 'Low',
//     teamMembers: ['Eve', 'Frank'],
//   },
// ];

// const Projects = () => {
//   const [projects, setProjects] = useState(dummyProjects);
//   const [filter, setFilter] = useState('All');
//   const [viewProject, setViewProject] = useState(null);  // For the "View" functionality
//   const [editingProject, setEditingProject] = useState(null);  // For the "Edit" functionality

//   const filteredProjects =
//     filter === 'All' ? projects : projects.filter(p => p.status === filter);

//   const handleDelete = (id) => {
//     // Show a confirmation alert
//     const confirmDelete = window.confirm("Are you sure you want to delete this project?");
//     if (confirmDelete) {
//       const updatedProjects = projects.filter(project => project.id !== id);
//       setProjects(updatedProjects);
//     }
//   };

//   const handleEdit = (project) => {
//     setEditingProject(project);
//     // Optionally open a modal or show a form to edit the project
//   };

//   const handleView = (project) => {
//     setViewProject(project);
//     // Optionally open a modal or a dedicated screen to view the project
//   };

//   const handleCloseView = () => {
//     setViewProject(null);  // Close the "view" mode
//   };

//   const handleCloseEdit = () => {
//     setEditingProject(null);  // Close the "edit" mode
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header and Filter */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
//         <select
//           className="p-2 border rounded"
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//         >
//           <option>All</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//           <option>Pending</option>
//         </select>
//       </div>

//       {/* Projects Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-6 py-3">Project Name</th>
//               <th className="px-6 py-3">Client</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Deadline</th>
//               <th className="px-6 py-3">Priority</th>
//               <th className="px-6 py-3">Assigned Team</th>
//               <th className="px-6 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProjects.map(project => (
//               <tr key={project.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4 font-medium text-gray-800">{project.name}</td>
//                 <td className="px-6 py-4">{project.client}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-xs ${
//                       project.status === 'Completed'
//                         ? 'bg-green-500'
//                         : project.status === 'In Progress'
//                         ? 'bg-yellow-500'
//                         : 'bg-red-500'
//                     }`}
//                   >
//                     {project.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">{project.deadline}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-xs ${
//                       project.priority === 'High'
//                         ? 'bg-red-500'
//                         : project.priority === 'Medium'
//                         ? 'bg-yellow-500'
//                         : 'bg-green-500'
//                     }`}
//                   >
//                     {project.priority}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">{project.teamMembers.join(', ')}</td>
//                 <td className="px-6 py-4 flex justify-center space-x-4 text-blue-600">
//                   <button onClick={() => handleView(project)} title="View">
//                     <FaEye />
//                   </button>
//                   <button onClick={() => handleEdit(project)} title="Edit">
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(project.id)}
//                     title="Delete"
//                     className="text-red-500"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View Project Modal */}
//       {viewProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">{viewProject.name}</h2>
//             <p><strong>Client:</strong> {viewProject.client}</p>
//             <p><strong>Status:</strong> {viewProject.status}</p>
//             <p><strong>Deadline:</strong> {viewProject.deadline}</p>
//             <p><strong>Description:</strong> {viewProject.description}</p>
//             <p><strong>Priority:</strong> {viewProject.priority}</p>
//             <p><strong>Assigned Team:</strong> {viewProject.teamMembers.join(', ')}</p>
//             <button
//               onClick={handleCloseView}
//               className="mt-4 text-blue-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Edit Project Form (just for illustration) */}
//       {editingProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold text-gray-700">Project Name</label>
//                 <input
//                   type="text"
//                   value={editingProject.name}
//                   onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
//                   className="w-full px-4 py-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold text-gray-700">Description</label>
//                 <textarea
//                   value={editingProject.description}
//                   onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
//                   className="w-full px-4 py-2 border rounded"
//                 />
//               </div>
//               {/* Add more fields as needed */}
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={handleCloseEdit}
//                   className="text-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [viewProject, setViewProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects'); // Ensure correct API endpoint
      setProjects(res.data.projects); // Use 'projects' from the response data
    } catch (error) {
      console.error("Error fetching projects:", error); // Basic error handling
    }
  };

  const filteredProjects =
    filter === 'All' ? projects : projects.filter(p => p.status === filter);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`); // Ensure correct API endpoint
        fetchProjects(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting project:", error); // Basic error handling
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleView = (project) => {
    setViewProject(project);
  };

  const handleCloseView = () => {
    setViewProject(null);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, editingProject); // Correct API endpoint
      fetchProjects(); // Refresh the list after editing
      handleCloseEdit(); // Close the edit form
    } catch (error) {
      console.error("Error editing project:", error); // Basic error handling
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Assigned Team</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{project.name}</td>
                <td className="px-6 py-4">{project.client}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      project.status === 'Completed'
                        ? 'bg-green-500'
                        : project.status === 'In Progress'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">{project.deadline}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      project.priority === 'High'
                        ? 'bg-red-500'
                        : project.priority === 'Medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {project.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{project.teamMembers.join(', ')}</td>
                <td className="px-6 py-4 flex justify-center space-x-4 text-blue-600">
                  <button onClick={() => handleView(project)} title="View">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(project)} title="Edit">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    title="Delete"
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{viewProject.name}</h2>
            <p><strong>Client:</strong> {viewProject.client}</p>
            <p><strong>Status:</strong> {viewProject.status}</p>
            <p><strong>Deadline:</strong> {viewProject.deadline}</p>
            <p><strong>Description:</strong> {viewProject.description}</p>
            <p><strong>Priority:</strong> {viewProject.priority}</p>
            <p><strong>Assigned Team:</strong> {viewProject.teamMembers.join(', ')}</p>
            <button onClick={handleCloseView} className="mt-4 text-blue-600">Close</button>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseEdit} className="text-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
