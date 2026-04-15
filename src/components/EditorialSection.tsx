import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import detail1 from "@/assets/detail-1.jpg";
import detail2 from "@/assets/detail-2.jpg";
import detail3 from "@/assets/detail-3.jpg";

const sections = [
  {
    img: detail1,
    tag: "RETRO VIBES",
    title: "레트로 감성의\n빈티지 소품들",
    desc: "코카콜라 냉장고, 브라운관 TV, 빈티지 캠코더까지. 90년대 하이틴 감성을 완벽하게 재현한 소품들이 공간 곳곳에 배치되어 있습니다.",
    reverse: false,
    w: 960, h: 1280,
  },
  {
    img: detail2,
    tag: "COLORFUL SPACE",
    title: "컬러풀한\n아지트",
    desc: "일렉트릭 블루 카펫 위의 오렌지 판톤 체어, 빈티지 라운지까지. 미드센추리 모던과 Y2K가 만나는 유니크한 공간 구성.",
    reverse: true,
    w: 960, h: 1280,
  },
  {
    img: detail3,
    tag: "LOCKER ROOM",
    title: "하이틴 감성\n락커룸",
    desc: "학교 라커를 연상시키는 블루 라커, 축구공과 야구 글러브가 가득한 스포츠 무드. 촬영은 물론 파티 소품으로도 활용 가능합니다.",
    reverse: false,
    w: 960, h: 1280,
  },
];

const EditorialBlock = ({ item, index }: { item: typeof sections[0]; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-12 gap-6 md:gap-0 items-center min-h-[80vh] ${
        index !== 0 ? "mt-16 md:mt-0" : ""
      }`}
    >
      {/* Image */}
      <motion.div
        className={`md:col-span-7 relative overflow-hidden ${
          item.reverse ? "md:order-2 md:col-start-6" : "md:col-start-1"
        }`}
        style={{ y: imgY }}
      >
        <motion.img
          src={item.img}
          alt={item.tag}
          className="w-full h-[60vh] md:h-[85vh] object-cover"
          style={{ scale: imgScale }}
          loading="lazy"
          width={item.w}
          height={item.h}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className={`md:col-span-5 px-8 md:px-16 ${
          item.reverse ? "md:order-1 md:col-start-1" : ""
        }`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4">{item.tag}</p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-6 whitespace-pre-line">
          {item.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-[1.9] max-w-sm">{item.desc}</p>
      </motion.div>
    </div>
  );
};

const EditorialSection = () => {
  return (
    <section id="space" className="bg-surface py-32 space-y-24 md:space-y-0">
      {sections.map((item, i) => (
        <EditorialBlock key={item.tag} item={item} index={i} />
      ))}
    </section>
  );
};

export default EditorialSection;
