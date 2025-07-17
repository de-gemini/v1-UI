import React from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface ModalAction {
  label: string;
  onClick: () => void;
  className?: string;
}

interface AuthModalProps {
  title?: string;
  message?: string;
  actions: ModalAction[];
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ title, message, actions, onClose }) => {
  // Map button labels to icons
  const getIcon = (label: string) => {
    if (label.toLowerCase().includes('login')) return <FaSignInAlt className="inline mr-2 mb-1" />;
    if (label.toLowerCase().includes('signup') || label.toLowerCase().includes('register')) return <FaUserPlus className="inline mr-2 mb-1" />;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full px-8 py-10 relative flex flex-col items-center animate-fade-in">
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-brand-primary text-2xl font-bold rounded-full transition p-1 bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
            aria-label="Close"
            style={{ lineHeight: 1 }}
          >
            &times;
          </button>
        )}
        <h2 className="text-2xl font-extrabold mb-3 text-brand-primary text-center tracking-tight">Please login.</h2>
        <p className="mb-8 text-center text-gray-600 text-base leading-relaxed">You need to be logged in to continue. Please login or sign up to proceed with your booking.</p>
        <div className="flex flex-row justify-center gap-4 w-full">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={
                action.className ||
                'w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-primary/80 transition text-base shadow-sm flex items-center justify-center'
              }
              onClick={action.onClick}
            >
              <span className="flex items-center justify-center w-full">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default AuthModal; 