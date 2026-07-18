"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function StarFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars with 3D depth
    const starCount = Math.min(300, Math.floor((width * height) / 5000));
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 3, // depth layer 0-3
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Shooting star spawner
    const spawnShootingStar = () => {
      if (shootingStarsRef.current.length < 2) {
        shootingStarsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 60,
          speed: Math.random() * 8 + 6,
          angle: (Math.random() * 30 + 15) * (Math.PI / 180),
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30,
        });
      }
      setTimeout(spawnShootingStar, Math.random() * 6000 + 3000);
    };
    setTimeout(spawnShootingStar, 2000);

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Parallax offset from mouse
      const mx = (mouseRef.current.x / width - 0.5) * 2;
      const my = (mouseRef.current.y / height - 0.5) * 2;

      // Draw stars
      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const parallaxX = mx * (star.z + 1) * 8;
        const parallaxY = my * (star.z + 1) * 8;
        const sx = star.x + parallaxX;
        const sy = star.y + parallaxY;

        const alpha = star.opacity * twinkle;
        const sz = star.size * (1 + star.z * 0.3);

        // Glow
        if (sz > 1) {
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 3);
          gradient.addColorStop(0, `rgba(147, 197, 253, ${alpha * 0.3})`);
          gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw shooting stars
      const toRemove: number[] = [];
      shootingStarsRef.current.forEach((ss, idx) => {
        ss.life += 1;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const progress = ss.life / ss.maxLife;
        ss.opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, `rgba(147, 197, 253, 0)`);
        gradient.addColorStop(0.7, `rgba(186, 230, 253, ${ss.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Head glow
        const headGrad = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4);
        headGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity * 0.8})`);
        headGrad.addColorStop(1, `rgba(147, 197, 253, 0)`);
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life >= ss.maxLife) toRemove.push(idx);
      });
      for (let i = toRemove.length - 1; i >= 0; i--) {
        shootingStarsRef.current.splice(toRemove[i], 1);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Deep space base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(15, 23, 42, 0.8) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, rgba(30, 58, 138, 0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 50%, rgba(6, 6, 12, 1) 0%, rgba(2, 6, 23, 1) 100%)",
        }}
      />

      {/* Nebula blobs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] animate-nebula-drift"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.8), transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px] animate-nebula-drift-slow"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent 70%)",
          bottom: "-5%",
          right: "-5%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[80px] animate-nebula-drift-reverse"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.6), transparent 70%)",
          top: "40%",
          right: "20%",
        }}
      />

      {/* Solar system orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Sun center glow */}
        <div
          className="absolute w-3 h-3 rounded-full animate-sun-pulse"
          style={{
            background: "radial-gradient(circle, rgba(253, 224, 71, 0.9), rgba(251, 191, 36, 0.3) 50%, transparent 70%)",
            boxShadow: "0 0 40px 15px rgba(251, 191, 36, 0.1), 0 0 80px 30px rgba(251, 191, 36, 0.05)",
          }}
        />

        {/* Orbit 1 - Mercury */}
        <div
          className="absolute rounded-full border border-white/[0.04] animate-orbit-spin-1"
          style={{ width: 200, height: 200 }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-sky-400/60"
            style={{ top: -3, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 6px 2px rgba(56, 189, 248, 0.3)" }}
          />
        </div>

        {/* Orbit 2 - Venus */}
        <div
          className="absolute rounded-full border border-white/[0.03] animate-orbit-spin-2"
          style={{ width: 340, height: 340 }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-blue-400/50"
            style={{ top: -4, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 8px 3px rgba(96, 165, 250, 0.3)" }}
          />
        </div>

        {/* Orbit 3 - Earth */}
        <div
          className="absolute rounded-full border border-white/[0.025] animate-orbit-spin-3"
          style={{ width: 520, height: 520 }}
        >
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400/50"
            style={{ top: -5, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 10px 4px rgba(34, 211, 238, 0.3)" }}
          />
        </div>

        {/* Orbit 4 - Mars */}
        <div
          className="absolute rounded-full border border-white/[0.02] animate-orbit-spin-4"
          style={{ width: 740, height: 740 }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-sky-300/40"
            style={{ top: -4, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 8px 3px rgba(125, 211, 252, 0.2)" }}
          />
        </div>

        {/* Orbit 5 - Jupiter */}
        <div
          className="absolute rounded-full border border-white/[0.015] animate-orbit-spin-5"
          style={{ width: 1000, height: 1000 }}
        >
          <div
            className="absolute w-3 h-3 rounded-full bg-blue-300/30"
            style={{ top: -6, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 12px 5px rgba(147, 197, 253, 0.15)" }}
          />
        </div>
      </div>

      {/* Canvas star layer */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(2, 6, 23, 0.6) 100%)",
        }}
      />
    </div>
  );
}
