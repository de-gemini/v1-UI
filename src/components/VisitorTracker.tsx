import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../api/visitors';

const VisitorTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackVisitor(location.pathname);
  }, [location]);
  return null;
};

export default VisitorTracker; 