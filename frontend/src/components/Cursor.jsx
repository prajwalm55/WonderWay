import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./Cursor.css";

const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
    if (mobile) setVisible(false);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const hideCursor = () => setVisible(false);
    const showCursor = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY, isMobile]);

  // Hover effect
  useEffect(() => {
    if (isMobile) return;

    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    const elements = document.querySelectorAll("a, button, .hover-target");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className={`custom-cursor ${visible ? "visible" : "hidden"} ${
        hovered ? "hover" : ""
      }`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    />
  );
};

export default Cursor;
