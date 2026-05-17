import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { signInSuccess } from './app/user/userSlice';
import { useDispatch } from 'react-redux';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const checkSessionAndLoadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          // FIXED: Changed path from /api/user/profile to /api/webhooks/profile
          const res = await fetch(`/api/webhooks/profile/${session.user.email}`);
          const databaseUser = await res.json();
          
          if (databaseUser.success !== false) {
            dispatch(signInSuccess(databaseUser));
          }
        } catch (err) {
          console.error("Failed to load user profile from MongoDB database:", err);
        }
      }
    };

    checkSessionAndLoadData();
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;