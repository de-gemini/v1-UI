import { useEffect } from 'react';
import { useErrorStore } from '../store/errorStore';

const SuccessAlert = () => {
  const { successMessage, clearSuccess } = useErrorStore();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccess]);

  if (!successMessage) return null;
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg flex items-center gap-4">
      <span>{successMessage}</span>
      <button onClick={clearSuccess} className="ml-4 text-green-700 font-bold">&times;</button>
    </div>
  );
};

export default SuccessAlert; 