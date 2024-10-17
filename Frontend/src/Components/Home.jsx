import  { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/alluser', { withCredentials: true });
        setUsers(response.data.user);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/user/delete/${userId}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== userId)); 
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleModify = (user) => {
    setEditingUser(user._id);
    
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    try {
            
      const response = await axios.put(`http://localhost:4000/user/edit/${editingUser}`, {
        username,
        name,
        email,
      }, { withCredentials: true });

      setUsers(users.map(user => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105">
            <div>
              <h2 className="text-xl font-bold text-center text-blue-600 mb-2">{user.username}</h2>
              <p className="text-gray-700 mb-2">Name: {user.name}</p>
              <p className="text-gray-700 mb-2">Email: {user.email}</p>
              <p className="text-gray-700">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleModify(user)}
                className="text-green-600 hover:text-green-800 focus:outline-none"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                <FaTrash size={20} />  
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
