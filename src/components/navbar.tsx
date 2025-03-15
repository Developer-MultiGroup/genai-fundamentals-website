"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { List } from "@phosphor-icons/react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScrollOrRedirect = (href: string) => {
    if (pathname === "/etkinlikler" && href.startsWith("#")) {
      router.push(`/${href}`);
    } else {
      const id = href.split("#")[1];
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
    setIsExpanded(false); // Close navbar after clicking a link
  };

  const navigationItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/kaynaklar", label: "Kaynaklar" },
    { href: "/#konuşmacılar", label: "Konuşmacılar", isScroll: true },
    { href: "/#takvim", label: "Takvim", isScroll: true },
    
  ];

  return (
    <header className="absolute w-full z-50 px-6 sm:px-12 bg-transparent py-2">
      <div className="mx-auto px-8 sm:px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Mobilde daha sola alındı */}
          <div className="flex-shrink-0 -ml-2 sm:ml-0">
            <a href="/">
              <Image
                src="/multigroup.webp"
                alt="DMG Logo"
                width={196}
                height={196}
                priority
                className="object-contain my-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-8 ml-auto">
            <NavigationMenu className="flex-1">
              <NavigationMenuList className="flex gap-4 xl:gap-8 group">
                {navigationItems.map((item) => (
                  <NavigationMenuItem
                    key={item.href}
                    className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  >
                    <button
                      onClick={() => handleScrollOrRedirect(item.href)}
                      className="text-lg font-bold text-white hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="outline"
              className="relative h-11 px-6 text-zinc-900 group transition-all duration-300 ease-in-out"
            >
              <a href="https://kommunity.com/devmultigroup/events/generativeai-fundamentals-with-gemini-64a8a503" target="_blank">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-500 transition-transform duration-300 ease-in-out rounded-md" />
                <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                  <span className="relative z-10 font-medium text-lg">
                    Başvur
                  </span>
                </div>
              </a>
              <span className="invisible font-medium text-sm">Kayıt Ol</span>
            </Button>
          </div>
          {/* Hamburger - Mobilde daha sağa alındı */}
          <div className="lg:hidden -mr-2 sm:mr-0">
            <Button
              className="text-white"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <List className="h-6 w-6 hover:bg-none" />
            </Button>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
            isExpanded
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <button
            className="absolute top-12 right-16 text-white text-3xl"
            onClick={() => setIsExpanded(false)}
          >
            &times;
          </button>
          <div className="flex flex-col items-center space-y-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-white hover:text-blue-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollOrRedirect(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="outline"
              className="mt-6 rounded-lg text-lg text-black border-white px-8 py-3"
            >
              <a href="https://kommunity.com/devmultigroup/events/generativeai-fundamentals-with-gemini-64a8a503" target="_blank">
                Başvur
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;