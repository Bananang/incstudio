import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const FloatingBooking = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 200);
  });

  const active = scrolled || isHovered;

  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base tracking-[0.05em] font-medium cursor-pointer transition-all duration-500 ease-in-out"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: active ? "hsl(215, 100%, 34%)" : "rgba(255,255,255,0.95)",
        color: active ? "#ffffff" : "rgba(20,20,20,1)",
        boxShadow: active
          ? "0 4px 24px rgba(0,71,171,0.3)"
          : "0 4px 24px rgba(0,0,0,0.1)",
      }}
    >
      {active ? "예약하기" : "Reservation"}
    </motion.a>
  );
};

export default FloatingBooking;
