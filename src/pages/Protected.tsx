import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn }) => {
    const location = useLocation();
    if (isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" state={{ from: location.pathname }} />;
    }
};

export const ProtectedAuth = ({ isLoggedIn }) => {
    const location = useLocation();
    const from = location.state?.from;
    if (isLoggedIn) {
        return <Navigate to={`${from ? from : "/notes"} `} />;
    } else {
        return <Outlet />;
    }
};
