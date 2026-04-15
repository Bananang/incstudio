import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <motion.h1
          className="text-2xl md:text-3xl font-black text-primary-foreground tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          INC STUDIO
        </motion.h1>
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full font-bold text-sm md:text-base shadow-orange-glow"
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          예약하기 ✨
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;
