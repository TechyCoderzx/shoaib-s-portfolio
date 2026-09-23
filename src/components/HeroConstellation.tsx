import { useEffect, useRef } from "react";

type HeroConstellationProps = {
  imageSrc: string;
};

type Star = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  depth: number;
};

const STAR_COLORS = ["#f8f6ff", "#9f7cff", "#7252ff", "#64cfff", "#ffad72"];

function getColor(red: number, green: number, blue: number) {
  if (red > blue * 1.16 && red > green * 1.08) return STAR_COLORS[4] ?? "#ffad72";
  if (blue > red * 1.2 && green > red * 1.05) return STAR_COLORS[3] ?? "#64cfff";
  if (red + green + blue > 640) return STAR_COLORS[0] ?? "#f8f6ff";
  return Math.random() > 0.58
    ? (STAR_COLORS[1] ?? "#9f7cff")
    : (STAR_COLORS[2] ?? "#7252ff");
}

export function HeroConstellation({ imageSrc }: HeroConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    const stars: Star[] = [];
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let disposed = false;

    const imageLayout = () => {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      return { drawWidth, drawHeight, offsetX: width - drawWidth, offsetY: 0 };
    };

    const buildStars = () => {
      if (!image.naturalWidth) return;
      const sampleWidth = Math.min(720, Math.max(360, Math.round(width * 0.72)));
      const sampleHeight = Math.max(1, Math.round((sampleWidth * height) / width));
      const source = document.createElement("canvas");
      source.width = sampleWidth;
      source.height = sampleHeight;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;

      const scale = Math.max(sampleWidth / image.naturalWidth, sampleHeight / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      sourceContext.drawImage(image, sampleWidth - drawWidth, 0, drawWidth, drawHeight);
      const pixels = sourceContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const target = width < 600 || cores <= 4 ? 900 : width < 900 ? 1500 : 2300;
      const candidates: Array<{ x: number; y: number; value: number; color: string }> = [];
      const step = width < 600 ? 3 : 2;

      for (let y = 1; y < sampleHeight - 1; y += step) {
        for (let x = 1; x < sampleWidth - 1; x += step) {
          const index = (y * sampleWidth + x) * 4;
          const red = pixels[index] ?? 0;
          const green = pixels[index + 1] ?? 0;
          const blue = pixels[index + 2] ?? 0;
          const value = red * 0.2126 + green * 0.7152 + blue * 0.0722;
          const probability = Math.max(0, (value - 28) / 227);
          if (value > 34 && Math.random() < probability * probability * 0.62) {
            candidates.push({ x, y, value, color: getColor(red, green, blue) });
          }
        }
      }

      for (let index = candidates.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const current = candidates[index];
        const swap = candidates[swapIndex];
        if (!current || !swap) continue;
        candidates[index] = swap;
        candidates[swapIndex] = current;
      }

      stars.length = 0;
      for (const point of candidates.slice(0, target)) {
        const homeX = (point.x / sampleWidth) * width;
        const homeY = (point.y / sampleHeight) * height;
        const intensity = point.value / 255;
        stars.push({
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          vx: 0,
          vy: 0,
          radius: 0.45 + intensity * 1.25 + Math.random() * 0.45,
          alpha: 0.28 + intensity * 0.62,
          color: point.color,
          depth: 0.35 + Math.random() * 0.75,
        });
      }
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, cores <= 4 ? 1.25 : 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buildStars();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      pointer.active = inside;
      if (inside) {
        pointer.targetX = event.clientX - bounds.left;
        pointer.targetY = event.clientY - bounds.top;
      }
    };

    const draw = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.09;
      pointer.y += (pointer.targetY - pointer.y) * 0.09;

      const parallaxX = reducedMotion || !pointer.active ? 0 : (pointer.x / width - 0.5) * -7;
      const parallaxY = reducedMotion || !pointer.active ? 0 : (pointer.y / height - 0.5) * -5;
      const layout = imageLayout();
      context.globalAlpha = 0.72;
      context.drawImage(
        image,
        layout.offsetX + parallaxX,
        layout.offsetY + parallaxY,
        layout.drawWidth,
        layout.drawHeight,
      );
      context.globalAlpha = 1;
      context.globalCompositeOperation = "lighter";

      for (const star of stars) {
        const targetX = star.homeX + parallaxX * star.depth;
        const targetY = star.homeY + parallaxY * star.depth;
        if (!reducedMotion && pointer.active) {
          const dx = star.x - pointer.x;
          const dy = star.y - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          const radius = 115 + star.depth * 30;
          if (distanceSquared > 0.1 && distanceSquared < radius * radius) {
            const distance = Math.sqrt(distanceSquared);
            const force = (1 - distance / radius) ** 2 * 0.72 * star.depth;
            star.vx += (dx / distance) * force;
            star.vy += (dy / distance) * force;
          }
        }
        star.vx = (star.vx + (targetX - star.x) * 0.042) * 0.88;
        star.vy = (star.vy + (targetY - star.y) * 0.042) * 0.88;
        star.x += star.vx;
        star.y += star.vy;

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = star.color;
        context.globalAlpha = star.alpha;
        context.shadowColor = star.color;
        context.shadowBlur = star.radius > 1.35 ? 7 : 3;
        context.fill();
      }
      context.shadowBlur = 0;
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      if (!disposed) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    image.onload = () => {
      resize();
      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
      frame = requestAnimationFrame(draw);
    };
    image.src = imageSrc;

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [imageSrc]);

  return <canvas ref={canvasRef} className="hero-art-canvas" aria-hidden="true" />;
}