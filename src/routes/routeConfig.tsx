
import { Navigate } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PendingList from "../pages/Admin/PendingList";
import UserDashboard from "../pages/User/UserDashboard";
import QuestionsList from "../pages/Questions/QuestionsList";
import QuestionWithAnswers from "../pages/Questions/QuestionWithAnswers";
import QuestionPostPending from "../pages/Questions/QuestionPostPending";
import MyQuestionsList from "../pages/Questions/MyQuestionsList";
import MyAnswersList from "../pages/Answers/MyAnswersList";
import { RoleConstants } from "../types/RoleConstants";


/**
 * Configuration for protected routes in the application.
 * Each route is associated with a specific role and contains nested routes.
 */
export const protectedRoutes = [
  {
    path: "admin",
    role: RoleConstants.ADMIN,
    routes: [
      { path: '', element: <Navigate to="home" /> }, // Redirects to the employee home page.
      { path: "home", element: <AdminDashboard /> },
      { path: "pending-list", element: <PendingList /> },
      { path: "users-list", element: <AdminDashboard /> },
      { path: "questions-list", element: <QuestionsList /> },
      { path: "questions-list/:id", element: <QuestionWithAnswers /> },
      { path: "question-post-pending-list", element: <QuestionPostPending /> },
      { path: "my-questions", element: <MyQuestionsList /> },
      { path: "my-questions/:id", element: <QuestionWithAnswers /> },
      { path: "my-answers", element: <MyAnswersList /> },
    ],
  },

  {
    path: "user",
    role: RoleConstants.USER,
    routes: [
      { path: '', element: <Navigate to="home" /> },
      { path: "home", element: <UserDashboard /> },
      { path: "questions-list", element: <QuestionsList /> },
      { path: "questions-list/:id", element: <QuestionWithAnswers /> },
      { path: "my-questions", element: <MyQuestionsList /> },
      { path: "my-answers", element: <MyAnswersList /> },
    ],
  },
];
