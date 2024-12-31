import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from './config/firebase';
import BlockRevealer from './components/BlockRevealer/BlockRevealer';
import MatatuCard from './components/MatatuCard/MatatuCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import Shop from './pages/Shop';
import GrooveTrips from './pages/GrooveTrips';
import Hire from './pages/Hire';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  const [matatus, setMatatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatatus = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'matatus'));
        const matatuData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMatatus(matatuData);
      } catch (error) {
        console.error('Error fetching matatus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatatus();
  }, []);

  const handleVote = async (matatuId) => {
    try {
      const matatuRef = doc(db, 'matatus', matatuId);
      await updateDoc(matatuRef, {
        votes: increment(1)
      });
      
      setMatatus(prevMatatus => 
        prevMatatus.map(matatu => 
          matatu.id === matatuId 
            ? { ...matatu, votes: matatu.votes + 1 }
            : matatu
        )
      );
    } catch (error) {
      console.error('Error voting for matatu:', error);
    }
  };

  const handleRate = async (matatuId) => {
    // Implement rating logic
    console.log('Rating matatu:', matatuId);
  };

  if (loading) {
    return (
      <div className="app app--loading">
        <BlockRevealer
          direction="lr"
          bgcolor="#7f40f1"
          delay={300}
        >
          <h1>Loading Matatus...</h1>
        </BlockRevealer>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen mx-auto bg-background text-foreground">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/groove-trips" element={<GrooveTrips />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
