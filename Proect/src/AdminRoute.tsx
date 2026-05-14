import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import type { JSX } from 'react';

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated || user?.role?.toLowerCase() !== 'admin') {
        return <Navigate to="/admin" replace />;
    }
    return children;
};