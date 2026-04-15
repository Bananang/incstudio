import { motion } from "framer-motion";
import heroImg from "@/assets/hero-party.jpg";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-electric pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="INC STUDIO 파티룸"
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
        >
          <motion.p
            className="text-secondary font-bold text-lg md:text-xl mb-4 tracking-wider"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          >
            ★ YOUR CREATIVE PLAYGROUND ★
          </motion.p>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-9xl font-black text-primary-foreground leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
          >
            INC
            <br />
            <span className="text-secondary">STUDIO</span>
          </motion.h2>

          <motion.p
            className="text-primary-foreground/90 text-lg md:text-2xl font-medium mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            하이틴 감성이 가득한
            <br />
            우리만의 프라이빗 아지트
          </motion.p>

          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-secondary-foreground px-10 py-4 rounded-full text-xl font-black shadow-orange-glow"
            whileHover={{ scale: 1.15, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
          >
            네이버 예약하기 →
          </motion.a>
        </motion.div>

        {/* Decorative shapes */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-secondary/30"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full border-4 border-secondary/40"
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-20 text-5xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
