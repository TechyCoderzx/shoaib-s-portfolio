import { useEffect, useRef } from "react";

type SpringSettings = {
  stiffness?: number;
  damping?: number;
};

type ParticlePortraitProps = {
  imageSrc: string;
  particleCount?: number;
  colors?: string[];
  particleSize?: number;
  interactionRadius?: number;
  repulsionStrength?: number;
  returnSpeed?: number | SpringSettings;
  animationSpeed?: number;
  className?: string;
};

type Particle = {
  originalX: number;
  originalY: number;
  currentX: number;
  currentY: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  color: string;
  phase: number;
};

const DEFAULT_COLORS = ["#24245f", "#51318d", "#7d40ce", "#ae4add", "#e45acb"];
const ACCENTS = ["#4de9ff", "#ff4ecb"];
const DEFAULT_SPRING: SpringSettings = { stiffness: 0.035, damping: 0.88 };

function parseHex(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized.length === 3 ? normalized.replace(/(.)/g, "$1$1") : normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ParticlePortrait({
  imageSrc,
  particleCount,
  colors = DEFAULT_COLORS,
  particleSize = 1,
  interactionRadius = 145,
  repulsionStrength = 1.35,
  returnSpeed = DEFAULT_SPRING,
  animationSpeed = 0.001,
  className = "",
}: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    let frame = 0;
    let disposed = false;
    let cssWidth = 0;
    let cssHeight = 0;
    let dpr = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;

    const getTargetCount = () => {
      if (particleCount) return particleCount;
      if (window.innerWidth < 560 || cores <= 4) return 6500;
      if (window.innerWidth < 900 || cores <= 6) return 9000;
      return 13000;
    };

    const buildParticles = () => {
      if (!image.naturalWidth || !cssWidth || !cssHeight) return;
      const sampleWidth = Math.min(520, Math.max(260, Math.round(cssWidth)));
      const sampleHeight = Math.max(1, Math.round((sampleWidth * cssHeight) / cssWidth));
      const source = document.createElement("canvas");
      source.width = sampleWidth;
      source.height = sampleHeight;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;

      const scale = Math.min(sampleWidth / image.naturalWidth, sampleHeight / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const offsetX = (sampleWidth - drawWidth) / 2;
      const offsetY = (sampleHeight - drawHeight) / 2;
      sourceContext.clearRect(0, 0, sampleWidth, sampleHeight);
      sourceContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      const pixels = sourceContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const length = sampleWidth * sampleHeight;
      const luminance = new Float32Array(length);
      const alpha = new Float32Array(length);
      for (let index = 0; index < length; index += 1) {
        const pixel = index * 4;
        luminance[index] =
          ((pixels[pixel] ?? 0) * 0.2126 +
            (pixels[pixel + 1] ?? 0) * 0.7152 +
            (pixels[pixel + 2] ?? 0) * 0.0722) /
          255;
        alpha[index] = (pixels[pixel + 3] ?? 0) / 255;
      }

      const edge = new Float32Array(length);
      for (let y = 1; y < sampleHeight - 1; y += 1) {
        for (let x = 1; x < sampleWidth - 1; x += 1) {
          const index = y * sampleWidth + x;
          if ((alpha[index] ?? 0) < 0.04) continue;
          const topLeft = luminance[index - sampleWidth - 1] ?? 0;
          const top = luminance[index - sampleWidth] ?? 0;
          const topRight = luminance[index - sampleWidth + 1] ?? 0;
          const left = luminance[index - 1] ?? 0;
          const right = luminance[index + 1] ?? 0;
          const bottomLeft = luminance[index + sampleWidth - 1] ?? 0;
          const bottom = luminance[index + sampleWidth] ?? 0;
          const bottomRight = luminance[index + sampleWidth + 1] ?? 0;
          const gx = -topLeft + topRight - 2 * left + 2 * right - bottomLeft + bottomRight;
          const gy = -topLeft - 2 * top - topRight + bottomLeft + 2 * bottom + bottomRight;
          edge[index] = Math.min(1, Math.hypot(gx, gy) * 0.72);
        }
      }

      const target = getTargetCount();
      const selected = new Set<number>();
      const maxAttempts = target * 24;
      let attempts = 0;
      while (selected.size < target && attempts < maxAttempts) {
        attempts += 1;
        const x = 1 + Math.floor(Math.random() * (sampleWidth - 2));
        const y = 1 + Math.floor(Math.random() * (sampleHeight - 2));
        const index = y * sampleWidth + x;
        if (selected.has(index) || (alpha[index] ?? 0) < 0.08) continue;
        const light = luminance[index] ?? 0;
        const midtone = 1 - Math.abs(light - 0.5) * 2;
        const detail = edge[index] ?? 0;
        const probability = Math.min(
          0.96,
          0.08 + detail * 0.72 + midtone * 0.25 + light * 0.18,
        );
        if (Math.random() < probability) selected.add(index);
      }

      const scaleX = cssWidth / sampleWidth;
      const scaleY = cssHeight / sampleHeight;
      const now = performance.now();
      particlesRef.current = Array.from(selected, (index) => {
        const x = index % sampleWidth;
        const y = Math.floor(index / sampleWidth);
        const light = luminance[index] ?? 0;
        const detail = edge[index] ?? 0;
        const paletteIndex = Math.min(colors.length - 1, Math.floor(light * colors.length));
        const accent = Math.random() < 0.035 + detail * 0.045;
        const originalX = (x + (Math.random() - 0.5) * 0.8) * scaleX;
        const originalY = (y + (Math.random() - 0.5) * 0.8) * scaleY;
        const entranceDistance = reducedMotion ? 0 : 26 + Math.random() * 115;
        const angle = Math.random() * Math.PI * 2;
        return {
          originalX,
          originalY,
          currentX: originalX + Math.cos(angle) * entranceDistance,
          currentY: originalY + Math.sin(angle) * entranceDistance,
          vx: 0,
          vy: 0,
          size: particleSize * (0.55 + (1 - detail) * 0.72 + Math.random() * 0.35),
          baseOpacity: Math.min(0.98, 0.24 + light * 0.58 + detail * 0.18),
          color: accent
            ? (ACCENTS[Math.random() < 0.5 ? 0 : 1] ?? "#ff4ecb")
            : (colors[paletteIndex] ?? DEFAULT_COLORS[2] ?? "#7d40ce"),
          phase: Math.random() * Math.PI * 2 + now * animationSpeed,
        };
      });
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, bounds.width);
      cssHeight = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, cores <= 4 ? 1.25 : 1.75);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const draw = (time: number) => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = "#050508";
      context.fillRect(0, 0, cssWidth, cssHeight);
      context.globalCompositeOperation = "lighter";
      const pointer = pointerRef.current;
      const radiusSquared = interactionRadius * interactionRadius;
      const spring = typeof returnSpeed === "number" ? returnSpeed : (returnSpeed.stiffness ?? 0.035);
      const damping = typeof returnSpeed === "number" ? 0.88 : (returnSpeed.damping ?? 0.88);
      const driftTime = time * animationSpeed;

      for (const particle of particlesRef.current) {
        const idleX = reducedMotion ? 0 : Math.sin(driftTime + particle.phase) * 0.85;
        const idleY = reducedMotion ? 0 : Math.cos(driftTime * 0.82 + particle.phase) * 0.75;
        const targetX = particle.originalX + idleX;
        const targetY = particle.originalY + idleY;

        if (!reducedMotion && pointer.active) {
          const dx = particle.currentX - pointer.x;
          const dy = particle.currentY - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radiusSquared && distanceSquared > 0.01) {
            const distance = Math.sqrt(distanceSquared);
            const falloff = 1 - distance / interactionRadius;
            const force = falloff * falloff * repulsionStrength;
            const tangent = Math.sin(particle.phase + time * 0.002) * force * 0.22;
            particle.vx += (dx / distance) * force - (dy / distance) * tangent;
            particle.vy += (dy / distance) * force + (dx / distance) * tangent;
          }
        }

        particle.vx = (particle.vx + (targetX - particle.currentX) * spring) * damping;
        particle.vy = (particle.vy + (targetY - particle.currentY) * spring) * damping;
        particle.currentX += particle.vx;
        particle.currentY += particle.vy;

        context.beginPath();
        context.arc(particle.currentX, particle.currentY, particle.size, 0, Math.PI * 2);
        context.fillStyle = rgba(
          particle.color,
          particle.baseOpacity * (0.88 + Math.sin(driftTime * 1.7 + particle.phase) * 0.12),
        );
        context.fill();
      }
      context.globalCompositeOperation = "source-over";
      if (!disposed) frame = requestAnimationFrame(draw);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        active: true,
      };
    };
    const clearPointer = () => {
      pointerRef.current.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", updatePointer, { passive: true });
    canvas.addEventListener("pointerdown", updatePointer, { passive: true });
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("pointercancel", clearPointer);
    image.onload = () => {
      resize();
      frame = requestAnimationFrame(draw);
    };
    image.src = imageSrc;

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerdown", updatePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("pointercancel", clearPointer);
    };
  }, [animationSpeed, colors, imageSrc, interactionRadius, particleCount, particleSize, repulsionStrength, returnSpeed]);

  return (
    <div className={`particle-portrait ${className}`}>
      <canvas
        ref={canvasRef}
        aria-label="Interactive particle portrait of Shoaib Junaid Khan"
        role="img"
      />
    </div>
  );
}