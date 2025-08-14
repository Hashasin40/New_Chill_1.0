import { Navigate } from 'react-router-dom';
import useAuth from '../store/auth';

function RequireAuth({ children }) {
    const user = useAuth((state) => state.user);

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default RequireAuth;
