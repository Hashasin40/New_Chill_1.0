import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const user = useSelector((state) => state.user.data);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
