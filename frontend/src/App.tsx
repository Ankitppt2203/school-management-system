import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastHost } from './components/ui/Toast';
import { SiteLayout } from './components/layout/SiteLayout';
import { ProtectedRoute, RoleRoute } from './routes/ProtectedRoute';
import { ErpLayout } from './components/erp/ErpLayout';

import Home from './pages/site/Home';
import About from './pages/site/About';
import Academics from './pages/site/Academics';
import Admissions from './pages/site/Admissions';
import Achievements from './pages/site/Achievements';
import Gallery from './pages/site/Gallery';
import Events from './pages/site/Events';
import Faculty from './pages/site/Faculty';
import Contact from './pages/site/Contact';

import Login from './pages/erp/Login';
import Dashboard from './pages/erp/Dashboard';
import Students from './pages/erp/Students';
import AddStudent from './pages/erp/AddStudent'; // ✅ NEW
import Teachers from './pages/erp/Teachers';
import Departments from './pages/erp/Departments';
import Courses from './pages/erp/Courses';
import Attendance from './pages/erp/Attendance';
import Exams from './pages/erp/Exams';
import Results from './pages/erp/Results';
import Profile from './pages/erp/Profile';
import Settings from './pages/erp/Settings';
import Enquiries from './pages/erp/Enquiries';

import ChangePassword from './pages/auth/ChangePassword';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/academics', element: <Academics /> },
      { path: '/admissions', element: <Admissions /> },
      { path: '/achievements', element: <Achievements /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/events', element: <Events /> },
      { path: '/faculty', element: <Faculty /> },
      { path: '/contact', element: <Contact /> },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/app',
        element: <ErpLayout />,
        children: [
          // Dashboard
          { index: true, element: <Dashboard /> },

          // Students
          { path: 'students', element: <RoleRoute roles={['admin']}><Students /></RoleRoute> },
          { path: 'students/new', element: <RoleRoute roles={['admin']}><AddStudent /></RoleRoute> }, // ✅ NEW

          // Teachers
          { path: 'teachers', element: <RoleRoute roles={['admin']}><Teachers /></RoleRoute> },

          // Departments
          { path: 'departments', element: <RoleRoute roles={['admin', 'teacher']}><Departments /></RoleRoute> },

          // Courses
          { path: 'courses', element: <RoleRoute roles={['admin', 'teacher']}><Courses /></RoleRoute> },

          // Attendance
          { path: 'attendance', element: <Attendance /> },

          // Exams
          { path: 'exams', element: <Exams /> },

          // Results
          { path: 'results', element: <Results /> },

          // Website enquiries
          { path: 'enquiries', element: <RoleRoute roles={['admin']}><Enquiries /></RoleRoute> },

          // Profile
          { path: 'profile', element: <Profile /> },

          // Settings
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Login />,
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastHost />
      </AuthProvider>
    </ThemeProvider>
  );
}
