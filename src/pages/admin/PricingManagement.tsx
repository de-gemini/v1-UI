import { useState, useEffect } from 'react';
import { getAllCleaningTimes, createCleaningTime, updateCleaningTime } from '../../api/cleaningTimes';
import { FaPlus, FaTimes, FaTrash, FaEllipsisV, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import {Header} from './components/Header.tsx'
import { useCleaningTimesStore } from '../../store/cleaningTimesStore';

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
  const {
    cleaningTimes,
    loading,
    showAddRoomForm,
    rowLoading,
    rowMessage,
    editValues,
    message,
    fetchCleaningTimes,
    addCleaningTime,
    updateCleaningTimeValue,
    deleteCleaningTimeValue,
    setShowAddRoomForm,
    setEditValue,
    clearMessage,
  } = useCleaningTimesStore();

  const [formData, setFormData] = useState<PriceForm>({
    serviceType: '',
    price: 0
  });
  const [newRoom, setNewRoom] = useState({ name: '', cleaningTime: '' });
  const [actionDropdown, setActionDropdown] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fetch all cleaning times on mount
  useEffect(() => {
    fetchCleaningTimes();
  }, [fetchCleaningTimes]);

  // Add new cleaning time
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCleaningTime({
        name: newRoom.name,
        cleaningTime: Number(newRoom.cleaningTime)
      });
      clearMessage();
      setNewRoom({ name: '', cleaningTime: '' });
      setShowAddRoomForm(false);
    } catch (err) {
      console.error('Failed to add room:', err);
    }
  };

  return (
    <div className="p-6 relative ">
      
      <Header head="Manage estimated cleaning time" subtitle="Edit, delete, update and add new cleaning times"/>
    

      {/* {message && (
        <div className={`p-4 mb-6 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )} */}

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
                <label htmlFor="roomName" className="block text-sm font-medium text-brand-primary mb-2">
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
                <label htmlFor="roomMinutes" className="block text-sm font-medium text-brand-primary mb-2">
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
      <div className="my-8">
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
                        onChange={(e) => setEditValue(room._id, Number(e.target.value))}
                        className="w-24 px-2 py-1 border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </td>
                    <td className="py-2 relative">
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-background-200"
                        onClick={() => setActionDropdown(actionDropdown === room._id ? null : room._id)}
                        title="Actions"
                      >
                        <FaEllipsisV />
                      </button>
                      {/* Dropdown */}
                      {actionDropdown === room._id && (
                        <div className="absolute z-10 right-0 mt-2 w-28 bg-white border border-background-300 rounded shadow-lg flex flex-col">
                          <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-background-100 text-brand-primary"
                            onClick={() => {
                              setActionDropdown(null);
                              updateCleaningTimeValue(room._id, Number(editValues[room._id]));
                            }}
                          >
                            <FaEdit /> Save
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600"
                            onClick={() => {
                              setActionDropdown(null);
                              setConfirmDeleteId(room._id);
                            }}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative flex flex-col items-center">
            <div className="mb-4">
              <img src="/assets/images/trash.png" alt="Trash" className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Are you sure you want to delete this room?</h3>
            <p className="mb-6 text-center text-gray-500">{cleaningTimes.find(r => r._id === confirmDeleteId)?.name}</p>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 rounded bg-background-200 text-brand-primary hover:bg-background-300"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={async () => {
                  await deleteCleaningTimeValue(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                disabled={rowLoading[confirmDeleteId]}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManagement; 