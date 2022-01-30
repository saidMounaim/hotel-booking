import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Loader from './Loader';

const ProtectedRoute = () => {

    const { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <Loader />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/" />

}

export default ProtectedRoute;