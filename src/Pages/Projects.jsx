import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const dummyProjects = [
  { id: 1, name: 'Website Redesign', client: 'John Doe', status: 'In Progress', deadline: '2025-05-20' },
  { id: 2, name: 'Logo Design', client: 'Acme Inc.', status: 'Completed', deadline: '2025-04-15' },
  { id: 3, name: 'Branding Kit', client: 'Pixel Studio', status: 'Pending', deadline: '2025-05-25' },
];

const Projects = () => {
  const [projects] = useState(dummyProjects);
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All' ? projects : projects.filter(p => p.status === filter);

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
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
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
                <td className="px-6 py-4 flex justify-center space-x-4 text-blue-600">
                  <button title="View"><FaEye /></button>
                  <button title="Edit"><FaEdit /></button>
                  <button title="Delete" className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
