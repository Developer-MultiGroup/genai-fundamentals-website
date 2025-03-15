"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import FAQ from "@/components/faq";
import Heading from "@/components/heading";
import SessionContainer from "@/components/session-container";
import Speakers from "@/components/speakers";
import { getClosestSession, getLatestEvent } from "@/lib/event-utils";
import SponsorSlider from "@/components/sponsors-slider";
import Sponsors from "@/components/sponsors";
import { useEffect, useState } from "react";
import WhyJoinSection from "@/components/why-join";

// ------------------------------
// Type-safe Counter component props
interface CounterProps {
  target: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const incrementTime = 30; // interval in ms
    const totalIncrements = Math.ceil(duration / incrementTime);
    const incrementValue = end / totalIncrements;
    let currentIncrement = 0;

    const timer = setInterval(() => {
      currentIncrement++;
      const newCount = Math.min(
        Math.floor(currentIncrement * incrementValue),
        end
      );
      setCount(newCount);
      if (currentIncrement >= totalIncrements) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}+</>;
};

export default function Home() {
  const latestEventDetails = getLatestEvent();
  // const closestSessionDate = getClosestSession(latestEventDetails);

  const [minHeight, setMinHeight] = useState("100vh");

  if (!latestEventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Etkinlik bulunamadı.</p>
      </div>
    );
  }

  useEffect(() => {
    const updateMinHeight = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 700) {
        setMinHeight("600px");
      } else {
        setMinHeight("100vh");
      }
    };

    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);
    return () => window.removeEventListener("resize", updateMinHeight);
  }, []);

  // Animation variants for Gemini icon (similar to WhyJoinSection)
  const geminiIconVariants = {
    initial: { scale: 0.8, rotate: 0, opacity: 0 },
    animate: {
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 10, 0, -10, 0],
      opacity: 0.8,
      transition: {
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      },
    },
  };

  return (
    <>
      {/* Background Section with black background and centered content */}
      <div
        id="hero"
        className="relative flex flex-col items-center justify-center px-6 sm:px-12 bg-black text-white overflow-x-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Main Title - Centered */}
        <motion.div
          className="select-none text-white text-4xl sm:text-6xl font-extrabold text-center max-w-3xl mx-auto mb-16 relative"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Participant and Speaker count info for larger screens */}
          <div className="hidden sm:block text-left mb-4 text-2xl">
            {/* Only the number is wrapped in a blue span */}
            <span>
              <span className="text-[#3682F1]">
                <Counter target={500} />
              </span>{" "}
              Katılımcı{" "}
            </span>
            <span>
              <span className="text-[#3682F1]">
                <Counter target={10} />
              </span>{" "}
              Konuşmacı
            </span>
          </div>

          {/* Gemini icon positioned behind text with updated animation */}
          <motion.div
            className="absolute z-0 right-[-5%] sm:right-[-10%]"
            style={{
              top: "10%",
              transform: "translateY(-50%)",
            }}
            variants={geminiIconVariants}
            initial="initial"
            animate="animate"
          >
            <img
              src="/images/gemini-icon.svg"
              alt="Gemini Logo"
              className="w-24 sm:w-32 md:w-40 rotate-[30deg] object-contain object-center max-w-full h-auto"
            />
          </motion.div>

          <div className="relative z-10">
            GenAI Fundamentals
            <br />
            With{" "}
            <span className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">
              Gemini
            </span>
          </div>
          {/* Mobile view counts will be rendered below */}
        </motion.div>

        <div className="block sm:hidden text-center mt-8 text-2xl">
          <div>
            <span className="text-[#3682F1]">
              <Counter target={500} />
            </span>{" "}
            Katılımcı
          </div>
          <div>
            <span className="text-[#3682F1]">
              <Counter target={10} />
            </span>{" "}
            Konuşmacı
          </div>
        </div>

        {/* <CountdownTimer targetDate={closestSessionDate} /> */}

        <motion.div
          className="absolute bottom-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-white text-sm opacity-80 text-center">
            3 Mart - 22 Nisan • Developer MultiGroup @ Youtube
          </div>
        </motion.div>
      </div>

      <SponsorSlider sponsors={latestEventDetails.sponsors} />

      <div className="bg-[#F2F4F0] pt-16">
        <span id="why-join" />
        <WhyJoinSection />

        <span id="konuşmacılar" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="min-h-screen lg:flex lg:flex-col lg:items-center"
        >
          <Heading dark>Konuşmacılarımız Kimler?</Heading>
          <Speakers speakers={latestEventDetails.speakers} />
        </motion.div>

        <span id="takvim" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="min-h-screen lg:flex lg:flex-col lg:items-center"
        >
          <span id="yayınlar" />
          <Heading dark>Bootcamp Eğitim Takvimi</Heading>
          <SessionContainer event={latestEventDetails} />
        </motion.div>

        <Sponsors sponsors={latestEventDetails.sponsors} />
      </div>

      <SponsorSlider reverse sponsors={latestEventDetails.sponsors} />

      <motion.div
        id="faq"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 pt-32 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="font-extrabold text-4xl text-center text-white">
            Sıkça Sorulan Sorular
          </p>
          <FAQ />
        </div>
      </motion.div>
    </>
  );
}
