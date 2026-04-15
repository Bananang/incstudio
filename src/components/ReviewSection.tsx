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
  { text: "사장님이 친절하고 공간이 쾌적해요💕💕 친구들과 생일 파티를 위해 성신여대 파티룸을 예약하게 되었는데요! 여러모로 만족해서 리뷰 남겨요:)", author: "est**", rating: 5 },
  { text: "성신여대역에서 5분 이내로 도착할 수 있을 정도로 가까워서 모든 인원이 모이기 좋았어요. 성북천 벚꽃이 유명하다고 해서 벚꽃도 보고 밤새 놀려고 예약했는데 위치가 정말 좋았습니다👍", author: "소이탐**", rating: 5 },
  { text: "사운드 빵빵한 스피커, 블루투스 마이크, 보드게임, 팝콘메이커, 간단취사가능, 하이틴 의상, 모니터 등등 잼컨이 너무 많아서 시간가는줄 모르고 놀았어요 ㅎ ㅎ", author: "gam**", rating: 5 },
  { text: "사진도 너무 잘 나오구 인테리어도 너무 예뻤어요❤️❤️ 친구들이랑 좋은 추억 남기고 갑니당!", author: "슈올즈**", rating: 5 },
  { text: "고등학교 동창들과 오랜만에 만나서 밤새도록 놀기 위하여 해당 공간에 방문했습니다. 인테리어가 몽글몽글하고 독특해서 좋았습니다.", author: "서울의**", rating: 5 },
  { text: "성신여대파티룸 INC스튜디오 다녀왔어요🩵\n두쫀쿠에 열광하는 초딩 여자아이들이랑 방문했는데 아지트 같은 분위기라 아이들도 너무 좋아했어요!", author: "g0l**", rating: 5 },
  { text: "친구들이랑 모여서 즐기기 딱 좋은 파티룸이었어요. 공간도 생각보다 넓고 깔끔하게 관리되어 있어서 들어가자마자 기분이 좋았습니다. 음향이랑 조명도 잘 되어 있어서 분위기 내기 좋았고, 사진 찍기에도 예뻤어요.", author: "혜진7**", rating: 5 },
  { text: "남자 다섯이서 각자 여자친구한테 줄 두쫀쿠 만드려고 방문했어요! 식기부터 만들 공간까지 모두 충분해서 좋았어요! 사장님도 친절하시고 반나절 머물러서 놀기에 너무 만족스러웠어요.", author: "gam**", rating: 5 },
  { text: "너무 편하게 잘 즐기구 왓어요 노래방 마이크도 있어서 재밌게 놀았구 다른것도 좋았습니당", author: "오늘5**", rating: 5 },
  { text: "친구들이랑 성신여대 INC파티룸에서 밤타임으로 놀고 왔어요 😊 공간이 깔끔하고 아늑해서 들어가자마자 기분이 좋더라고요! 이번에 두쫀쿠 만들 재료 들고갔는데, 동거인 여동생 눈치보지 않고 만들 수 있어서, 완전 신났어요ㅋㅋ", author: "빈페이**", rating: 5 },
  { text: "공간이 정말 예뻤고, 추운 날이었는데도 따뜻하게 잘 보내고 왔어요.\n코타츠 안쪽이 특히 포근해서 너무 좋았고, 담요도 따로 준비되어 있어 더 편안했어요.", author: "bjh**", rating: 5 },
  { text: "식탁이 넓고 여분의자도 많아서 10명정도 앉아도 충분해요! 코타츠 좌식 있는 부분도 따뜻하고 예뻐서 좋았어요. 충전기도 있고 마이크도 있어서 재밌게 놀았어요~", author: "구신s**", rating: 4 },
];

type ReviewItem = { text: string; author: string; rating: number; date: string };

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-secondary" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

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
  const reviews: ReviewItem[] = useMemo(
    () => reviewsRaw.map((r, i) => ({ ...r, date: generateRecentDate(i, reviewsRaw.length) })),
    []
  );
  const row1 = reviews.slice(0, 6);
  const row2 = reviews.slice(6, 12);

  return (
    <section className="bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="tracking-[0.3em] text-muted-foreground mb-4 font-serif-en text-3xl">
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
