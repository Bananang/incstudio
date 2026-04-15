import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/landing-hero.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="snap-section relative h-screen overflow-hidden">
      {/* Full-bleed image with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={heroImg}
          alt="INC STUDIO 공간"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </motion.div>

      {/* Asymmetric text - bottom left */}
      <motion.div
        className="absolute bottom-16 left-8 md:bottom-24 md:left-16 z-10"
        style={{ opacity }}
      >
        <motion.p
          className="text-[10px] md:text-xs tracking-[0.3em] text-primary-foreground/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          YOUR CREATIVE PLAYGROUND
        </motion.p>
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          INC
          <br />
          STUDIO
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-primary-foreground/80 mt-6 max-w-xs leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          하이틴 감성이 가득한
          <br />
          우리만의 프라이빗 아지트
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-primary-foreground/40 mx-auto"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
        <p className="text-[10px] tracking-[0.2em] text-primary-foreground/50 mt-2">SCROLL</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
