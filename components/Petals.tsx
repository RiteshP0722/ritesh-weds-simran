"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

// Auspicious Marigold (Genda) + Rose (Gulab) petals + Gold Dust sparkles
const PETAL_COLORS = [
  "#f4b6c2", // Blush Rose
  "#e88fa3", // Pink Rose
  "#d4566e", // Deep Rose
  "#f6c453", // Marigold
  "#f2a516", // Marigold Orange
  "#fff1c9", // Jasmine
];

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  flip: number;
  vFlip: number;
  sway: number;
  isGlitter: boolean;
};

export default function Petals() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0, raf = 0;

    // Fills its parent (the hero), so petals never fall over the invitation text
    const resize = () => {
      const box = canvas.parentElement?.getBoundingClientRect();
      W = canvas.width = (box?.width || window.innerWidth) * dpr;
      H = canvas.height = (box?.height || window.innerHeight) * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (initialY?: number): Particle => {
      const isGlitter = Math.random() < 0.25;
      return {
        x: Math.random() * W,
        y: initialY !== undefined ? initialY : -25,
        size: isGlitter ? (2 + Math.random() * 3) * dpr : (7 + Math.random() * 9) * dpr,
        color: isGlitter ? "#fff2a8" : PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        vx: (Math.random() - 0.5) * 0.6,
        vy: (isGlitter ? 0.3 + Math.random() * 0.5 : 0.8 + Math.random() * 1.1) * dpr,
        rotation: Math.random() * 6.28,
        vRot: (Math.random() - 0.5) * 0.05,
        flip: Math.random() * 6.28,
        vFlip: 0.02 + Math.random() * 0.04,
        sway: Math.random() * 6.28,
        isGlitter,
      };
    };

    const count = 22;
    const particles: Particle[] = Array.from({ length: count }, () => createParticle(Math.random() * H));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.sway += 0.025;
        p.flip += p.vFlip;
        p.rotation += p.vRot;
        p.x += p.vx + Math.sin(p.sway) * 0.7;
        p.y += p.vy;

        if (p.y > H + 30) {
          particles[i] = createParticle(-20);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isGlitter) {
          // Shimmering Golden Star/Diamond Speck
          const alpha = 0.4 + Math.sin(p.flip * 3) * 0.45;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, alpha);
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Rose & Marigold Petal with 3D flip
          ctx.scale(Math.cos(p.flip), 1);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.5, p.size * 0.65, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.65, p.size * 0.5, -p.size * 0.6, -p.size * 0.5, 0, -p.size);
          ctx.fill();
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="petals" ref={ref} aria-hidden="true" />;
}
