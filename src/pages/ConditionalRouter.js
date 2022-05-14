import { Route, Routes, Navigate } from "react-router-dom";
import App from "App";
import {
    NotesPage,
    ProfilePage,
    ArchivesPage,
    LabelsPage,
    TrashPage,
    HomePage,
    SignInPage,
    SignUpPage,
} from "./Routes";
export const ConditionalRouter = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to={"/home"} replace />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="archives" element={<ArchivesPage />} />
                <Route path="labels" element={<LabelsPage />} />
                <Route path="labels/:label" element={<LabelsPage />} />
                <Route path="trash" element={<TrashPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
    );
};
