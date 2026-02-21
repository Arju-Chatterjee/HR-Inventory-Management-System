import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';

interface PublicRouteProps {
    children: React.ReactElement;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(selectUser);

    // Check if Redux Persist has rehydrated
    const _persist = useAppSelector((state: any) => state._persist);

    // Show loading while rehydrating
    if (!_persist?.rehydrated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // After rehydration, check if already logged in
    if (isAuthenticated && user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
