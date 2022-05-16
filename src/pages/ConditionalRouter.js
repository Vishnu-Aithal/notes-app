import { Route, Routes, Navigate } from "react-router-dom";
import App from "App";
import {
    NotesPage,
    ProfilePage,
    ArchivesPage,
    LabelsPage,
    TrashPage,
    HomePage,
    AuthPage,
} from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute, ProtectedAuth } from "./Protected";
import { useEffect } from "react";
import { restoreLogin } from "store/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const ConditionalRouter = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    const dispatch = useDispatch();
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            dispatch(restoreLogin(JSON.parse(userData)));
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to={"/home"} replace />} />
                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                        <Route path="notes" element={<NotesPage />} />
                        <Route path="archives" element={<ArchivesPage />} />
                        <Route path="labels" element={<LabelsPage />} />
                        <Route path="labels/:label" element={<LabelsPage />} />
                        <Route path="trash" element={<TrashPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Route>
                <Route element={<ProtectedAuth isLoggedIn={isLoggedIn} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/sign-in" element={<AuthPage />} />
                    <Route path="/sign-up" element={<AuthPage />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkTheme ? "dark" : "light"}
            />
        </>
    );
};
