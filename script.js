const btn = document.getElementById("btnMensagem");
if (btn) {
    btn.addEventListener("click", function () {
        const msg = document.getElementById("mensagem");
        msg.textContent = "Obrigado por visitar meu portfólio! 🚀";
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("article").forEach((el) => observer.observe(el));

const photoWrap = document.getElementById("photoWrap");
const photoFrame = document.getElementById("photoFrame");
const glow = document.querySelector(".photo-glow");

if (photoWrap && photoFrame && glow) {
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    photoWrap.addEventListener("mousemove", (e) => {
        const rect = photoWrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height; // 0..1
        const rx = (0.5 - x) * 8; // rotateX/Y small
        const ry = (y - 0.5) * 8;
        photoFrame.style.transform = `perspective(600px) rotateX(${clamp(ry,-10,10)}deg) rotateY(${clamp(rx,-10,10)}deg)`;
        glow.style.setProperty('--mx', `${x*100}%`);
        glow.style.setProperty('--my', `${y*100}%`);
    });
    photoWrap.addEventListener("mouseleave", () => {
        photoFrame.style.transform = "translateZ(0)";
    });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});
