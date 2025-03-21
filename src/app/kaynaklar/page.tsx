"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResourceContext } from "@/context/ResourceContext";

// Breakpoint object for masonry grid
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function ResourcePage() {
  const { resources, isLoading, isError } = useResourceContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);

  // Tüm etiketleri toplayıp benzersiz hale getiriyoruz
  const uniqueTags: string[] = useMemo(() => {
    const tagsSet = new Set<string>();
    resources?.forEach((resource) => {
      if (resource.tags) {
        resource.tags.split(",").forEach((tag) => {
          tagsSet.add(tag.trim());
        });
      }
    });
    return Array.from(tagsSet);
  }, [resources]);

  // Extract unique lessons
  const uniqueLessons: string[] = useMemo(() => {
    const lessonsSet = new Set<string>();
    resources?.forEach((resource) => {
      if (resource.lesson) {
        lessonsSet.add(resource.lesson.trim());
      }
    });
    return Array.from(lessonsSet);
  }, [resources]);

  // Filter resources based on search query, selected tag, and selected lesson
  const filteredResources = resources?.filter((resource) => {
    const matchesSearch = resource.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "all" ||
      (resource.tags &&
        resource.tags
          .toLowerCase()
          .split(",")
          .map((tag) => tag.trim())
          .includes(selectedTag.toLowerCase()));
    const matchesLesson =
      selectedLesson === "all" ||
      (resource.lesson && resource.lesson.trim() === selectedLesson);
    return matchesSearch && matchesTag && matchesLesson;
  });

  const visibleResources = filteredResources?.slice(0, visibleItems);

  // Check if there are more resources to load
  const hasMoreResources =
    filteredResources && visibleItems < filteredResources.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  // Reset visible items when search query, tag, or lesson changes
  useEffect(() => {
    setVisibleItems(6);
  }, [searchQuery, selectedTag, selectedLesson]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top spacing */}
      <div className="h-[20vh]"></div>

      {/* Content container */}
      <motion.div
        className="w-11/12 md:w-5/6 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header
          className="mb-12 md:mb-16 text-center"
          variants={headerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-5 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Kaynak{" "}
            <span className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">
              Kütüphanesi
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Gelişim yolculuğunuzu zenginleştirecek araçlar, kılavuzlar ve
            referanslardan oluşan koleksiyonumuzu keşfedin.
          </motion.p>

          {/* Search ve Tag Selector container */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 w-full">
            <motion.div
              className="relative w-full md:max-w-md flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
              <Input
                type="text"
                placeholder="Kaynakları arayın..."
                className="pl-10 bg-white bg-gray-800/70 border border-gray-600/30 text-gray-300 placeholder:text-gray-300 focus-visible:ring-[#C55E85] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="relative w-full md:max-w-[180px] flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-gray-800/70 border border-gray-600/30 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C55E85]"
              >
                <option value="all">Tümü</option>
                {uniqueTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Lesson Selector */}
          <motion.div
            className="w-full flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="lesson"
                  value="all"
                  checked={selectedLesson === "all"}
                  onChange={() => setSelectedLesson("all")}
                  className="sr-only"
                />
                <span
                  className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    selectedLesson === "all"
                      ? "bg-[#C55E85] text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Tümü
                </span>
              </label>

              {uniqueLessons.map((lesson, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="lesson"
                    value={lesson}
                    checked={selectedLesson === lesson}
                    onChange={() => setSelectedLesson(lesson)}
                    className="sr-only"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                      selectedLesson === lesson
                        ? "bg-[#C55E85] text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {lesson}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* GitHub linkine yönlendiren + butonu */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a
              href="https://github.com/Developer-MultiGroup/DMG-Data-Science-Awesome"
              data-umami-event="Add Resource Github"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-1 bg-[#3682F1] hover:bg-[#3682F1]/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-[#3682F1]/30 rounded-full px-4 py-2"
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Kaynak Ekle</span>
            </motion.a>
          </motion.div>
        </motion.header>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-gray-400"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Kaynaklar yükleniyor...
            </motion.div>
          </motion.div>
        ) : isError ? (
          <motion.div
            className="bg-red-900/20 border border-red-800 text-red-300 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Kaynaklar yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-6 w-auto"
                columnClassName="pl-6 bg-clip-padding"
              >
                {visibleResources?.map((resource, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="mb-6 bg-gray-800/70 backdrop-blur-sm border border-gray-600/30 hover:border-[#C55E85] hover:bg-gray-800/80 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 group overflow-hidden rounded-xl will-change-transform">
                      <CardHeader className="pb-2">
                        {resource.lesson && (
                          <div className="text-[#3682F1] text-sm mt-1 mb-2">
                            {resource.lesson}
                          </div>
                        )}
                        <CardTitle className="text-white group-hover:text-white/90 transition-colors text-xl md:text-2xl font-bold">
                          {resource.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-white/90 text-sm md:text-base">
                        <p className="whitespace-pre-wrap">
                          {resource.description}
                        </p>
                        {resource.tags && (
                          <div className="flex flex-wrap gap-2 mt-6">
                            {resource.tags.split(",").map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 rounded-full bg-[#3682F1]/70 text-[#f0f8ff] text-xs font-medium"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="flex justify-between items-center pt-2">
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-medium text-sm md:text-base transition-colors"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              className="bg-gray-700/90 hover:bg-gray-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-gray-500/30"
                              aria-label="kaynak linki"
                              data-umami-event={resource.name}
                            >
                              İncele
                            </Button>
                          </motion.div>
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </Masonry>
            </AnimatePresence>

            {hasMoreResources && (
              <motion.div
                className="flex justify-center mt-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={handleLoadMore}
                    className="bg-[#3682F1] hover:bg-[#3682F1]/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-[#3682F1]/30"
                    aria-label="daha fazla kaynak yükle"
                  >
                    Daha Fazla Yükle
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </>
        )}

        {filteredResources?.length === 0 && (
          <motion.div
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Aramanızla eşleşen herhangi bir kaynak bulunamadı.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
