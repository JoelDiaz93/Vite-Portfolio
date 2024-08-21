import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#1E1B18] relative z-0">
        <div className="bg-cover bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Works />
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;
