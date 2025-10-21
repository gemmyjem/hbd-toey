// สคริปต์หลัก: แตะที่ไหนก็ได้เพื่อเผยคำอวยพร + คอนเฟตติ
(function () {
    const app = document.getElementById('app');
    const wish = document.getElementById('wish');
    const resetBtn = document.getElementById('resetBtn');
    const confetti = document.getElementById('confetti');
    const ctx = confetti.getContext('2d');

    // ปรับขนาด canvas ให้พอดีจอ (รองรับ notch)
    function resizeCanvas() {
        confetti.width = window.innerWidth;
        confetti.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ตัวคอนเฟตติแบบเบาๆ ไม่ใช้ไลบรารี
    const pieces = [];
    const colors = ['#ff8fb6', '#ffc773', '#8fd3ff', '#b28dff', '#92ffbf', '#ffd1ea'];
    let confettiRunning = false;

    function makeConfetti(count = 140) {
        pieces.length = 0;
        for (let i = 0; i < count; i++) {
            pieces.push({
                x: Math.random() * confetti.width,
                y: -10 - Math.random() * confetti.height * 0.6,
                w: 6 + Math.random() * 8,
                h: 8 + Math.random() * 14,
                vy: 2 + Math.random() * 3,
                vx: -1 + Math.random() * 2,
                rot: Math.random() * Math.PI,
                vr: -0.2 + Math.random() * 0.4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 0.9
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, confetti.width, confetti.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            // อัปเดตตำแหน่ง
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            p.vy += 0.01;     // แรงโน้มถ่วงจิ๋ว
            if (p.y > confetti.height + 20) p.alpha -= 0.02;
        });

        // หยุดเมื่อโปร่งใสเกือบหมด
        if (pieces.some(p => p.alpha > 0.05)) {
            requestAnimationFrame(drawConfetti);
        } else {
            confettiRunning = false;
            ctx.clearRect(0, 0, confetti.width, confetti.height);
        }
    }

    function blast() {
        if (confettiRunning) return;
        confettiRunning = true;
        makeConfetti();
        requestAnimationFrame(drawConfetti);
    }

    // แตะ/คลิกที่ใดก็ได้เพื่อเผยคำอวยพร
    function reveal() {
        if (!app.classList.contains('reveal')) {
            app.classList.add('reveal');
            wish.setAttribute('aria-hidden', 'false');
            blast();
        }
    }

    // รีเซ็ตเพื่อเล่นใหม่
    function reset() {
        app.classList.remove('reveal');
        wish.setAttribute('aria-hidden', 'true');
        ctx.clearRect(0, 0, confetti.width, confetti.height);
        confettiRunning = false;
    }

    // Bind events
    app.addEventListener('click', reveal);
    app.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') reveal();
    });
    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reset();
    });
})();
