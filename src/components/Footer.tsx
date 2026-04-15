import { motion } from "framer-motion";
import incLogo from "@/assets/inc-logo.png";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SPACE", href: "#space" },
  { label: "SERVICES", href: "#services" },
  { label: "REVIEWS", href: "#reviews" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left: Logo + Description + Info */}
          <div>
            <img src={incLogo} alt="INC STUDIO" className="h-16 md:h-20 mb-4 brightness-0 invert" />
            <p className="text-sm text-background/50 leading-relaxed max-w-sm mb-8">
              하이틴 감성이 가득한 프라이빗 파티룸 & 스튜디오
              <br />
              특별한 순간을 만들어 보세요.
            </p>
            <div className="space-y-1 text-sm text-background/50">
              <p>
                회사명 <span className="text-background/70">INC 스튜디오</span>
                <span className="mx-3 text-background/20">|</span>
                주소 <span className="text-background/70">서울 성북구 보문로34길 92 B1</span>
              </p>
              <p>전화번호 <span className="text-background/70">0507-1422-5160</span></p>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="flex flex-col items-start md:items-end">
            <nav className="flex flex-wrap gap-6 md:gap-10 mb-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs tracking-[0.2em] text-background/60 hover:text-background transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
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
