import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../api/visitors';

const VisitorTracker = () => {
  const location = useLocation();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Only track if the path has actually changed
    if (lastPathRef.current !== location.pathname) {
      lastPathRef.current = location.pathname;
      trackVisitor(location.pathname);
    }
  }, [location.pathname]);

  return null;
};

export default VisitorTracker; 