'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  originalX: number;
  originalY: number;
}

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  particleSpeed?: number;
  connectParticles?: boolean;
  connectionDistance?: number;
  connectionOpacity?: number;
  interactive?: boolean;
  interactionRadius?: number;
  interactionStrength?: number;
}

export function ParticlesBackground({
  className = '',
  particleCount = 50,
  particleColor = 'rgba(255, 255, 255, 0.5)',
  particleSize = 2,
  particleSpeed = 0.5,
  connectParticles = true,
  connectionDistance = 150,
  connectionOpacity = 0.1,
  interactive = true,
  interactionRadius = 150,
  interactionStrength = 0.5
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [adjustedParticleCount, setAdjustedParticleCount] =
    useState(particleCount);
  const prevDimensionsRef = useRef({ width: 0, height: 0 });
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializa as partículas
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < adjustedParticleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    particlesRef.current = particles;
  };

  // Atualiza a posição das partículas
  const updateParticles = (width: number, height: number) => {
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Interação com o mouse
      if (interactive && isMouseMoving) {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius) {
          // Força de repulsão
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);

          particle.x -= Math.cos(angle) * force * interactionStrength;
          particle.y -= Math.sin(angle) * force * interactionStrength;
        } else {
          // Retorna à posição original lentamente
          particle.x += (particle.originalX - particle.x) * 0.01;
          particle.y += (particle.originalY - particle.y) * 0.01;
        }
      } else {
        // Movimento normal
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Verifica os limites da tela
        if (particle.x < 0) {
          particle.x = width;
          particle.originalX = width;
        } else if (particle.x > width) {
          particle.x = 0;
          particle.originalX = 0;
        }

        if (particle.y < 0) {
          particle.y = height;
          particle.originalY = height;
        } else if (particle.y > height) {
          particle.y = 0;
          particle.originalY = 0;
        }
      }
    }
  };

  // Desenha as partículas e conexões no canvas
  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;

    // Desenha as conexões entre partículas próximas
    if (connectParticles) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle1 = particles[i];
          const particle2 = particles[j];

          // Calcula a distância entre as partículas
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Se a distância for menor que o limite, desenha uma linha
          if (distance < connectionDistance) {
            // A opacidade da linha é inversamente proporcional à distância

            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = particleColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Desenha as partículas
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }
  };

  // Loop de animação
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    updateParticles(width, height);
    drawParticles(ctx, width, height);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Manipulador de movimento do mouse
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    setIsMouseMoving(true);

    // Limpa o timeout anterior
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }

    // Define um novo timeout para parar a interação após um tempo
    mouseTimeoutRef.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 100);
  };

  // Configura o canvas e inicia a animação
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta o tamanho do canvas para o tamanho da tela
    const resizeCanvas = () => {
      // Limpa timeout anterior para evitar múltiplas reinicializações
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const prevWidth = prevDimensionsRef.current.width;
      const prevHeight = prevDimensionsRef.current.height;

      // Atualiza as dimensões do canvas
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Calcula a diferença percentual na altura
      const heightDiffPercent =
        prevHeight > 0
          ? Math.abs((newHeight - prevHeight) / prevHeight) * 100
          : 100;

      // Ajusta o número de partículas com base no tamanho da tela
      const screenWidth = window.innerWidth;

      if (screenWidth <= 480) {
        // Mobile
        setAdjustedParticleCount(Math.max(10, Math.floor(particleCount * 0.2)));
      } else if (screenWidth <= 768) {
        // Tablet
        setAdjustedParticleCount(Math.max(15, Math.floor(particleCount * 0.4)));
      } else if (screenWidth <= 1024) {
        // Small desktop
        setAdjustedParticleCount(Math.max(20, Math.floor(particleCount * 0.6)));
      } else {
        // Large desktop
        setAdjustedParticleCount(particleCount);
      }

      // Só reinicializa as partículas se:
      // 1. Primeira inicialização (prevWidth = 0)
      // 2. Mudança significativa na largura (mais de 5%)
      // 3. Mudança muito grande na altura (mais de 15%)
      const shouldReinitialize =
        prevWidth === 0 ||
        Math.abs(newWidth - prevWidth) / prevWidth > 0.05 ||
        heightDiffPercent > 15;

      if (shouldReinitialize) {
        // Aguarda um curto período antes de reinicializar para evitar múltiplas reinicializações durante scroll no iOS
        resizeTimeoutRef.current = setTimeout(() => {
          initParticles(newWidth, newHeight);
          // Atualiza as dimensões anteriores
          prevDimensionsRef.current = { width: newWidth, height: newHeight };
        }, 100);
      } else if (particlesRef.current.length > 0) {
        // Apenas ajusta as partículas existentes para o novo tamanho da tela
        adjustParticlesToNewDimensions(
          prevWidth,
          prevHeight,
          newWidth,
          newHeight
        );
        // Atualiza as dimensões anteriores
        prevDimensionsRef.current = { width: newWidth, height: newHeight };
      }
    };

    // Ajusta as partículas existentes para o novo tamanho sem reinicializar
    const adjustParticlesToNewDimensions = (
      oldWidth: number,
      oldHeight: number,
      newWidth: number,
      newHeight: number
    ) => {
      const widthRatio = newWidth / oldWidth;
      const heightRatio = newHeight / oldHeight;

      particlesRef.current.forEach((particle) => {
        // Ajusta proporcionalmente as posições das partículas
        particle.x *= widthRatio;
        particle.y *= heightRatio;
        particle.originalX *= widthRatio;
        particle.originalY *= heightRatio;
      });
    };

    // Inicializa o canvas
    resizeCanvas();

    // Adiciona listeners
    window.addEventListener('resize', resizeCanvas);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Inicia a animação
    animate();

    // Limpa os listeners e a animação ao desmontar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    particleCount,
    particleColor,
    particleSize,
    particleSpeed,
    connectParticles,
    connectionDistance,
    connectionOpacity,
    interactive,
    interactionRadius,
    interactionStrength,
    adjustedParticleCount
  ]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full ${
        interactive ? '' : 'pointer-events-none'
      } z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
