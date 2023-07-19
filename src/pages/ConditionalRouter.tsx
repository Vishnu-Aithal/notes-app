import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "App";
import {
    NotesPage,
    ArchivesPage,
    TagsPage,
    TrashPage,
    HomePage,
    AuthPage,
    KanbanPage,
} from "./Routes";
import { ProtectedRoute, ProtectedAuth } from "./Protected";

import { restoreLogin } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

export const ConditionalRouter: React.FC = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const userData = localStorage.getItem("user");
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
                        <Route
                            path="tags"
                            element={<Navigate to="/tags/ALL" />}
                        />
                        <Route path="tags/:tag" element={<TagsPage />} />
                        <Route path="trash" element={<TrashPage />} />
                        <Route path="kanban" element={<KanbanPage />} />
                    </Route>
                </Route>
                <Route element={<ProtectedAuth isLoggedIn={isLoggedIn} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/sign-in" element={<AuthPage />} />
                    <Route path="/sign-up" element={<AuthPage />} />
                </Route>
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={750}
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
