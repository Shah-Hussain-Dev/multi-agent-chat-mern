import { useEffect, useRef } from 'react';

export const Auth3DBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        // Particle System
        const numParticles = Math.min(Math.floor(width / 25), 65);
        const particles: Array<{
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
        }> = [];

        const colors = ['rgba(16, 185, 129, ', 'rgba(20, 184, 166, ', 'rgba(99, 102, 241, '];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2.5 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        // Mouse interaction
        let mouseX = width / 2;
        let mouseY = height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines between close particles
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                
                // Move particle
                p1.x += p1.vx + (mouseX - width / 2) * 0.00005 * p1.z;
                p1.y += p1.vy + (mouseY - height / 2) * 0.00005 * p1.z;

                // Bounce off edges
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                // Draw Particle Node
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius * p1.z, 0, Math.PI * 2);
                ctx.fillStyle = `${p1.color}${0.5 * p1.z})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = p1.color + '0.8)';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Connect nearby nodes
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        const alpha = (1 - dist / 130) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-60"
        />
    );
};

export default Auth3DBackground;
