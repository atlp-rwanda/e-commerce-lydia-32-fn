import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from './../slices/authSlice/authSlice';
import { isTokenExpired } from '../utils/cryptoUtils';

const useCheckAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const logState = localStorage.getItem('logState');

        if (logState && isTokenExpired(logState)) {
            dispatch(logOut());
        }
    }, [dispatch]);
};

export default useCheckAuth;
