import React from 'react';

interface ModalAction {
  label: string;
  onClick: () => void;
  className?: string;
}

interface AuthModalProps {
  title: string;
  message: string;
  actions: ModalAction[];
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ title, message, actions, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        )}
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
        <p className="mb-6 text-center text-gray-700">{message}</p>
        <div className="flex justify-center gap-4">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={
                action.className ||
                'px-4 py-2 rounded bg-brand-primary text-white font-semibold hover:bg-brand-primary/80 transition'
              }
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 