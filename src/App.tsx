import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Community } from './pages/Community';
import Notifications from './pages/Notifications';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Navbar } from "./components/Navbar";
import { FooterNav } from "./components/FooterNav";


function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <FooterNav />
    </div>
  );
}

export default App
