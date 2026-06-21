import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Pages/LandingPage";
import Products from "./Components/Pages/Products";
import Highlights from "./Components/Pages/Highlights";
import Order from "./Components/Pages/Order";
import Reviews from "./Components/Pages/Reviews";
import Footer from "./Components/Sections/Footer";
import AdminPanel from "./admin/AdminPanel";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      <ScrollToTop />

      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/order" element={<Order />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
