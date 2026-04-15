import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-space.jpg";

const features = [
  { title: "유니크 하이틴 무드 (High-Teen Mood)", desc: "미드센추리 모던 컨셉과 하이틴 감성이 결합된, 오직 INC STUDIO에서만 만날 수 있는 독보적인 공간미" },
  { title: "시그니처 포토존 (Photo Zones)", desc: "셔터를 누르는 모든 곳이 스튜디오가 되는 곳, SNS 감성을 자극하는 다채로운 포토존 완비" },
  { title: "프라이빗 시네마 (Private Cinema)", desc: "55인치 4K 대형 TV + 고성능 사운드바로 즐기는 영화관 그 이상의 몰입감" },
  { title: "INC 고객 전용 맛집 제휴 (Partnership)", desc: "인근 맛집 제휴를 통해 예약 고객에게만 드리는 특별한 서비스 메뉴와 할인 혜택" },
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
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              감각으로 완성된 공간
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              인테리어 전문 회사가 운영하는<br />
              감각적인 공간 브랜드 'INC 스튜디오'
            </p>
            <div className="space-y-6 font-sans">
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
