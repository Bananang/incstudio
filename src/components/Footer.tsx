import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const Footer = () => {
  return (
    <footer className="bg-electric py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">
            INC STUDIO
          </h2>
          <p className="text-primary-foreground/70 mb-2">
            하이틴 감성 프라이빗 파티룸 & 스튜디오
          </p>
          <p className="text-primary-foreground/60 text-sm mb-8">
            📍 서울특별시 · 📞 문의는 네이버 예약으로
          </p>

          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-secondary-foreground px-10 py-4 rounded-full text-lg font-black shadow-orange-glow mb-8"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            네이버 예약하기 🗓️
          </motion.a>

          <div className="border-t border-primary-foreground/20 pt-6 mt-6">
            <p className="text-primary-foreground/40 text-sm">
              © 2025 INC STUDIO. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
