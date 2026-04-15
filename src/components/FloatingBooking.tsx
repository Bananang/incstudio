import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const FloatingBooking = () => {
  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-foreground text-background text-[10px] tracking-[0.2em] px-6 py-3 hover:bg-electric transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.05 }}
    >
      예약하기
    </motion.a>
  );
};

export default FloatingBooking;
