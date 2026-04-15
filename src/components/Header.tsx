import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
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
          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-[60]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="메뉴 열기"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground origin-center"
              animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground origin-center"
              animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile side panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-foreground/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs z-[56] bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-10 gap-8 md:hidden"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.2em] text-foreground border border-foreground/30 px-5 py-3 text-center hover:bg-foreground hover:text-background transition-all mt-4"
              >
                RESERVATION
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
