import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Supabase setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [userId, setUserId] = useState(null);

  // Generate and store a unique user ID in localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      const newUserId = Math.floor(Math.random() * 100000);
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage supabase={supabase} userId={userId} />} />
            <Route path='/create-post' element={<CreatePostPage supabase={supabase} />} />
            <Route path='/edit-post/:id' element={<EditPostPage supabase={supabase} />} />
            <Route
              path='/post/:id'
              element={<PostDetailPage supabase={supabase} userId={userId} />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
