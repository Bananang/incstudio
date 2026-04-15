import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SPACE", href: "#space" },
  { label: "SERVICES", href: "#services" },
];

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <div className="container mx-auto flex items-center justify-between py-6 px-8">
        <a href="#" className="text-xl font-serif tracking-widest text-primary-foreground">
          INC STUDIO
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.2em] text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] text-primary-foreground border border-primary-foreground/40 px-5 py-2 hover:bg-primary-foreground hover:text-foreground transition-all"
          >
            RESERVATION
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
