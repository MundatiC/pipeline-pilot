// index.js
document.addEventListener('DOMContentLoaded', function () {
    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        // Change emoji based on theme
        const isDark = document.body.classList.contains('dark-theme');
        themeSwitcher.textContent = isDark ? '🌓' : '🌙';
    });

    // Confetti setup
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Confetti particles
    const particles = [];
    const particleCount = 150;
    let confettiActive = false;
    let animationStartTime = 0;
    const confettiDuration = 5000; // 5 seconds of active falling
    const maxDuration = 100000; // Absolute maximum duration (100 seconds)

    // Colors for confetti
    const colors = [
        '#ff00cc', '#3333ff', '#00ccff', '#ffcc00',
        '#ff3366', '#33ffcc', '#9966ff', '#ff6633'
    ];

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            // Start some particles higher to create a staggered effect
            this.y = Math.random() * canvas.height * 2 - canvas.height * 2;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height * 2; // Start above screen
            this.diameter = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.tilt = Math.random() * 10 - 10;
            this.tiltAngle = Math.random() * 0.1;
            this.tiltAngleIncrement = Math.random() * 0.07;
            this.speed = Math.random() * 3 + 2;
            this.alive = true;
        }

        draw() {
            ctx.beginPath();
            ctx.lineWidth = this.diameter / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + (this.diameter / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.diameter / 4));
            ctx.stroke();
        }

        update() {
            this.tiltAngle += this.tiltAngleIncrement;
            this.y += this.speed;
            this.tilt = Math.sin(this.tiltAngle) * 15;

            // Mark as dead when below screen
            if (this.y > canvas.height + this.diameter) {
                this.alive = false;
            }
        }
    }

    // Initialize particles
    function initConfetti() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        animationStartTime = performance.now();
    }

    // Animation loop
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeParticles = 0;
        const currentTime = performance.now();
        const elapsed = currentTime - animationStartTime;

        // Update and draw all particles
        for (let i = 0; i < particles.length; i++) {
            if (particles[i].alive) {
                particles[i].update();
                particles[i].draw();
                activeParticles++;
            }
        }

        // Continue animation if:
        // 1. We're still within maxDuration AND
        // 2. Either:
        //    a. We're within confettiDuration (active falling period) OR
        //    b. There are still active particles falling
        if (confettiActive && elapsed < maxDuration &&
            (elapsed < confettiDuration || activeParticles > 0)) {
            requestAnimationFrame(animateConfetti);
        } else {
            // Clean up when done
            confettiActive = false;
            particles.length = 0;
        }
    }

    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function () {
        // Start confetti if not already active
        if (!confettiActive) {
            confettiActive = true;
            initConfetti();
            requestAnimationFrame(animateConfetti);
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Rest of your existing JavaScript (cursor follower, parallax cards, etc.)
    // Add cursor follower effect
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', function (e) {
        cursorFollower.style.left = (e.pageX - 15) + 'px';
        cursorFollower.style.top = (e.pageY - 15) + 'px';
    });

    // Parallax effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    document.addEventListener('mousemove', function (e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        featureCards.forEach(card => {
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    });

    // Reset cards when mouse leaves container
    document.querySelector('.features').addEventListener('mouseleave', function () {
        featureCards.forEach(card => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});