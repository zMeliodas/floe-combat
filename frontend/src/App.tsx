import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Pages/LandingPage";
import Products from "./Components/Pages/Products";
import Footer from "./Components/Sections/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Highlights from "./Components/Pages/Highlights";
import Order from "./Components/Pages/Order";
import Reviews from "./Components/Pages/Reviews";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/order" element={<Order />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
