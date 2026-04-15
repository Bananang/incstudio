import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const services = [
  {
    title: "파티룸 대여",
    desc: "생일파티, 기념일, 모임 등 다양한 파티를 위한 프라이빗 공간을 제공합니다.",
    emoji: "🎉",
    color: "from-primary to-electric-light",
  },
  {
    title: "스튜디오 촬영",
    desc: "프로필, 화보, SNS 콘텐츠 촬영을 위한 감각적인 스튜디오 공간입니다.",
    emoji: "📷",
    color: "from-secondary to-neon-orange",
  },
  {
    title: "브라이덜 샤워",
    desc: "결혼을 앞둔 신부를 위한 특별한 브라이덜 샤워 파티를 준비해드립니다.",
    emoji: "💍",
    color: "from-primary to-electric-light",
  },
  {
    title: "소규모 이벤트",
    desc: "팬미팅, 소규모 전시, 팝업 등 크리에이티브한 이벤트 공간으로 활용하세요.",
    emoji: "🌟",
    color: "from-secondary to-neon-orange",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-electric relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">★</div>
        <div className="absolute bottom-10 right-10 text-8xl">♥</div>
        <div className="absolute top-1/2 left-1/2 text-8xl">✦</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">Services</span>
          <h2 className="text-4xl md:text-6xl font-black text-primary-foreground mt-2">
            무엇을 할 수 있나요? ✨
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-primary-foreground rounded-3xl p-8 cursor-pointer"
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.08, y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
            >
              <span className="text-5xl block mb-4">{s.emoji}</span>
              <h3 className="text-xl font-black text-electric mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 text-secondary font-bold text-sm group-hover:translate-x-2 transition-transform">
                예약하기 →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
