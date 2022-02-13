import { RootStateOrAny, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';

const OnlyAdmin = () => {

    const { userInfo, loading } = useSelector((state: RootStateOrAny) => state.userLogin);

    if(loading) {
        return <Loader />
    }

    return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/" />

}

export default OnlyAdmin;