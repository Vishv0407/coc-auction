import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WebSocketProvider } from "./context/WebSocketContext";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import TeamPage from "./pages/TeamPage";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Scoreboard from "./pages/Scoreboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogs from "./pages/AdminLogs";
import RequireAuth from "./components/RequireAuth";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/adminpage');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/teams/:teamName" element={<TeamPage />} />
          <Route path="/adminpage" element={<Navigate to="/adminpage/dashboard" />} />
          <Route 
            path="/adminpage/dashboard" 
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="/adminpage/logs" 
            element={
              <RequireAuth>
                <AdminLogs />
              </RequireAuth>
            } 
          />
        </Routes>
      </div>
    
      <Footer />
          <Toaster 
            position="top-right"
          />
        </div>
  );
}

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <AppContent />
      </Router>
    </WebSocketProvider>
  );
}

export default App;