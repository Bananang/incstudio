import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import detail1 from "@/assets/detail-1.jpg";
import detail2 from "@/assets/detail-2.jpg";
import detail3 from "@/assets/detail-3.jpg";

const sections = [
  {
    img: detail1,
    tag: "RETRO ARCHIVE",
    title: "레트로 감성의\n빈티지 소품들",
    desc: "코카콜라 냉장고, 브라운관 TV, 빈티지 캠코더 등 공간 곳곳에 스며든 빈티지 오브제들 막 찍어도 화보가 되는 포토제닉 소품 컬렉션",
    reverse: false,
    w: 960, h: 1280,
  },
  {
    img: detail2,
    tag: "COLORFUL SPACE",
    title: "컬러풀한\n아지트",
    desc: "다채로운 색채가 조화롭게 어우러진 감각적인 큐레이션\n인테리어 전문가의 시선으로 완성한 완벽한 컬러 밸런스와 미드센추리 모던 가구로 채워진 독보적인 무드의 아지트",
    reverse: true,
    w: 960, h: 1280,
  },
  {
    img: detail3,
    tag: "LOCKER ROOM",
    title: "하이틴 감성\n락커룸",
    desc: "미국 하이틴 영화 속 한 장면을 그대로 옮겨온 블루 라커룸\n럭비공, 야구 배트와 글러브 등 스포츠 무드를 완성하는 소품 디테일",
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

  // Direction-based animation: left images slide from left, right images from right
  const slideDirection = item.reverse ? 60 : -60;

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
        initial={{ opacity: 0, x: item.reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2, ease: "easeOut" }}
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <p className="tracking-[0.3em] text-muted-foreground mb-4 font-serif-en text-2xl">{item.tag}</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6 whitespace-pre-line">
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
