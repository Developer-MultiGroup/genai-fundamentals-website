"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/countdown-timer";
import {
  getLatestEvent,
  getClosestSession,
  getClosestUpcomingSession,
} from "@/lib/event-utils";
import { Sparkles, Ghost, Home, Coffee } from "lucide-react";
import events from "@/data/events";

export default function NotFound() {
  const router = useRouter();
  const latestEventDetails = getLatestEvent();
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number }>
  >([]);

  // Generate stars for the background
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(newStars);
  }, []);

  const handleRoute = () => {
    router.push("/");
  };

  const handleNumberClick = () => {
    setClickCount((prev) => prev + 1);

    // After 5 clicks, show the easter egg
    if (clickCount === 4) {
      setShowEasterEgg(true);
    }
  };

  const closestSessionDate = getClosestUpcomingSession(events);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 to-black">
      {/* Animated stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "white",
            opacity: star.opacity,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}

      {/* Floating ghost animation */}
      <div className="absolute animate-bounce duration-1000 opacity-20 top-10 md:top-20 right-10 md:right-20">
        <Ghost size={40} className="text-white md:hidden" />
        <Ghost size={80} className="text-white hidden md:block" />
      </div>

      {/* 404 with click interaction */}
      <div
        onClick={handleNumberClick}
        className="relative cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <p
          style={{ fontFamily: "TanNimbus" }}
          className="select-none flex justify-center align-middle text-white text-7xl md:text-9xl text-center leading-relaxed"
        >
          404
        </p>
        {clickCount > 0 && 5 - clickCount > 0 && (
          <div className="absolute -top-4 -right-4 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold">
            {5 - clickCount}
          </div>
        )}
        <Sparkles
          className="absolute -top-6 -left-6 text-blue-500 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <Sparkles
          className="absolute -bottom-6 -right-6 text-blue-500 animate-spin"
          style={{ animationDuration: "8s", animationDirection: "reverse" }}
        />
      </div>

      <p className="text-2xl md:text-4xl py-4 md:py-6 text-white font-extrabold text-center max-w-xl mx-auto px-4">
        Öyle bir yayın olsa da izlesek!
      </p>

      {closestSessionDate && (
        <div className="mt-6 md:mt-8 text-white bg-black/20 p-4 md:p-6 rounded-xl backdrop-blur-sm mx-4 w-[90%] max-w-md">
          <p className="text-center mb-2 text-blue-400 font-semibold text-sm md:text-base">
            Bir sonraki yayına kalan süre:
          </p>

          <CountdownTimer center targetDate={closestSessionDate} />
        </div>
      )}

      <Button
        onClick={handleRoute}
        className="mt-10 md:mt-16 bg-blue-600 hover:bg-blue-800 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg flex items-center gap-2 animate-pulse"
        style={{ animationDuration: "3s" }}
      >
        <Home size={18} />
        Anasayfaya Dön
      </Button>

      {/* Easter egg content */}
      {showEasterEgg && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-10 flex items-center justify-center flex-col gap-4"
            onClick={() => setShowEasterEgg(false)}
          >
            <div className="relative">
              <Coffee
                size={100}
                className="text-blue-500 animate-bounce"
                style={{
                  animationDuration: "2s",
                }}
              />
            </div>
            <p className="text-2xl md:text-4xl text-white font-bold mt-8 text-center px-4">
              Kahve molası verelim mi? 🤫
            </p>
            <p className="text-base md:text-xl text-blue-400 mt-4 text-center max-w-md px-6">
              404 sayfasını buldun, gizli easter egg'i keşfettin... Şimdi bir
              kave molası vermeyi hak ettin!
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowEasterEgg(false);
              }}
              className="mt-8 bg-blue-600 hover:bg-blue-800"
            >
              Geri Dön
            </Button>
          </div>
        </>
      )}

      {/* Hint for the easter egg */}
      <p className="absolute bottom-4 text-white/30 text-[10px] md:text-xs px-4 text-center w-full">
        {clickCount > 0 && clickCount < 5
          ? "Devam et, neredeyse başardın..."
          : "Psst... 404'e tıklamayı dene"}
      </p>
    </div>
  );
}
