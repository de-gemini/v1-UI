import React from 'react';
import mopGif from '../assets/images/Services/mopGif.gif';

interface StackedPagesLoaderProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const StackedPagesLoader: React.FC<StackedPagesLoaderProps> = ({ text = 'Loading...', fullScreen = false, className = '' }) => {
  const loader = (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ minWidth: 120, minHeight: 120 }}>
      <img
        src={mopGif}
        alt="Loading animation"
        className="w-24 h-24 object-contain mb-4"
        draggable={false}
      />
      {text && (
        <div className="text-brand-primary font-semibold text-base tracking-wide animate-pulse text-center">
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {loader}
      </div>
    );
  }
  return loader;
};

export default StackedPagesLoader;
