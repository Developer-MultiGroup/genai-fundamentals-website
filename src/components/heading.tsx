"use client"

import type React from "react"
import clsx from "clsx"

interface HeadingProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

const Heading: React.FC<HeadingProps> = ({ children, className, dark }) => {
  // Function to process the children and apply gradient to the last word
  const processChildren = () => {
    // If children is a string, split it to get the last word
    if (typeof children === "string") {
      const words = children.split(" ")
      const lastWord = words.pop()

      return (
        <>
          {words.length > 0 ? words.join(" ") + " " : ""}
          <span className="bg-gradient-to-r from-[#3682F1] to-[#C55E85] bg-clip-text text-transparent">{lastWord}</span>
        </>
      )
    }

    // If children is not a simple string, return it as is
    // This is a simplified approach - for complex children, you might need a more sophisticated solution
    return children
  }

  return (
    <p
      className={clsx(
        "font-extrabold text-4xl md:text-6xl text-center pb-16 pt-20 md:pt-24 xl:pt-0 max-w-5xl mx-auto",
        className,
        dark ? "text-gray-900" : "text-white",
      )}
    >
      {processChildren()}
    </p>
  )
}

export default Heading
