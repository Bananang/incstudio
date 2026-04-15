import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";

const features = [
  { icon: "🎨", title: "유니크한 공간", desc: "일렉트릭 블루 카펫과 오렌지 빈티지 가구로 꾸며진 특별한 공간" },
  { icon: "📸", title: "포토존 완비", desc: "SNS에 올리고 싶은 인생샷을 건질 수 있는 다양한 포토존" },
  { icon: "🎵", title: "사운드 시스템", desc: "블루투스 스피커와 조명으로 완벽한 파티 분위기 연출" },
  { icon: "🍰", title: "케이터링 가능", desc: "특별한 날을 위한 케이크, 음료 케이터링 서비스 제공" },
];

const AboutSection = () => {
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
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">About Us</span>
          <h2 className="text-4xl md:text-6xl font-black text-electric mt-2">
            어떤 공간인가요? 🏠
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - moodboard style */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          >
            <div className="polaroid rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
              <img src={gallery1} alt="INC STUDIO 내부" className="w-full aspect-[4/5] object-cover" loading="lazy" width={800} height={1024} />
            </div>
            <motion.div
              className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm rotate-12"
              animate={{ rotate: [12, 16, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SO CUTE! 💕
            </motion.div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card p-6 rounded-2xl shadow-neon border-2 border-electric/10"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className="text-4xl mb-3 block">{f.icon}</span>
                <h3 className="font-black text-lg text-electric mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
