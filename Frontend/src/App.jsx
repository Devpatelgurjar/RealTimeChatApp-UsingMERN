import React, { useEffect } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage.jsx';
import SingUpPage from './pages/SingUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Room from './Screens/Room.jsx'
import { Loader,} from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme}= useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[]);


  if(!authUser && isCheckingAuth){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div data-theme={theme} >
     <Navbar/>

<div>
    <Routes>

      <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>} />
      <Route path="/login" element={ !authUser ? <LoginPage/> :<Navigate to="/"/>} />
      <Route path="/singup" element={ !authUser ? <SingUpPage/> : <Navigate to="/"/>} />
      <Route path="/profile" element={ authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
      <Route path="/setting" element={<SettingPage/>}/>
      <Route path="/room" element={<Room/>}/>

    </Routes>
</div>

    <Toaster/>
        
    </div>
  )
}

export default App
