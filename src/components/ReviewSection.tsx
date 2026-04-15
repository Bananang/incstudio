import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const NAVER_REVIEW_URL =
  "https://map.naver.com/p/search/%EC%84%B1%EC%8B%A0%EC%97%AC%EB%8C%80%20%ED%8C%8C%ED%8B%B0%EB%A3%B8/place/2058907416?placePath=/review";

const reviews = [
  {
    text: "친구들 생일파티로 이용했는데 공간이 너무 예쁘고 사진도 잘 나와요! 소품도 다양하고 블루 카펫이 진짜 감성적이에요. 다음에 또 올게요!",
    author: "김**",
    date: "2025.03.15",
    rating: 5,
  },
  {
    text: "브라이덜 샤워로 예약했는데 분위기가 정말 최고였어요. 빈티지 소품들이 너무 귀엽고, 사진 찍기 좋은 포토존이 많아서 인생샷 건졌습니다!",
    author: "이**",
    date: "2025.03.08",
    rating: 5,
  },
  {
    text: "깔끔하고 관리가 잘 되어있어요. 음향 시스템도 좋고 조명도 분위기 있게 바꿀 수 있어서 파티하기 딱이에요. 가성비도 좋습니다!",
    author: "박**",
    date: "2025.02.28",
    rating: 5,
  },
  {
    text: "스튜디오 촬영으로 이용했는데 배경이 너무 예뻐서 따로 세팅할 필요가 없었어요. 오렌지 의자랑 블루 카펫 조합이 찐이에요.",
    author: "최**",
    date: "2025.02.20",
    rating: 5,
  },
  {
    text: "소규모 팬미팅으로 대여했어요. 아늑하면서도 특별한 공간이라 참석자분들 모두 좋아하셨어요. 사장님도 친절하시고 응대가 빨라요!",
    author: "정**",
    date: "2025.02.14",
    rating: 4,
  },
  {
    text: "Y2K 컨셉 촬영하기에 완벽한 공간이에요! 소품 하나하나가 다 감성적이고, 코카콜라 냉장고는 진짜 레트로 그 자체. 강추합니다!",
    author: "한**",
    date: "2025.01.30",
    rating: 5,
  },
];

// Duplicate for infinite scroll
const allReviews = [...reviews, ...reviews];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? "text-secondary" : "text-border"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const animRef = useRef<number>();
  const xRef = useRef(0);

  const CARD_WIDTH = 340;
  const GAP = 24;
  const TOTAL_WIDTH = reviews.length * (CARD_WIDTH + GAP);
  const SPEED = 0.5; // px per frame

  const animate = useCallback(() => {
    if (!isPaused && !isDragging) {
      xRef.current -= SPEED;
      if (xRef.current <= -TOTAL_WIDTH) {
        xRef.current += TOTAL_WIDTH;
      }
      controls.set({ x: xRef.current });
    }
    animRef.current = requestAnimationFrame(animate);
  }, [isPaused, isDragging, controls, TOTAL_WIDTH]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

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
            REAL REVIEW
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            고객의 이야기에 온전히
            <br />귀 기울이겠습니다.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scrolling reviews */}
      <div
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
      >
        <motion.div
          className="flex gap-6 pl-8 md:pl-16"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            xRef.current += info.offset.x;
            setIsDragging(false);
          }}
          style={{ width: "max-content" }}
        >
          {allReviews.map((review, i) => (
            <motion.a
              key={i}
              href={NAVER_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[300px] md:w-[340px] bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:shadow-lg transition-shadow duration-300 no-underline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % reviews.length) * 0.08, duration: 0.6, ease: "easeOut" }}
              onClick={(e) => {
                if (isDragging) e.preventDefault();
              }}
            >
              <StarRating rating={review.rating} />
              <p className="text-sm text-foreground/80 leading-[1.9] mt-4 mb-6 line-clamp-4">
                {review.text}
              </p>
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
    </section>
  );
};

export default ReviewSection;
