import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Home } from './pages/Home';
import { AuthForm } from './components/AuthForm';
import { Generator } from './pages/Generator';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/generator" /> : <AuthForm />} 
        />
        <Route 
          path="/generator" 
          element={user ? <Generator /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;