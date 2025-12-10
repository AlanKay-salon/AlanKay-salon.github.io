// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Закрываем меню на мобилке после клика
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});
// Слайдер отзывов - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let cardsPerPage = 3; // По умолчанию 3
    
    // Функция определения сколько карточек показывать
    function getCardsPerPage() {
        return window.innerWidth <= 768 ? 1 : 3;
    }
    
    // Функция обновления слайдера
    function updateSlider() {
        cardsPerPage = getCardsPerPage();
        const totalSlides = Math.ceil(reviewCards.length / cardsPerPage);
        
        // Скрываем все отзывы
        reviewCards.forEach(card => {
            card.style.display = 'none';
            card.style.opacity = '0';
        });
        
        // Показываем нужные отзывы
        for (let i = 0; i < reviewCards.length; i++) {
            if (i >= currentSlide * cardsPerPage && i < (currentSlide + 1) * cardsPerPage) {
                reviewCards[i].style.display = 'flex';
                setTimeout(() => {
                    reviewCards[i].style.opacity = '1';
                }, 50);
            }
        }
        
        // Обновляем точки
        const dotIndex = Math.min(currentSlide, dots.length - 1);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === dotIndex);
        });
        
        // Обновляем видимость кнопок
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevBtn.disabled = currentSlide === 0;
        
        nextBtn.style.opacity = currentSlide >= totalSlides - 1 ? '0.5' : '1';
        nextBtn.disabled = currentSlide >= totalSlides - 1;
    }
    
    // Инициализация слайдера
    function initSlider() {
        updateSlider();
        
        // Событие для кнопки "назад"
        prevBtn.addEventListener('click', function() {
            if (!this.disabled) {
                currentSlide--;
                updateSlider();
            }
        });
        
        // Событие для кнопки "вперёд"
        nextBtn.addEventListener('click', function() {
            if (!this.disabled) {
                currentSlide++;
                updateSlider();
            }
        });
        
        // События для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Автопрокрутка (если нужно)
        let autoSlideInterval = setInterval(function() {
            const totalSlides = Math.ceil(reviewCards.length / getCardsPerPage());
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 8000); // 8 секунд
        
        // Пауза при наведении
        const sliderContainer = document.querySelector('.reviews-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(function() {
                    const totalSlides = Math.ceil(reviewCards.length / getCardsPerPage());
                    if (currentSlide < totalSlides - 1) {
                        currentSlide++;
                    } else {
                        currentSlide = 0;
                    }
                    updateSlider();
                }, 8000);
            });
        }
        
        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            // Пересчитываем текущий слайд
            const oldCardsPerPage = cardsPerPage;
            cardsPerPage = getCardsPerPage();
            currentSlide = Math.floor((currentSlide * oldCardsPerPage) / cardsPerPage);
            updateSlider();
        });
    }
    
    // Запускаем слайдер, если есть отзывы
    if (reviewCards.length > 0) {
        initSlider();
        
        // Если отзывов 3 или меньше на десктопе, скрываем стрелки
        if (reviewCards.length <= 3 && window.innerWidth > 768) {
            document.querySelector('.reviews-navigation').style.display = 'none';
        }
        // Если отзывов 1 или меньше на мобильном, скрываем стрелки
        if (reviewCards.length <= 1 && window.innerWidth <= 768) {
            document.querySelector('.reviews-navigation').style.display = 'none';
        }
    }
});
// Простая обработка формы (заглушка)
const bookingForm = document.getElementById('booking-form');
if(bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}
