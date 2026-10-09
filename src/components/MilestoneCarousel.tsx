import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

export function MilestoneCarousel({ slides, interval = 5500 }: { slides: Slide[]; interval?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [active, slides.length, interval]);

  return (
    <div className="milestone-carousel">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading="lazy"
          className={i === active ? "is-active" : ""}
          aria-hidden={i !== active}
        />
      ))}
      <div className="milestone-dots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show image ${i + 1}`}
            aria-current={i === active}
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
