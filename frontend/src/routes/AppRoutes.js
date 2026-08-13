import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WriteLetterPage from "../pages/letters/WriteLetterPage";
import LetterDetailsPage from "../pages/letters/LetterDetailsPage";
import EditLetterPage from "../pages/letters/EditLetterPage";
import CreateMemoryPage from "../pages/memories/CreateMemoryPage";
import SaySomethingPage from "../pages/saySomething/SaySomethingPage";
import LoginPage from "../pages/auth/Login/LoginPage";
import MemoriesPage from "../pages/memories/MemoriesPage";
import LettersPage from "../pages/letters/LettersPage";
import QuestionsPage from "../pages/questions/QuestionsPage";
import RegisterPage from "../pages/auth/Register/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MoodsPage from "../pages/moods/MoodsPage";
import MoodThemePage from "../pages/moods/MoodThemePage";
import ProfilePage from "../pages/profile/ProfilePage";
import TimelinePage from "../pages/timeline/TimelinePage";
import NotificationPage from "../pages/notifications/NotificationPage";

import MyAnswersPage from "../pages/moods/MyAnswersPage";
import PartnerAnswersPage from "../pages/moods/PartnerAnswersPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import CoupleInvitationPage from "../pages/CoupleInvitation/CoupleInvitationPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected */}

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/moods" element={<MoodsPage />} />

          <Route path="/moods/:moodId" element={<MoodThemePage />} />
          <Route path="/moods/:moodId/card" element={<QuestionsPage />} />
          <Route path="/moods/:moodId/my-answers" element={<MyAnswersPage />} />
          <Route path="/moods/:moodId/partner-answers" element={<PartnerAnswersPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/memories" element={<MemoriesPage />} />

          <Route path="/letters" element={<LettersPage />} />
          <Route path="/letters/write" element={<WriteLetterPage />} />
          <Route path="/letters/:id" element={<LetterDetailsPage />} />
          <Route path="/letters/:id/edit" element={<EditLetterPage />} />

          <Route path="/questions" element={<QuestionsPage />} />

          <Route path="/notifications" element={<NotificationPage />} />

          <Route path="/couple-invitation" element={<CoupleInvitationPage />} />

          <Route path="/memories/create" element={<CreateMemoryPage />} />

          <Route path="/say-something" element={<SaySomethingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
