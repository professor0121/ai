import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token || !user) {
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return <>Loading...</>;
    }

    return <>{children}</>;
};

export default UserAuth;
