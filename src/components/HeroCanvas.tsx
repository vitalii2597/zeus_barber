"use client";

import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Star {
  x: number; y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  r: number; g: number; b: number;
}

interface Bolt {
  points: [number, number][];
  branches: [number, number][][];
  opacity: number;
  phase: "in" | "hold" | "out";
  timer: number;
  holdTime: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function midpoint(
  x1: number, y1: number,
  x2: number, y2: number,
  depth: number,
  roughness: number
): [number, number][] {
  if (depth === 0) return [[x1, y1], [x2, y2]];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1; const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const offset = (Math.random() - 0.5) * len * roughness;
  const nx = -dy / len; const ny = dx / len;
  const left  = midpoint(x1, y1, mx + nx * offset, my + ny * offset, depth - 1, roughness * 0.6);
  const right = midpoint(mx + nx * offset, my + ny * offset, x2, y2, depth - 1, roughness * 0.6);
  return [...left.slice(0, -1), ...right];
}

function makeBolt(w: number, h: number): Bolt {
  // Start from top third, end in lower half
  const x1 = w * (0.15 + Math.random() * 0.7);
  const y1 = h * (0.02 + Math.random() * 0.15);
  const angle = (Math.random() - 0.5) * Math.PI * 0.5 + Math.PI * 0.5;
  const len   = h * (0.35 + Math.random() * 0.45);
  const x2 = x1 + Math.cos(angle) * len;
  const y2 = y1 + Math.sin(angle) * len;

  const points = midpoint(x1, y1, x2, y2, 6, 0.6);

  // Branches: pick 2-4 random points along bolt, fork off
  const branches: [number, number][][] = [];
  const branchCount = 2 + Math.floor(Math.random() * 3);
  for (let b = 0; b < branchCount; b++) {
    const startIdx = Math.floor(points.length * (0.2 + Math.random() * 0.5));
    const [bx, by] = points[startIdx];
    const bAngle = angle + (Math.random() - 0.5) * Math.PI * 0.6;
    const bLen   = len * (0.2 + Math.random() * 0.35);
    const bx2 = bx + Math.cos(bAngle) * bLen;
    const by2 = by + Math.sin(bAngle) * bLen;
    branches.push(midpoint(bx, by, bx2, by2, 4, 0.55));
  }

  return {
    points,
    branches,
    opacity: 0,
    phase: "in",
    timer: 0,
    holdTime: 80 + Math.random() * 120,
  };
}

function makeStars(w: number, h: number, count: number): Star[] {
  return Array.from({ length: count }, () => {
    const roll = Math.random();
    let r: number, g: number, b: number;
    if      (roll < 0.65) { r = 255; g = 255; b = 255; }
    else if (roll < 0.82) { r = 255; g = 235; b = 180; }
    else                  { r = 180; g = 210; b = 255; }

    const sizeRoll = Math.random();
    let size: number;
    if      (sizeRoll < 0.68) size = Math.random() * 0.45 + 0.15;
    else if (sizeRoll < 0.90) size = Math.random() * 0.45 + 0.60;
    else                      size = Math.random() * 0.70 + 1.05;

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      baseOpacity:   Math.random() * 0.45 + 0.35,
      twinkleSpeed:  Math.random() * 1.20 + 0.15,
      twinkleOffset: Math.random() * Math.PI * 2,
      r, g, b,
    };
  });
}

// ── Component ──────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    const startTime = Date.now();
    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 200 : 400;

    let stars: Star[] = [];
    const bolts: Bolt[] = [];
    let nextBoltAt = Date.now() + 1500;

    function resize() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
      stars = makeStars(w, h, STAR_COUNT);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Draw path helper ──────────────────────────────────────────────────
    function drawPath(pts: [number, number][]) {
      if (pts.length < 2) return;
      ctx!.beginPath();
      ctx!.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i][0], pts[i][1]);
      ctx!.stroke();
    }

    // ── Main loop ─────────────────────────────────────────────────────────
    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const elapsed = (Date.now() - startTime) / 1000;
      const now = Date.now();

      ctx!.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const twinkle = Math.sin(elapsed * s.twinkleSpeed + s.twinkleOffset);
        const opacity = Math.max(0.05, Math.min(1, s.baseOpacity + twinkle * 0.18));

        if (s.size > 1.0) {
          const g = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          g.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${opacity * 0.25})`);
          g.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${s.r},${s.g},${s.b},${opacity})`;
        ctx!.fill();
      }

      // Spawn bolt
      if (now >= nextBoltAt && bolts.length < 3) {
        bolts.push(makeBolt(w, h));
        nextBoltAt = now + 2500 + Math.random() * 3500;
      }

      // Draw bolts
      ctx!.lineJoin = "round";
      ctx!.lineCap  = "round";

      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.timer += 16;

        // Phase transitions
        if (bolt.phase === "in") {
          bolt.opacity = Math.min(1, bolt.timer / 60);
          if (bolt.opacity >= 1) { bolt.phase = "hold"; bolt.timer = 0; }
        } else if (bolt.phase === "hold") {
          bolt.opacity = 1;
          if (bolt.timer > bolt.holdTime) { bolt.phase = "out"; bolt.timer = 0; }
        } else {
          bolt.opacity = Math.max(0, 1 - bolt.timer / 280);
          if (bolt.opacity <= 0) { bolts.splice(i, 1); continue; }
        }

        const o = bolt.opacity;
        const allPaths = [bolt.points, ...bolt.branches];

        for (const pts of allPaths) {
          const isBranch = pts !== bolt.points;
          const branchFade = isBranch ? 0.65 : 1;

          // Layer 1 — wide ambient glow
          ctx!.strokeStyle = `rgba(180,200,255,${o * 0.07 * branchFade})`;
          ctx!.lineWidth = isBranch ? 18 : 28;
          drawPath(pts);

          // Layer 2 — mid glow (gold tint)
          ctx!.strokeStyle = `rgba(220,180,80,${o * 0.18 * branchFade})`;
          ctx!.lineWidth = isBranch ? 7 : 12;
          drawPath(pts);

          // Layer 3 — bright inner glow
          ctx!.strokeStyle = `rgba(255,240,160,${o * 0.55 * branchFade})`;
          ctx!.lineWidth = isBranch ? 2.5 : 4;
          drawPath(pts);

          // Layer 4 — white core
          ctx!.strokeStyle = `rgba(255,255,255,${o * 0.95 * branchFade})`;
          ctx!.lineWidth = isBranch ? 0.8 : 1.5;
          drawPath(pts);
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
