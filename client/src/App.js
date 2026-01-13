import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

function App(){
  return(
    <BrowserRouter>
      <Navbar>
        <main>
          <Routes>
            <Route path="/" element={<h1 className="text-3xl">Dashboard</h1>}/>
            <Route path="/login" element={<h1 className="text-3xl">Login Page</h1>}/>
            <Route path="/register" element={<h1 className="text-3xl">Register Page</h1>}/>
            <Route path="/jobs" element={<h1 className="text-3xl">Jobs Page</h1>}/>
          </Routes>
        </main>
      </Navbar>
    </BrowserRouter>
  )
}

export default App;