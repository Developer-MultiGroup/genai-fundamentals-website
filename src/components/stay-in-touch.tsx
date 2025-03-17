"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { PhoneIcon, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Heading from "./heading"
import { Button } from "./ui/button"

interface TabProps {
  title: string
  isActive: boolean
  onClick: () => void
}

const Tab: React.FC<TabProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-2 text-sm md:text-base font-medium relative ${
        isActive ? "text-white" : "text-gray-400 hover:text-gray-300"
      }`}
    >
      {title}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3682F1] to-[#C55E85]"
          layoutId="activeTab"
        />
      )}
    </button>
  )
}

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "WhatsApp ile iletişim",
      icon: <PhoneIcon className="w-8 h-8 text-[#3682F1]" />,
      image: "/images/dmg-connect.webp",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
          Sorularınız için WhatsApp topluluğumuz üzerinden bizimle iletişime geçebilir, sektörünüzle ilgili çeşitli gruplarda yeni insanlarla tanışarak merak ettiklerinizi sorabilir ve paylaşımlarda bulunabilirsiniz. Ekibimiz, ilettiğiniz her soruya en kısa sürede dönüş sağlayarak size yardımcı olmak için hazır beklemektedir.
          </p>
          <div className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] p-[2px] rounded-2xl max-w-xs mx-auto lg:ml-0">
            <Link
              href="https://chat.whatsapp.com/G1qSkvfs0rn3ZJPYoFCqiW"
              data-umami-event="Generate Full Calendar"
              className="w-full bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center p-4 rounded-2xl"
            >
              <MessageCircle className="mr-2" />
              Topluluğa Katıl
            </Link>
          </div>
        </div>
      ),
    }
  ]

  return (
    <div className="w-full min-h-screen flex items-center justify-center align-middle lg:pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <Heading dark >İletişimde Kalın</Heading>

            {/* Tabs - Centered */}
            {/* <div className="mb-12 overflow-x-auto w-full">
              <div className="flex justify-center space-x-4 md:space-x-8">
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    title={tab.title}
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}
                  />
                ))}
              </div>
            </div> */}

            {/* Tab Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Left Column - Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-center lg:text-left"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">
                  {tabs[activeTab].title}
                </h3>
                {tabs[activeTab].content}
              </motion.div>

              {/* Right Column - Image with Border */}
              <div className="flex items-center justify-end">
                <div className="relative">
                  {/* Gradient Border */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#3682F1] to-[#C55E85] opacity-70"></div>

                  {/* Image Container */}
                  <div className="relative rounded-xl overflow-hidden bg-black p-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      key={activeTab}
                      className="relative aspect-[4/3] w-full max-w-sm"
                    >
                      <img
                        src={tabs[activeTab].image}
                        alt="Contact illustration"
                        className="object-cover rounded-lg"
                      />
                      
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

