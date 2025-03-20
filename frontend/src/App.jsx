import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Reviews from "./pages/Reviews";
import Register from "./pages/Register";
import WebsiteLayout from "./WebsiteLayout";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebsiteLayout><Home /></WebsiteLayout>} />
          <Route path="/about" element={<WebsiteLayout><About /></WebsiteLayout>} />
          <Route path="/feedback" element={<WebsiteLayout><Feedback /></WebsiteLayout>} />
          <Route path="/reviews" element={<WebsiteLayout><Reviews /></WebsiteLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ToastContainer />
              <Dashboard />
            
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
