import { useState, useEffect } from 'react';
import { getAllCleaningTimes, createCleaningTime, updateCleaningTime } from '../../api/cleaningTimes';
import { FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface PriceForm {
  serviceType: string;
  price: number;
}

interface CleaningTime {
  _id: string;
  name: string;
  cleaningTime: number;
}

const PricingManagement = () => {
  const [formData, setFormData] = useState<PriceForm>({
    serviceType: '',
    price: 0
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [cleaningTimes, setCleaningTimes] = useState<CleaningTime[]>([]);
  const [newRoom, setNewRoom] = useState({ name: '', cleaningTime: '' });
  const [loading, setLoading] = useState(false);
  const [rowLoading, setRowLoading] = useState<{ [id: string]: boolean }>({});
  const [rowMessage, setRowMessage] = useState<{ [id: string]: string }>({});
  const [editValues, setEditValues] = useState<{ [id: string]: number }>({});
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  // Fetch all cleaning times on mount
  useEffect(() => {
    const fetchCleaningTimes = async () => {
      setLoading(true);
      try {
        const data  = await getAllCleaningTimes();
        console.log(data)
        setCleaningTimes(Array.isArray(data) ? data : []);
        // Initialize edit values
        const initialEdit: { [id: string]: number } = {};
        (Array.isArray(data) ? data : []).forEach((room: CleaningTime) => {
          initialEdit[room._id] = room.cleaningTime;
        });
        setEditValues(initialEdit);
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to fetch cleaning times.' });
      } finally {
        setLoading(false);
      }
    };
    fetchCleaningTimes();
  }, []);

  // Add new cleaning time
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCleaningTime({
        name: newRoom.name,
        cleaningTime: Number(newRoom.cleaningTime)
      });
      setMessage({ type: 'success', text: 'Room added successfully!' });
      setNewRoom({ name: '', cleaningTime: '' });
      setShowAddRoomForm(false);
      // Refresh list
      const  data  = await getAllCleaningTimes();
      setCleaningTimes(Array.isArray(data) ? data : []);
      // Update edit values
      const initialEdit: { [id: string]: number } = {};
      (Array.isArray(data) ? data : []).forEach((room: CleaningTime) => {
        initialEdit[room._id] = room.cleaningTime;
      });
      setEditValues(initialEdit);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add room.' });
    }
  };

  // Update cleaning time for a room
  const handleUpdateRoom = async (id: string) => {
    setRowLoading((prev) => ({ ...prev, [id]: true }));
    setRowMessage((prev) => ({ ...prev, [id]: '' }));
    try {
      await updateCleaningTime(id, editValues[id]);
      setRowMessage((prev) => ({ ...prev, [id]: 'Updated!' }));
      // Optionally refresh list
      const { data } = await getAllCleaningTimes();
      setCleaningTimes(Array.isArray(data) ? data : []);
    } catch (err) {
      setRowMessage((prev) => ({ ...prev, [id]: 'Error updating.' }));
    } finally {
      setRowLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold text-brand-primary mb-8">Manage Booking Prices</h1>

      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Floating Add Room Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-secondary transition-colors flex items-center justify-center"
        onClick={() => setShowAddRoomForm(true)}
        title="Add New Room"
      >
        <FaPlus size={24} />
      </button>

      {/* Add New Cleaning Time Modal */}
      {showAddRoomForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowAddRoomForm(false)}
              title="Close"
            >
              <FaTimes size={20} />
            </button>
            <form onSubmit={handleAddRoom}>
              <h3 className="text-lg font-semibold mb-4">Add New Room Type</h3>
              <div className="mb-4">
                <label htmlFor="roomName" className="block text-sm font-medium text-brand-secondary mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="w-full px-3 py-2 border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="roomMinutes" className="block text-sm font-medium text-brand-secondary mb-2">
                  Cleaning Time (minutes)
                </label>
                <input
                  type="number"
                  id="roomMinutes"
                  value={newRoom.cleaningTime}
                  onChange={(e) => setNewRoom({ ...newRoom, cleaningTime: e.target.value })}
                  className="w-full px-3 py-2 border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                  min="1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-secondary transition-colors"
              >
                Add Room
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cleaning Times Editable Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Rooms & Cleaning Times</h2>
        {loading ? (
          <p>Loading...</p>
        ) : cleaningTimes.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          <form className="w-full text-sm mb-4">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left py-2">Room</th>
                  <th className="text-left py-2">Minutes</th>
                  <th className="text-left py-2">Action</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {cleaningTimes.map((room) => (
                  <tr key={room._id}>
                    <td className="py-2">{room.name}</td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={editValues[room._id]}
                        min={1}
                        onChange={e => setEditValues({ ...editValues, [room._id]: Number(e.target.value) })}
                        className="w-24 px-2 py-1 border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateRoom(room._id)}
                        disabled={rowLoading[room._id]}
                        className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-brand-secondary transition-colors"
                      >
                        {rowLoading[room._id] ? 'Updating...' : 'Update'}
                      </button>
                    </td>
                    <td className="py-2 text-xs">
                      {rowMessage[room._id] && (
                        <span className={rowMessage[room._id] === 'Updated!' ? 'text-green-600' : 'text-red-600'}>
                          {rowMessage[room._id]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        )}
      </div>

    </div>
  );
};

export default PricingManagement; 