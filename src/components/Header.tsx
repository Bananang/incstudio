import { motion, useScroll, useTransform } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SPACE", href: "#space" },
  { label: "SERVICES", href: "#services" },
];

const Header = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0.6, 0.95]);
  const blur = useTransform(scrollY, [0, 200], [8, 20]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-8">
        <a href="#" className="text-xl font-serif-en tracking-widest text-foreground">
          INC STUDIO
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] text-foreground border border-foreground/30 px-5 py-2 hover:bg-foreground hover:text-background transition-all"
          >
            RESERVATION
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
