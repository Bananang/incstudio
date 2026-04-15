import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-space.jpg";

const features = [
  { title: "유니크한 공간", desc: "일렉트릭 블루 카펫과 오렌지 빈티지 가구로 꾸며진 특별한 공간" },
  { title: "포토존 완비", desc: "SNS에 올리고 싶은 인생샷을 건질 수 있는 다양한 포토존" },
  { title: "사운드 시스템", desc: "블루투스 스피커와 조명으로 완벽한 파티 분위기 연출" },
  { title: "케이터링 가능", desc: "특별한 날을 위한 케이크, 음료 케이터링 서비스 제공" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section id="about" ref={ref} className="snap-section relative min-h-screen flex items-center bg-background py-32">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <p className="tracking-[0.3em] text-muted-foreground mb-4 font-serif-en text-3xl">
              ABOUT THE SPACE
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-8">
              감각으로 완성된 공간
            </h2>
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="border-b border-border pb-4"
                >
                  <h3 className="text-sm font-bold tracking-wide mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image (appears first) */}
          <motion.div className="relative overflow-hidden" style={{ y }}>
            <motion.img
              src={aboutImg}
              alt="INC STUDIO 내부"
              className="w-full aspect-[3/4] object-cover"
              style={{ scale: imgScale }}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
