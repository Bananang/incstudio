import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 8}px`;
      cursor.style.top = `${e.clientY - 8}px`;
    };

    const onEnterText = () => cursor.classList.add("expanded");
    const onLeaveText = () => cursor.classList.remove("expanded");

    window.addEventListener("mousemove", onMove);

    const observe = () => {
      document.querySelectorAll("h1, h2, h3, h4, p, a, span, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnterText);
        el.addEventListener("mouseleave", onLeaveText);
      });
    };

    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

export default CustomCursor;
