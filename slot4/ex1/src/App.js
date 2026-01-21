import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/HeroCarousel";
import Menu from "./components/Menu";
import Booking from "./components/Booking";
import AboutUs from "./pages/AboutUs";
import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <Booking />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark min-vh-100">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          {/* fallback nếu gõ sai url */}
          <Route
            path="*"
            element={
              <div className="text-white text-center p-5">
                404 – Page not found
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
