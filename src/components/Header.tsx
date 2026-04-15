import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoImg from "@/assets/INC-3.png";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SPACE", href: "#space" },
  { label: "SERVICES", href: "#services" },
];

// Export menu state for FloatingBooking
export let onMenuStateChange: ((open: boolean) => void) | null = null;
export const setMenuStateListener = (fn: (open: boolean) => void) => {
  onMenuStateChange = fn;
};

const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 300));
    return unsubscribe;
  }, [scrollY]);

  const blur = useTransform(scrollY, [0, 200], [8, 20]);
  const headerBlur = useTransform(blur, (v) => `blur(${v}px)`);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll & notify FloatingBooking
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    onMenuStateChange?.(mobileOpen);
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{
          backgroundColor: mobileOpen ? "transparent" : headerBg,
          backdropFilter: mobileOpen ? "none" : headerBlur,
          WebkitBackdropFilter: mobileOpen ? "none" : headerBlur,
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-5 px-8">
          <a href="#" className="flex items-center">
            <img src={logoImg} alt="INC STUDIO" className="h-10 w-auto drop-shadow-sm" />
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
              className="text-xs tracking-[0.2em] text-foreground border border-foreground/30 px-5 py-2 hover:bg-[hsl(215,100%,34%)] hover:text-white hover:border-[hsl(215,100%,34%)] transition-all"
            >
              RESERVATION
            </a>
          </nav>
          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[70]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="메뉴 열기"
          >
            <motion.span
              className={`block w-6 h-[2px] origin-center transition-colors duration-300 ${mobileOpen ? "bg-white" : "bg-foreground"}`}
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
            <motion.span
              className={`block w-6 h-[2px] transition-colors duration-300 ${mobileOpen ? "bg-white" : "bg-foreground"}`}
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              className={`block w-6 h-[2px] origin-center transition-colors duration-300 ${mobileOpen ? "bg-white" : "bg-foreground"}`}
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="fixed inset-0 z-[58] flex flex-col justify-between md:hidden overflow-hidden"
            style={{
              background: "hsl(215, 100%, 34%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Menu items - centered vertically */}
            <div className="flex flex-col gap-10 px-8 pt-24">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-bold tracking-[0.05em] text-white/90 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-block border border-white/40 px-8 py-4 text-lg tracking-[0.25em] text-white/90 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + navItems.length * 0.08 }}
                whileTap={{ scale: 0.97 }}
              >
                RESERVATION →
              </motion.a>
            </div>

            {/* Bottom info */}
            <motion.div
              className="px-10 pb-12 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-white/60 text-sm tracking-wide">INC STUDIO</p>
              <p className="text-white/40 text-xs tracking-wide">Premium Beauty Space</p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
