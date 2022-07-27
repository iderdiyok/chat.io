import './App.css';
import { useState } from 'react'
import { BrowserRouter, Routes, Route , useNavigate} from "react-router-dom";
import StartPage from './Pages/StartPage';
import AuthRequired from './Components/AuthRequired'
import Home from './Pages/Home'
import Registration from './Pages/Registration'
import { user } from './hooks/user';

function App() {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  const loginSuccess = (token) => {
    setToken(token)
    navigate("/home")
  }

  const userInfo = user(token)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage loginSuccess={loginSuccess} />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/home"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Home token={token} userInfo={userInfo}/>
            </AuthRequired>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
