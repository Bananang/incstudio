import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const services = [
  { title: "파티룸 대여", desc: "생일파티, 기념일, 모임 등 다양한 파티를 위한 프라이빗 공간", num: "01" },
  { title: "스튜디오 촬영", desc: "프로필, 화보, SNS 콘텐츠 촬영을 위한 감각적인 스튜디오", num: "02" },
  { title: "브라이덜 샤워", desc: "결혼을 앞둔 신부를 위한 특별한 브라이덜 샤워 파티", num: "03" },
  { title: "소규모 이벤트", desc: "팬미팅, 소규모 전시, 팝업 등 크리에이티브한 이벤트 공간", num: "04" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="snap-section min-h-screen flex items-center bg-electric py-32">
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.3em] text-primary-foreground/50 mb-4 font-serif-en">EXPERIENCES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground leading-tight">
            다양한 순간을 위한 공간
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-primary-foreground/20">
          {services.map((s, i) => (
            <motion.a
              key={s.num}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-primary-foreground/20 py-10 px-4 md:px-8 hover:bg-primary-foreground/5 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-[10px] tracking-[0.2em] text-primary-foreground/30 block mb-4 font-serif-en">
                {s.num}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2 group-hover:translate-x-2 transition-transform duration-300">
                {s.title}
              </h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
