"use client";

import { useEffect, useRef } from "react";

interface Dot {
  restX: number;
  restY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const DOT_SPACING = 35;
const DOT_RADIUS = 2.5;
const REVEAL_RADIUS = 100;
const INFLUENCE_RADIUS = 80;
const PUSH_STRENGTH = 40;
const SPRING = 0.03;
const DAMPING = 0.85;
const SETTLE_THRESHOLD = 0.01;

export default function MagneticDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const contentBoundsRef = useRef({ left: 0, right: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function measureContentBounds() {
      const body = document.body;
      const rect = body.getBoundingClientRect();
      contentBoundsRef.current = { left: rect.left, right: rect.right };
    }

    function buildGrid() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);

      measureContentBounds();

      const cols = Math.ceil(window.innerWidth / DOT_SPACING) + 1;
      const rows = Math.ceil(window.innerHeight / DOT_SPACING) + 1;

      const offsetX =
        (window.innerWidth - (cols - 1) * DOT_SPACING) / 2;
      const offsetY =
        (window.innerHeight - (rows - 1) * DOT_SPACING) / 2;

      const dots: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rx = offsetX + c * DOT_SPACING;
          const ry = offsetY + r * DOT_SPACING;
          dots.push({ restX: rx, restY: ry, x: rx, y: ry, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    }

    function getDotColor() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--fg-muted")
        .trim();
    }

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.clearRect(0, 0, w, h);

      const color = getDotColor();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const { left, right } = contentBoundsRef.current;

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Skip dots inside the content column
        if (d.restX >= left && d.restX <= right) continue;

        const dx = d.restX - mx;
        const dy = d.restY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > REVEAL_RADIUS) continue;

        const opacity = 1 - dist / REVEAL_RADIUS;
        ctx!.globalAlpha = opacity;
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function tick() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;
      let anyMoving = false;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Push away from cursor
        const dx = d.restX - mx;
        const dy = d.restY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force =
            (1 - dist / INFLUENCE_RADIUS) * PUSH_STRENGTH;
          const nx = dx / dist;
          const ny = dy / dist;
          d.vx += nx * force * 0.1;
          d.vy += ny * force * 0.1;
        }

        // Spring back to rest
        const sx = d.restX - d.x;
        const sy = d.restY - d.y;
        d.vx += sx * SPRING;
        d.vy += sy * SPRING;

        // Damping
        d.vx *= DAMPING;
        d.vy *= DAMPING;

        d.x += d.vx;
        d.y += d.vy;

        if (
          Math.abs(d.vx) > SETTLE_THRESHOLD ||
          Math.abs(d.vy) > SETTLE_THRESHOLD ||
          Math.abs(d.x - d.restX) > SETTLE_THRESHOLD ||
          Math.abs(d.y - d.restY) > SETTLE_THRESHOLD
        ) {
          anyMoving = true;
        }
      }

      draw();

      if (anyMoving) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    }

    function startAnimation() {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animFrameRef.current = requestAnimationFrame(tick);
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      startAnimation();
    }

    function onMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      startAnimation();
    }

    function onResize() {
      buildGrid();
      draw();
    }

    function onScroll() {
      measureContentBounds();
    }

    // Handle color scheme changes
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function onColorChange() {
      draw();
    }

    buildGrid();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mouseleave", onMouseLeave);
    darkQuery.addEventListener("change", onColorChange);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      darkQuery.removeEventListener("change", onColorChange);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
