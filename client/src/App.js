import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/add" element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            } />
            <Route path="/jobs/edit/:id" element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;