import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(''); // State to hold the search keyword
  const [showModal, setShowModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null); // For selected work details

  const onSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
    setShowForm(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Filter submitted data based on search keyword
  const filteredData = submittedData.filter((work) =>
    work.workName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    work.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Show modal with work details
  const handleView = (workData) => {
    setSelectedWork(workData);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search by Work Name or Description"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add Work Details
        </button>
      </div>

      {/* Add Work Form */}
      {!showForm ? (
        <></>
      ) : (
        <div className="bg-white p-6 rounded shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Add Work Details</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label className="block text-sm font-medium">Work Name</label>
              <input
                type="text"
                {...register('workName', { required: 'Work name is required' })}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter work name"
              />
              {errors.workName && (
                <p className="text-red-500 text-sm">{errors.workName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                  validate: (value) =>
                    value >= watch('startDate') || 'End date should be after start date',
                })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Description */}
                <div className="flex-1">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter work description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                  )}
                </div>

                {/* Remarks */}
                <div className="flex-1">
                  <label className="block text-sm font-medium">Remarks</label>
                  <textarea
                    {...register('remarks')}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter remarks"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Upload Image</label>
              <input
                type="file"
                {...register('image', { required: 'Image is required' })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Upload Video</label>
              <input
                type="file"
                {...register('video', { required: 'Video is required' })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.video && (
                <p className="text-red-500 text-sm">{errors.video.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Upload Document or Excel</label>
              <input
                type="file"
                accept=".doc,.docx,.xls,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                {...register('docOrExcel', {
                  required: 'Document or Excel file is required',
                })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.docOrExcel && (
                <p className="text-red-500 text-sm">{errors.docOrExcel.message}</p>
              )}
            </div>

            <div className="md:col-span-3 flex justify-between mt-6">
              <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Submitted Work Details */}
      {submittedData.length > 0 && !showForm && (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded shadow-md text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-700">Work Name</th>
                <th className="p-4 text-sm font-medium text-gray-700">Start Date</th>
                <th className="p-4 text-sm font-medium text-gray-700">End Date</th>
                <th className="p-4 text-sm font-medium text-gray-700">Description</th>
                <th className="p-4 text-sm font-medium text-gray-700">Remarks</th>
                <th className="p-4 text-sm font-medium text-gray-700">Image</th>
                <th className="p-4 text-sm font-medium text-gray-700">Video</th>
                <th className="p-4 text-sm font-medium text-gray-700">Document/Excel</th>
                <th className="p-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-700">No results found</td>
                </tr>
              ) : (
                filteredData.map((work, index) => (
                  <tr key={index}>
                    <td className="p-4 text-sm text-gray-800">{work.workName}</td>
                    <td className="p-4 text-sm text-gray-800">{work.startDate}</td>
                    <td className="p-4 text-sm text-gray-800">{work.endDate}</td>
                    <td className="p-4 text-sm text-gray-800">{work.description}</td>
                    <td className="p-4 text-sm text-gray-800">{work.remarks}</td>
                    <td className="p-4 text-sm text-gray-800">{work.image?.[0]?.name}</td>
                    <td className="p-4 text-sm text-gray-800">{work.video?.[0]?.name}</td>
                    <td className="p-4 text-sm text-gray-800">{work.docOrExcel?.[0]?.name}</td>
                    <td className="p-4 text-sm text-gray-800 flex justify-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                        onClick={() => handleView(work)}
                      >
                        <FaEye size={20} />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        title="Edit"
                        onClick={() => setShowForm(true)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this entry?')) {
                            setSubmittedData((prevData) =>
                              prevData.filter((_, i) => i !== index)
                            );
                          }
                        }}
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to show work details */}
      {showModal && selectedWork && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Work Details</h3>
            <p><strong>Work Name:</strong> {selectedWork.workName}</p>
            <p><strong>Start Date:</strong> {selectedWork.startDate}</p>
            <p><strong>End Date:</strong> {selectedWork.endDate}</p>
            <p><strong>Description:</strong> {selectedWork.description}</p>
            <p><strong>Remarks:</strong> {selectedWork.remarks}</p>
            <p><strong>Image:</strong> {selectedWork.image?.[0]?.name}</p>
            <p><strong>Video:</strong> {selectedWork.video?.[0]?.name}</p>
            <p><strong>Document/Excel:</strong> {selectedWork.docOrExcel?.[0]?.name}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkForm;
