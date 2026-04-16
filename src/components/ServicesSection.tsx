import { motion } from "framer-motion";

const BOOKING_URL = "https://naver.me/xU4uKO9c";

const services = [
  { title: "파티 & 브라이덜(Private Celebration)", desc: "생일파티, 기념일, 브라이덜 샤워 등 소중한 순간을 더욱 특별하게 만들어주는 프라이빗 공간", num: "01" },
  { title: "크리에이티브 스튜디오(Creative Studio)", desc: "프로필, 화보, SNS 콘텐츠와 브이로그 촬영이 가능한 감각적인 세트와 소품이 갖춰진 공간", num: "02" },
  { title: "소규모 모임(Social Gathering)", desc: "동아리, 독서 모임, 팬콘서트 시청, 친구 모임 등 다양한 소셜 활동을 위한 편안한 공간", num: "03" },
  { title: "쿠킹 & 다이닝(Cooking & Dining)", desc: "다양한 주방도구와 식기 완비로 직접 요리부터 식사까지 가능한 브런치·홈파티 공간", num: "04" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="snap-section min-h-screen flex items-center py-32 bg-[#407bce]">
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="tracking-[0.3em] text-primary-foreground/50 mb-4 font-serif-en text-3xl">EXPERIENCES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground leading-tight">
            다양한 순간을 위한 공간
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-primary-foreground/20">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              className="block border-b border-primary-foreground/20 py-10 px-4 md:px-8 hover:bg-primary-foreground/5 hover:scale-[1.02] transition-all duration-500 origin-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <span className="tracking-[0.2em] text-primary-foreground/30 block mb-4 font-serif-en text-lg">
                {s.num}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
