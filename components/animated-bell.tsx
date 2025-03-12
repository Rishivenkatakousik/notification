"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedBellProps {
  animate?: boolean
}

export function AnimatedBell({ animate = false }: AnimatedBellProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (animate) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [animate])

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer circle */}
      <motion.div
        className="absolute rounded-full border border-[#493182] opacity-30"
        initial={{ width: "16rem", height: "16rem" }}
        animate={{
          width: isAnimating ? ["16rem", "17rem", "16rem"] : "16rem",
          height: isAnimating ? ["16rem", "17rem", "16rem"] : "16rem",
          opacity: isAnimating ? [0.3, 0.5, 0.3] : 0.3,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: isAnimating ? 1 : 0,
        }}
      />

      {/* Middle circle */}
      <motion.div
        className="absolute rounded-full border border-[#493182] opacity-50"
        initial={{ width: "12rem", height: "12rem" }}
        animate={{
          width: isAnimating ? ["12rem", "13rem", "12rem"] : "12rem",
          height: isAnimating ? ["12rem", "13rem", "12rem"] : "12rem",
          opacity: isAnimating ? [0.5, 0.7, 0.5] : 0.5,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: isAnimating ? 1 : 0,
          delay: 0.1,
        }}
      />

      {/* Inner circle */}
      <motion.div
        className="flex items-center justify-center rounded-full bg-[#2f1a61]"
        initial={{ width: "8rem", height: "8rem" }}
        animate={{
          width: isAnimating ? ["8rem", "8.5rem", "8rem"] : "8rem",
          height: isAnimating ? ["8rem", "8.5rem", "8rem"] : "8rem",
          scale: isAnimating ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: isAnimating ? 1 : 0,
          delay: 0.2,
        }}
      >
        {/* Bell icon */}
        <motion.div
          className="text-lavender"
          animate={{
            rotate: isAnimating ? [-5, 5, -5, 5, 0] : 0,
            scale: isAnimating ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: isAnimating ? 0.5 : 0,
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: isAnimating ? 1 : 0,
            delay: 0.3,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#e0d1ff]"
          >
            <path
              d="M12 2C11.172 2 10.5 2.672 10.5 3.5V4.19922C7.9 4.89922 6 7.3 6 10V16L4 18V19H20V18L18 16V10C18 7.3 16.1 4.89922 13.5 4.19922V3.5C13.5 2.672 12.828 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

