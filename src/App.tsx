import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Community } from './pages/Community';
import Notifications from './pages/Notifications';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';


function App() {


  return (
    <div className="app-container">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/" element={<Home />} /> {/* Optional default */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
