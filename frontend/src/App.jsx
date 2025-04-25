import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function LogOut() {
  // clears refresh / access tokens and returns to login page
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  // makes sure old access tokens aren't sent during registration
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path ="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<LogOut />}/>
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
