import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App(){
  return(
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Navbar/>
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }/>
                <Route path="/jobs" element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                }/>
                <Route path="/jobs/add" element={
                  <ProtectedRoute>
                    <AddJob />
                  </ProtectedRoute>
                }/>
                <Route path="/jobs/edit/:id" element={
                  <ProtectedRoute>
                    <EditJob />
                  </ProtectedRoute>
                }/>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;