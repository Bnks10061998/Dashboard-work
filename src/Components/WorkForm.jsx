import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const WorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [filter, setFilter] = useState({
    workName: '',
    startDate: '',
    endDate: '',
  });

  const onSubmit = (data) => {
    console.log(data);
    setSubmittedData(data);
    setShowForm(false);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  // Filter submitted data based on filter state
  const filteredData = submittedData && {
    ...submittedData,
    workName: submittedData.workName.includes(filter.workName),
    startDate: submittedData.startDate.includes(filter.startDate),
    endDate: submittedData.endDate.includes(filter.endDate),
  };

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Inputs */}
        <div className="flex gap-4">
          <input
            type="text"
            name="workName"
            placeholder="Filter by Work Name"
            value={filter.workName}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Add Work Detail Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Work Details
        </button>
      </div>

      {/* Add Work Form */}
      {!showForm ? (
        <></>
      ) : (
        <div className="bg-white p-4 rounded shadow-lg mt-4">
          <h2 className="text-2xl font-semibold mb-4">Add Work Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Work Name</label>
              <input
                type="text"
                {...register('workName', { required: 'Work name is required' })}
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Description */}
                <div className="flex-1">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full p-2 border border-gray-300 rounded"
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
                    className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.docOrExcel && (
                <p className="text-red-500 text-sm">{errors.docOrExcel.message}</p>
              )}
            </div>

            <div className="md:col-span-3 flex justify-between mt-2">
              <button type="submit" className="bg-blue-700 text-white py-2 px-6 rounded">
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

     
      {/* {submittedData && !showForm && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-sm font-medium text-gray-700">Field</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Work Name</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.workName}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Start Date</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.startDate}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">End Date</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.endDate}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Description</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.description}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Remarks</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.remarks}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Image File</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.image?.[0]?.name}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Video File</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.video?.[0]?.name}</td>
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-gray-600">Document/Excel File</td>
                <td className="p-3 text-sm text-gray-700">{submittedData.docOrExcel?.[0]?.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )} */}

{submittedData && !showForm && (
  <div className="mt-6 bg-gray-100 p-4 rounded shadow">
    <h3 className="text-xl font-semibold mb-4">Submitted Work Details</h3>
    <table className="min-w-full bg-white border border-gray-300 rounded shadow text-center">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-sm font-medium text-gray-700">Work Name</th>
          <th className="p-3 text-sm font-medium text-gray-700">Start Date</th>
          <th className="p-3 text-sm font-medium text-gray-700">End Date</th>
          <th className="p-3 text-sm font-medium text-gray-700">Description</th>
          <th className="p-3 text-sm font-medium text-gray-700">Remarks</th>
          <th className="p-3 text-sm font-medium text-gray-700">Image</th>
          <th className="p-3 text-sm font-medium text-gray-700">Video</th>
          <th className="p-3 text-sm font-medium text-gray-700">Document/Excel</th>
          <th className="p-3 text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-3 text-sm text-gray-800">{submittedData.workName}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.startDate}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.endDate}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.description}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.remarks}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.image?.[0]?.name}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.video?.[0]?.name}</td>
          <td className="p-3 text-sm text-gray-800">{submittedData.docOrExcel?.[0]?.name}</td>
          <td className="p-3 text-sm text-gray-800 flex justify-center gap-2">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this entry?")) {
                  setSubmittedData(null);
                }
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)}


    </div>
  );
};

export default WorkForm;
