import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { setMenuStateListener } from "./Header";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const FloatingBooking = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuStateListener(setMenuOpen);
    return () => setMenuStateListener(() => {});
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 200);
  });

  const active = scrolled || isHovered;

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-1/2 z-40 rounded-full px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base tracking-[0.05em] font-medium cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: "translateX(-50%)",
        backgroundColor: active ? "hsl(215, 100%, 34%)" : "rgba(255,255,255,0.95)",
        color: active ? "#ffffff" : "rgba(20,20,20,1)",
        boxShadow: active
          ? "0 4px 24px rgba(0,71,171,0.3)"
          : "0 4px 24px rgba(0,0,0,0.1)",
        transition: "background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease, opacity 0.3s ease",
        opacity: menuOpen ? 0 : 1,
        pointerEvents: menuOpen ? "none" : "auto",
      }}
    >
      {active ? "예약하기" : "Reservation"}
    </a>
  );
};

export default FloatingBooking;
