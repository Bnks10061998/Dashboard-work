import React, { useState } from 'react';

const ClientList = () => {
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'johndoe@gmail.com', 
      phone: '123-456-7890', 
      address: '123 Main St', 
      city: 'Vellore', 
      zipCode: '632001', 
      country: 'India',
      state: 'Tamil Nadu',
      companyName: 'ABC Ltd.',
      gst: 'GST123',
      pan: 'PAN123',
      cin: 'CIN123',
      notes: 'Regular customer' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'janesmith@gmail.com', 
      phone: '987-654-3210', 
      address: '456 Oak Rd', 
      city: 'Chennai', 
      zipCode: '600001', 
      country: 'India',
      state: 'Tamil Nadu',
      companyName: 'XYZ Inc.',
      gst: 'GST456',
      pan: 'PAN456',
      cin: 'CIN456',
      notes: 'VIP client' 
    },
    { 
      id: 3, 
      name: 'Alice Johnson', 
      email: 'alicejohnson@gmail.com', 
      phone: '555-123-4567', 
      address: '789 Pine Ln', 
      city: 'Bangalore', 
      zipCode: '560001', 
      country: 'India',
      state: 'Karnataka',
      companyName: 'DEF Corp.',
      gst: 'GST789',
      pan: 'PAN789',
      cin: 'CIN789',
      notes: 'New client' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    state: '',
    companyName: '',
    gst: '',
    pan: '',
    cin: '',
    notes: '',
  });

  const handleEdit = (client) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setClientToEdit(client);
    setNewClient({ ...client });
  };

  const handleDelete = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone || !newClient.address || !newClient.city || !newClient.zipCode || !newClient.country || !newClient.state || !newClient.companyName || !newClient.gst || !newClient.pan || !newClient.cin) {
      alert('All fields are required.');
      return;
    }

    const newClientData = {
      id: clients.length + 1,
      ...newClient,
    };

    setClients([...clients, newClientData]);
    setNewClient({ name: '', email: '', phone: '', address: '', city: '', zipCode: '', country: '', state: '', companyName: '', gst: '', pan: '', cin: '', notes: '' });
    setIsModalOpen(false);
  };

  const handleUpdateClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone || !newClient.address || !newClient.city || !newClient.zipCode || !newClient.country || !newClient.state || !newClient.companyName || !newClient.gst || !newClient.pan || !newClient.cin) {
      alert('All fields are required.');
      return;
    }

    const updatedClients = clients.map(client =>
      client.id === clientToEdit.id ? { ...client, ...newClient } : client
    );

    setClients(updatedClients);
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Client List</h2>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New Client
      </button>

      {/* Add/Edit Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-[800px]">
            <h3 className="text-2xl font-semibold mb-6 text-center">{isEditMode ? 'Edit Client' : 'Add New Client'}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Input Fields */}
                <div className="mb-4">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client email"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client phone"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newClient.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client address"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={newClient.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client city"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={newClient.zipCode}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client zip code"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={newClient.country}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client country"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={newClient.state}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter client state"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={newClient.companyName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">GST No</label>
                  <input
                    type="text"
                    name="gst"
                    value={newClient.gst}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter GST No"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">PAN No</label>
                  <input
                    type="text"
                    name="pan"
                    value={newClient.pan}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter PAN No"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">CIN No</label>
                  <input
                    type="text"
                    name="cin"
                    value={newClient.cin}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter CIN No"
                  />
                </div>

                <div className="mb-4 col-span-3">
                  <label className="block text-sm font-medium">Notes</label>
                  <textarea
                    name="notes"
                    value={newClient.notes}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="Enter any additional notes"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 py-2 px-6 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={isEditMode ? handleUpdateClient : handleAddClient}
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Table */}
      <table className="w-full table-auto border-collapse mt-8">
        <thead>
          <tr>
            <th className="border-b p-3 text-left">Name</th>
            <th className="border-b p-3 text-left">Email</th>
            <th className="border-b p-3 text-left">Phone</th>
            <th className="border-b p-3 text-left w-[300px]">Address</th>
            <th className="border-b p-3 text-left">Company</th>
            <th className="border-b p-3 text-left">Notes</th>
            <th className="border-b p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border-b p-3">{client.name}</td>
              <td className="border-b p-3">{client.email}</td>
              <td className="border-b p-3">{client.phone}</td>
              <td className="border-b p-3">{client.address}</td>
              <td className="border-b p-3">{client.companyName}</td>
              <td className="border-b p-3">{client.notes}</td>
              <td className="border-b p-3">
                <button
                  onClick={() => handleEdit(client)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-500 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;



