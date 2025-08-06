import { useEffect } from 'react';
import { useErrorStore } from '../store/errorStore';

const ErrorAlert = () => {
  const { errorMessage, clearError } = useErrorStore();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearError]);

  if (!errorMessage) return null;

  return (
    <div className="fixed z-[99999999999] top-6 left-1/2 transform -translate-x-1/2  bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded shadow-lg flex items-center w-full gap-4">
      <span>{errorMessage}</span>
      <button onClick={clearError} className="ml-4 text-orange-700 font-bold">&times;</button>
    </div>
  );
};

export default ErrorAlert;
