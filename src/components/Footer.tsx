import { motion } from "framer-motion";
import incLogo from "@/assets/inc-logo.png";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const Footer = () => {
  return (
    <footer className="bg-foreground py-24">
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-background mb-6">INC STUDIO</h2>
            <p className="text-sm text-background/50 leading-relaxed max-w-sm">
              하이틴 감성이 가득한 프라이빗 파티룸 & 스튜디오.
              <br />
              특별한 순간을 만들어 보세요.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="text-right">
              <p className="text-sm text-background/40 mb-1">서울특별시</p>
              <p className="text-sm text-background/40">문의는 네이버 예약으로</p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 text-xs tracking-[0.2em] text-background border border-background/30 px-8 py-3 hover:bg-background hover:text-foreground transition-all duration-300"
            >
              RESERVATION
            </a>
          </div>
        </motion.div>

        <div className="border-t border-background/10 mt-16 pt-8">
          <p className="text-[10px] tracking-[0.1em] text-background/30">
            © 2025 INC STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
