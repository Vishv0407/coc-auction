import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { WebSocketProvider } from "./context/WebSocketContext";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/auction/Home";
import Dashboard from "./pages/auction/Dashboard";
import TeamPage from "./pages/auction/TeamPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Scoreboard from "./pages/auction/Scoreboard";
import AdminDashboard from "./pages/auction/AdminDashboard";
import AdminLogs from "./pages/auction/AdminLogs";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import RandomBid from "./pages/auction/RandomBid";

function AppContent() {
  const location = useLocation();
  const isNotFoundPage = location.pathname !== "/" && 
    !location.pathname.startsWith("/dashboard") && 
    !location.pathname.startsWith("/scoreboard") && 
    !location.pathname.startsWith("/teams") && 
    !location.pathname.startsWith("/adminpage");

  if (isNotFoundPage) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!location.pathname.startsWith("/adminpage") && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/teams/:teamName" element={<TeamPage />} />
          <Route
            path="/adminpage"
            element={<Navigate to="/adminpage/dashboard" />}
          />
          <Route
            path="/adminpage/dashboard"
            element={
              <RequireAuth>
                <>
                  <AdminNavbar />
                  <AdminDashboard />
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/adminpage/logs"
            element={
              <RequireAuth>
                <>
                  <AdminNavbar />
                  <AdminLogs />
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/adminpage/random-bid"
            element={
              <RequireAuth>
                <>
                  <AdminNavbar />
                  <RandomBid />
                </>
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <WebSocketProvider>
        <AppContent />
      </WebSocketProvider>
    </Router>
  );
}

export default App;
