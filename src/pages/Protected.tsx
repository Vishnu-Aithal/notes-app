import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedProps {
    isLoggedIn: boolean;
}

export const ProtectedRoute: React.FC<ProtectedProps> = ({ isLoggedIn }) => {
    const location = useLocation();
    if (isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" state={{ from: location.pathname }} />;
    }
};

export const ProtectedAuth: React.FC<ProtectedProps> = ({ isLoggedIn }) => {
    const locationState = useLocation().state as { from?: string };
    const from = locationState?.from;
    if (isLoggedIn) {
        return <Navigate to={`${from ? from : "/notes"} `} />;
    } else {
        return <Outlet />;
    }
};
