"use client";

import { useEffect, useState } from "react";
import {
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  YoutubeLogo,
  ArrowUp,
  GithubLogo,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative bg-transparent text-white py-6 px-2 md:px-12 flex flex-col items-center justify-center min-h-60">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Anasayfa">
            <Image
              src="/multigroup.webp"
              alt="MultiGroup Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <nav className="mt-4 lg:mt-0 flex flex-col md:flex-row gap-6 text-sm items-center justify-center w-full text-center align-middle">
          <Link
            aria-label="Kaynaklar sayfası"
            href="/kaynaklar"
            className="hover:text-[#3682F1] transition-colors ease-in-out duration-300"
          >
            Kaynaklar
          </Link>
          <Link
            aria-label="Konuşmacılar sayfası"
            href="/#konuşmacılar"
            className="hover:text-[#3682F1] transition-colors ease-in-out duration-300"
          >
            Konuşmacılar
          </Link>
          <Link
            aria-label="yayınlar"
            href="/#yayınlar"
            className="hover:text-[#3682F1] transition-colors ease-in-out duration-300"
          >
            Yayınlar
          </Link>
        </nav>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link
            aria-label="DMG Instagram Hesabı"
            href="https://instagram.com/devmultigroup"
            target="_blank"
            data-umami-event="Instagram"
          >
            <InstagramLogo className="text-xl text-pink-500 hover:text-pink-400" />
          </Link>
          <Link
            aria-label="DMG X Hesabı"
            href="https://x.com/devmultigroup"
            target="_blank"
            data-umami-event="X (Twitter)"
          >
            <XLogo className="text-xl text-white hover:text-gray-300" />
          </Link>
          <Link
            aria-label="DMG Youtube Hesabı"
            href="https://www.youtube.com/@devmultigroup"
            target="_blank"
            data-umami-event="Youtube"
          >
            <YoutubeLogo className="text-xl text-red-600 hover:text-red-500" />
          </Link>
          <Link
            aria-label="DMG Linkedin Hesabı"
            href="https://www.linkedin.com/company/devmultigroup/posts/?feedView=all"
            target="_blank"
            data-umami-event="LinkedIn"
          >
            <LinkedinLogo className="text-xl text-blue-600 hover:text-blue-500" />
          </Link>
          <Link
            aria-label="DMG Github Hesabı"
            href="https://github.com/Developer-MultiGroup"
            target="_blank"
            data-umami-event="Github"
          >
            <GithubLogo className="text-xl text-white hover:text-gray-300" />
          </Link>
        </div>
      </div>
      {showButton && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-400 transition"
        >
          <ArrowUp />
        </motion.button>
      )}
    </footer>
  );
}
