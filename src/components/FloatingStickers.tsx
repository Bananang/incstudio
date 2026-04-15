import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const stickers = [
  { emoji: "⭐", size: 40 },
  { emoji: "💖", size: 36 },
  { emoji: "📸", size: 38 },
  { emoji: "🎉", size: 42 },
  { emoji: "✨", size: 34 },
  { emoji: "🎈", size: 40 },
  { emoji: "🌟", size: 36 },
  { emoji: "💫", size: 32 },
  { emoji: "🎀", size: 34 },
  { emoji: "🍭", size: 38 },
];

const FloatingStickers = () => {
  const [positions, setPositions] = useState<{ x: number; y: number; delay: number }[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setPositions(
      stickers.map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      }))
    );

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {stickers.map((s, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={i}
            className="absolute animate-float select-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: s.size,
              animationDelay: `${pos.delay}s`,
            }}
            animate={{
              y: [0, -20, -10, -25, 0],
              rotate: [0, 5, -3, 2, 0],
            }}
            transition={{
              duration: 6 + pos.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.5 }}
          >
            {s.emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingStickers;
