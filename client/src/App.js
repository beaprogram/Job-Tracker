import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <main className="container mx-auto p-4">
          <Routes> ß
            <Route path="/" element={<h1 className="text-3xl">Dashboard</h1>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/jobs" element={<Jobs />}/>
            <Route path="/jobs/add" element={<AddJob />}/>
            <Route path="/jobs/edit/:id" element={<EditJob />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;