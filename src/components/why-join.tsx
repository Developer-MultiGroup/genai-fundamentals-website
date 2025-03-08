"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WhyJoinSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const iconVariants = {
    initial: { scale: 0.8, rotate: 0 },
    animate: {
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 10, 0, -10, 0],
      transition: {
        scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      },
    },
  }

  const reasons = [
    {
      title: "Yetkin Eğitim İçeriği",
      description: "Temelden ileri seviyeye uzanan, uygulamalı ve kapsamlı bir müfredat.",
    },
    {
      title: "Alanında Uzman Konuşmacılar",
      description: "Global şirketlerden sektör profesyonelleriyle öğrenme fırsatı!",
    },
    {
      title: "Sertifika Kazanma Şansı",
      description: "Başarıyla tamamlayanlara kariyerine değer katacak sertifika!",
    },
  ]

  return (
    <section className="text-black py-16 md:py-8 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-24">Neden Bu Eğitime <span className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">Katılmalısın?</span></h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={item} className="flex flex-col items-center text-center">
              <motion.div
                className="relative w-20 h-20 mb-6"
                variants={iconVariants}
                initial="initial"
                animate="animate"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/gemini-icon.svg"
                    alt="Gemini Icon"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-600 max-w-xs mx-auto">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

