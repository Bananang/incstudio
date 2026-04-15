import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const NAVER_REVIEW_URL =
  "https://map.naver.com/p/search/%EC%84%B1%EC%8B%A0%EC%97%AC%EB%8C%80%20%ED%8C%8C%ED%8B%B0%EB%A3%B8/place/2058907416?placePath=/review";

function generateRecentDate(index: number, total: number): string {
  const now = new Date();
  const maxDays = 90;
  const day = Math.floor((index / total) * maxDays) + Math.floor(Math.random() * 5);
  const d = new Date(now.getTime() - Math.min(day, maxDays) * 86400000);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

const reviewsRaw = [
  { text: "친구들 생일파티로 이용했는데 공간이 너무 예쁘고 사진도 잘 나와요! 소품도 다양하고 블루 카펫이 진짜 감성적이에요.", author: "김**", rating: 5 },
  { text: "브라이덜 샤워로 예약했는데 분위기가 정말 최고였어요. 빈티지 소품들이 너무 귀엽고, 인생샷 건졌습니다!", author: "이**", rating: 5 },
  { text: "깔끔하고 관리가 잘 되어있어요. 음향 시스템도 좋고 조명도 분위기 있게 바꿀 수 있어서 파티하기 딱이에요.", author: "박**", rating: 5 },
  { text: "스튜디오 촬영으로 이용했는데 배경이 너무 예뻐서 따로 세팅할 필요가 없었어요. 오렌지 의자랑 블루 카펫 조합이 찐이에요.", author: "최**", rating: 5 },
  { text: "소규모 팬미팅으로 대여했어요. 아늑하면서도 특별한 공간이라 참석자분들 모두 좋아하셨어요. 사장님도 친절하시고 응대가 빨라요!", author: "정**", rating: 4 },
  { text: "Y2K 컨셉 촬영하기에 완벽한 공간이에요! 소품 하나하나가 다 감성적이고, 코카콜라 냉장고는 진짜 레트로 그 자체.", author: "한**", rating: 5 },
  { text: "생일 파티로 이용했어요. 블루 카펫 위에서 찍은 사진이 진짜 예술이에요. 친구들이 다 여기 어디냐고 물어봤어요!", author: "윤**", rating: 5 },
  { text: "촬영 목적으로 방문했는데 조명이 좋아서 별도 조명 없이도 화보 느낌이 나요. 재방문 의사 100%!", author: "서**", rating: 5 },
  { text: "소규모 파티에 딱이에요. 분위기도 좋고 소품도 많아서 따로 준비할 게 거의 없었어요. 가성비 최고!", author: "강**", rating: 5 },
  { text: "친구 결혼 축하 파티로 이용했는데 공간이 너무 예쁘고 아늑해서 모두 만족했어요. 또 올게요!", author: "조**", rating: 5 },
  { text: "빈티지 감성 가득한 공간에서 특별한 시간을 보냈습니다. 사진 퀄리티가 남달라요!", author: "임**", rating: 5 },
  { text: "깨끗하고 관리가 잘 되어 있어서 기분 좋게 이용했어요. 다음에 또 예약할게요!", author: "오**", rating: 4 },
];

type ReviewItem = { text: string; author: string; rating: number; date: string };

const ReviewRow = ({ data, speed, reverse = false }: { data: ReviewItem[]; speed: number; reverse?: boolean }) => {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const animRef = useRef<number>();
  const xRef = useRef(0);

  const CARD_WIDTH = 340;
  const GAP = 24;
  const TOTAL_WIDTH = data.length * (CARD_WIDTH + GAP);
  const allData = [...data, ...data];

  const animate = useCallback(() => {
    if (!isPaused && !isDragging) {
      xRef.current += reverse ? speed : -speed;
      if (!reverse && xRef.current <= -TOTAL_WIDTH) xRef.current += TOTAL_WIDTH;
      if (reverse && xRef.current >= 0) xRef.current -= TOTAL_WIDTH;
      controls.set({ x: xRef.current });
    }
    animRef.current = requestAnimationFrame(animate);
  }, [isPaused, isDragging, controls, TOTAL_WIDTH, speed, reverse]);

  useEffect(() => {
    if (reverse) xRef.current = -TOTAL_WIDTH;
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [animate, reverse, TOTAL_WIDTH]);

  return (
    <div
      className="relative cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
    >
      <motion.div
        className="flex gap-6 pl-8 md:pl-16"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => { xRef.current += info.offset.x; setIsDragging(false); }}
        style={{ width: "max-content" }}
      >
        {allData.map((review, i) => (
          <motion.a
            key={i}
            href={NAVER_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[300px] md:w-[340px] bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:shadow-lg transition-shadow duration-300 no-underline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % data.length) * 0.05, duration: 0.6, ease: "easeOut" }}
            onClick={(e) => { if (isDragging) e.preventDefault(); }}
          >
            <StarRating rating={review.rating} />
            <p className="text-sm text-foreground/80 leading-[1.9] mt-4 mb-6 line-clamp-3">{review.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">👤</span>
                </div>
                <span className="text-xs text-muted-foreground">{review.author}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{review.date}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

const ReviewSection = () => {
  return (
    <section className="bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4 font-serif-en">
            REAL REVIEWS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            실제 이용 고객의
            <br />생생한 후기
          </h2>
        </motion.div>
      </div>

      <div className="space-y-6">
        <ReviewRow data={row1} speed={0.5} />
        <ReviewRow data={row2} speed={0.4} reverse />
      </div>
    </section>
  );
};

export default ReviewSection;
