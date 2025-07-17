import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variantClasses = {
    primary: 'border-brand-primary',
    secondary: 'border-gray-400',
    white: 'border-white',
  };

  const textColorClasses = {
    primary: 'text-brand-primary',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full animate-spin ${variantClasses[variant]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`mt-3 text-sm font-medium ${textColorClasses[variant]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Page Loading Component
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading page...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" text={text} />
  </div>
);

// Inline Loading Component
export const InlineLoader: React.FC<{ text?: string; size?: 'sm' | 'md' }> = ({ 
  text = 'Loading...', 
  size = 'sm'}) => (
  <LoadingSpinner size={size} text={text} />
);

// Button Loading Component
export const ButtonLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center space-x-2">
    <LoadingSpinner size="sm" variant="white" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

// Overlay Loading Component
export const OverlayLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-10">
    <LoadingSpinner size="md" text={text} />
  </div>
);

export default LoadingSpinner; 