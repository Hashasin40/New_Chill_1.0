import useAuth from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
        <h2>Dashboard</h2>
        <p>Halo, {user?.username || 'User'}!</p>
        <p>Email: {user?.email || 'Email'}</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
