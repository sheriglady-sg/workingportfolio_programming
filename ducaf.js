"use strict";

document.addEventListener("DOMContentLoaded",() => {
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide,i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i=== index);

        });
        
        currentIndex = index;
    }

    function showNextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function showPrevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);

    }
    
    nextBtn.addEventListener("click", showNextSlide);
    prevBtn.addEventListener("click", showPrevSlide);

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.index);
            showSlide(index);
        });
    });

    showSlide(0);
});
