import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const photos = [
  { src: gallery1, caption: "아늑한 라운지 존 🛋️", rotate: -3, w: 800, h: 1024 },
  { src: gallery2, caption: "생일파티 세팅 🎂", rotate: 2, w: 1024, h: 800 },
  { src: gallery3, caption: "스튜디오 촬영 📸", rotate: -2, w: 800, h: 1024 },
  { src: gallery4, caption: "브라이덜 샤워 💐", rotate: 3, w: 1024, h: 800 },
];

const GallerySection = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">Gallery</span>
          <h2 className="text-4xl md:text-6xl font-black text-electric mt-2">
            공간 엿보기 👀
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              className="polaroid cursor-pointer"
              style={{ rotate: `${p.rotate}deg` }}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
            >
              <img
                src={p.src}
                alt={p.caption}
                className="w-full aspect-square object-cover"
                loading="lazy"
                width={p.w}
                height={p.h}
              />
              <p className="text-center text-sm font-bold text-electric mt-2 pb-1">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
