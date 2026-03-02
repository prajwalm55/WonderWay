import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import back4 from "../assets/images/bac4.png";

// Profile image (ONLY YOU)
import ProfileHarshal from "../assets/images/my-photo-v2.png";

// --- THEME CONSTANTS ---
const PREMIUM_ACCENT_GREEN = "#6ee7b7";
const DARK_GREEN_BG = "#00291e";
const DARK_CARD_BG = "#004d33";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <PageWrapper>
      {/* Fixed Background */}
      <section
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: DARK_GREEN_BG,
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />

      {/* CONTENT */}
      <section className="relative z-20 flex flex-col items-center max-w-[1300px] mx-auto px-4 pt-28 md:pt-32 pb-20 w-full">
        {/* MAIN TITLE */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-6 text-center drop-shadow-md"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#e3f7e3",
            lineHeight: "1.2",
          }}
        >
          About <span style={{ color: "#00a86b" }}>Project</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-green-100 text-base sm:text-lg md:text-xl max-w-2xl text-center mb-14 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Travely is a complete travel booking platform designed and developed
          as a solo project with a strong focus on performance, security, and a
          premium user experience.
        </motion.p>

        {/* FEATURE TAGS */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 px-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.7 },
            },
          }}
        >
          {["Solo Project", "Full Stack", "Secure Payments", "Modern UI"].map(
            (feature, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 text-sm sm:text-base font-semibold rounded-full cursor-pointer select-none border border-green-700/50 shadow-md"
                style={{
                  background: DARK_CARD_BG,
                  color: PREMIUM_ACCENT_GREEN,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {feature}
              </motion.span>
            )
          )}
        </motion.div>

        {/* CREATOR TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-10 text-center drop-shadow-md"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#e3f7e3",
            lineHeight: "1.0",
          }}
        >
          Project <span style={{ color: "#00a86b" }}>Creator</span>
        </motion.h2>

        {/* SINGLE CREATOR CARD */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
          whileHover={{ scale: 1.03, y: -4 }}
          className="flex flex-col items-center text-green-100 p-8 md:p-10 rounded-2xl 
             w-full sm:w-[420px] md:w-[520px]"
          style={{
            background: "rgba(18, 55, 42, 0.95)",
            border: `1px solid ${PREMIUM_ACCENT_GREEN}40`,
          }}
        >
          <div className="relative w-32 h-32 md:w-36 md:h-36 mb-5 rounded-full overflow-hidden profile-container">
            <img
              src={ProfileHarshal}
              alt="Harshal Patil"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>

          <h3
            className="font-bold text-xl md:text-2xl text-center"
            style={{
              fontFamily: "'Cinzel', serif",
              color: PREMIUM_ACCENT_GREEN,
            }}
          >
            Harshal Patil
          </h3>

          <p
            className="text-green-300 mt-2 text-center text-sm md:text-base max-w-xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Full Stack Developer & Project Owner
            <br />
            Built Travely as a solo project.
          </p>
        </motion.div>
      </section>

      {/* Border Animation */}
      <style>{`
        html, body {
          background-color: ${DARK_GREEN_BG} !important;
        }

        .profile-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 3px;
          background: linear-gradient(90deg, ${PREMIUM_ACCENT_GREEN}, #00a86b, ${PREMIUM_ACCENT_GREEN});
          background-size: 200% 200%;
          animation: move-border 2s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }

        @keyframes move-border {
          0% { background-position: 0 0; }
          50% { background-position: 200% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default About;
