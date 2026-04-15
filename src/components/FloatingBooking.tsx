import { motion, useScroll, useTransform } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const FloatingBooking = () => {
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base tracking-[0.05em] font-medium transition-all duration-500 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.05 }}
      style={{
        backgroundColor: useTransform(isScrolled, [0, 1], ["rgba(255,255,255,0.95)", "rgba(20,20,20,1)"]),
        color: useTransform(isScrolled, [0, 1], ["rgba(20,20,20,1)", "rgba(255,255,255,1)"]),
        boxShadow: useTransform(
          isScrolled,
          [0, 1],
          ["0 4px 24px rgba(0,0,0,0.1)", "0 4px 24px rgba(0,0,0,0.3)"]
        ),
      }}
    >
      <motion.span
        style={{
          opacity: useTransform(isScrolled, [0, 0.5], [1, 0]),
          display: useTransform(isScrolled, (v) => (v > 0.5 ? "none" : "inline")),
        }}
      >
        Reservation
      </motion.span>
      <motion.span
        style={{
          opacity: useTransform(isScrolled, [0.5, 1], [0, 1]),
          display: useTransform(isScrolled, (v) => (v <= 0.5 ? "none" : "inline")),
        }}
      >
        예약하기
      </motion.span>
    </motion.a>
  );
};

export default FloatingBooking;
