import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import back4 from "../assets/images/bac4.png";

// Team images
import ProfileHarshal from "../assets/images/profilelogo4.jpg";
import ProfileGopal from "../assets/images/profilelogo2.jpg";
import ProfileRupesh from "../assets/images/profilelogo3.jpg";

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
      <section className="relative z-20 flex flex-col items-center max-w-[1300px] mx-auto px-4 pt-28 md:pt-32 lg:pt-32 pb-20 w-full">

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
          About <span style={{ color: "#00a86b" }}>Us</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-green-100 text-base sm:text-lg md:text-xl max-w-2xl text-center mb-12 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Transforming travel experiences with creativity, innovation, and passion.
          Travely makes every journey unforgettable.
        </motion.p>

        {/* Feature Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14 px-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.7 } },
          }}
        >
          {[
            "Trusted Experts",
            "Personalized Service",
            "Seamless Planning",
            "Cultural Experiences",
          ].map((feature, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-sm sm:text-base font-semibold rounded-full cursor-pointer select-none border border-green-700/50 shadow-md"
              style={{
                background: DARK_CARD_BG,
                color: PREMIUM_ACCENT_GREEN,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        {/* TEAM TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-10 text-center drop-shadow-md"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#e3f7e3",
            lineHeight: "1.0",
          }}
        >
          Meet Our <span style={{ color: "#00a86b" }}>Core Team</span>
        </motion.h2>

        {/* Team Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
          }}
        >
          {[
            { img: ProfileHarshal, name: "Harshal Patil", role: "Frontend Developer" },
            { img: ProfileGopal, name: "Gopal Patil", role: "Backend Developer" },
            { img: ProfileRupesh, name: "Rupesh Pawar", role: "UI/UX Designer" },
          ].map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.04, y: -4 }}
              className="flex flex-col items-center text-green-100 p-6 rounded-xl"
              style={{
                background: "rgba(18, 55, 42, 1)",
                border: `1px solid ${PREMIUM_ACCENT_GREEN}30`,
              }}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 rounded-full overflow-hidden profile-container">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>

              <h3
                className="font-bold text-lg sm:text-xl text-center"
                style={{ fontFamily: "'Cinzel', serif", color: PREMIUM_ACCENT_GREEN }}
              >
                {member.name}
              </h3>

              <p
                className="text-sm sm:text-base text-green-300 mt-1 text-center"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {member.role}
              </p>
            </motion.div>
          ))}
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
