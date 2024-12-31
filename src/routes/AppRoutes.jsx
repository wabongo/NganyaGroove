import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import GrooveTrips from '../pages/GrooveTrips';
import Gallery from '../pages/Gallery';
import Events from '../pages/Events';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/groove-trips" element={<GrooveTrips />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default AppRoutes;
