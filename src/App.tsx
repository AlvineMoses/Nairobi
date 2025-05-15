import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
// import Nav from "./components/Nav/Nav";
import "./App.css";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register the ScrollTrigger and ScrollSmoother plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  // Fix the ref types
  const smoother = useRef<ScrollSmoother | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  // Initialize ScrollSmoother with useGSAP
  useGSAP(() => {
    if (wrapper.current && content.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.5,
        effects: true,
      });
    }
  }, []);

  // Keep Lenis initialization in useEffect
  useEffect(() => {
    // Initialize Lenis for smooth scrolling with updated package
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // RAF for Lenis - fix the any type
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation frame
    requestAnimationFrame(raf);

    return () => {
      // Cleanup
      lenis.destroy();
      // Use optional chaining to avoid null error
      smoother.current?.kill();
    };
  }, []);

  return (
    <div ref={wrapper} className="smooth-wrapper">
      <div ref={content} className="smooth-content">
        <BrowserRouter>
          <div className="app-container">
            {/* <Nav /> */}

            <Routes>
              <Route path="/" element={<Otp />} />
              <Route path="/otp" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
