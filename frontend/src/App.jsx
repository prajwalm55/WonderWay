import React, { useState, useEffect, useRef } from "react";
import Layout from "./components/Layout/Layout";
import Cursor from "./components/Cursor";
import PremiumLoader from "./components/Loader/PremiumLoader";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const layoutRef = useRef(null);

  const startLoader = () => {
    setLoading(true);
    if (layoutRef.current) layoutRef.current(true);

    setTimeout(() => {
      setLoading(false);
      if (layoutRef.current) layoutRef.current(false);
    }, 1200);
  };

  useEffect(() => {
    startLoader();
  }, []);

  return (
    <>
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={2500}
        transition={Slide}
      />

      {loading && <PremiumLoader text="Loading..." />}

      <div
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Layout triggerLoader={(cb) => (layoutRef.current = cb)} />
        <Cursor />
      </div>
    </>
  );
}

export default App;
