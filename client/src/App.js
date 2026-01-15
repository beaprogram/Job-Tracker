import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from "./pages/Register";

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl">Dashboard</h1>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/jobs" element={<h1 className="text-3xl">Jobs Page</h1>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;