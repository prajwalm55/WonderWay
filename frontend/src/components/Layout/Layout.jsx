import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../router/Router";

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 200;

const Layout = ({ triggerLoader }) => {
  const [hideAll, setHideAll] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHideAll(false), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main
        style={{
          flex: "1 0 auto",
          minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          opacity: hideAll ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Router triggerLoader={triggerLoader} />
      </main>

      <Footer style={{ flexShrink: 0 }} />
    </div>
  );
};

export default Layout;
