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
// Слайдер отзывов
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const cardsPerPage = 3; // Сколько отзывов показывать одновременно
    
    // Функция обновления слайдера
    function updateSlider() {
        // Скрываем все отзывы
        reviewCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Показываем нужные отзывы
        for (let i = currentSlide; i < currentSlide + cardsPerPage && i < reviewCards.length; i++) {
            if (reviewCards[i]) {
                reviewCards[i].style.display = 'flex';
            }
        }
        
        // Обновляем точки
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', Math.floor(index / cardsPerPage) === Math.floor(currentSlide / cardsPerPage));
        });
        
        // Обновляем видимость кнопок
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentSlide >= reviewCards.length - cardsPerPage ? '0.5' : '1';
        nextBtn.style.cursor = currentSlide >= reviewCards.length - cardsPerPage ? 'default' : 'pointer';
    }
    
    // Инициализация слайдера
    function initSlider() {
        // На десктопе показываем 3, на мобильных 1
        const isMobile = window.innerWidth <= 768;
        cardsPerPage = isMobile ? 1 : 3;
        
        updateSlider();
        
        // Событие для кнопки "назад"
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide -= cardsPerPage;
                if (currentSlide < 0) currentSlide = 0;
                updateSlider();
            }
        });
        
        // Событие для кнопки "вперёд"
        nextBtn.addEventListener('click', function() {
            if (currentSlide < reviewCards.length - cardsPerPage) {
                currentSlide += cardsPerPage;
                updateSlider();
            }
        });
        
        // События для точек
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                currentSlide = slideIndex - (slideIndex % cardsPerPage);
                updateSlider();
            });
        });
        
        // Автопрокрутка каждые 5 секунд
        setInterval(function() {
            if (currentSlide < reviewCards.length - cardsPerPage) {
                currentSlide += cardsPerPage;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
        
        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            const wasMobile = cardsPerPage === 1;
            const isMobileNow = window.innerWidth <= 768;
            
            if (wasMobile !== isMobileNow) {
                cardsPerPage = isMobileNow ? 1 : 3;
                currentSlide = 0;
                updateSlider();
            }
        });
    }
    
    // Запускаем слайдер, если есть отзывы
    if (reviewCards.length > 0) {
        initSlider();
    }
    
    // Форма для добавления отзыва (упрощённая)
    const reviewForm = document.createElement('div');
    reviewForm.className = 'add-review-form';
    reviewForm.innerHTML = `
        <div class="form-container" style="display: none;">
            <h3>Оставить отзыв</h3>
            <form id="reviewForm">
                <input type="text" placeholder="Ваше имя" required>
                <input type="email" placeholder="Ваш email">
                <div class="rating-input">
                    <span>Оценка:</span>
                    <div class="stars">
                        <i class="far fa-star" data-rating="1"></i>
                        <i class="far fa-star" data-rating="2"></i>
                        <i class="far fa-star" data-rating="3"></i>
                        <i class="far fa-star" data-rating="4"></i>
                        <i class="far fa-star" data-rating="5"></i>
                    </div>
                </div>
                <textarea placeholder="Ваш отзыв" rows="4" required></textarea>
                <button type="submit" class="btn btn--primary">Отправить отзыв</button>
            </form>
        </div>
    `;
    
    // Добавляем форму на страницу
    document.querySelector('.reviews-cta').appendChild(reviewForm);
    
    // Обработка клика на "Оставить отзыв"
    document.querySelector('.reviews-cta .btn').addEventListener('click', function(e) {
        e.preventDefault();
        const formContainer = document.querySelector('.form-container');
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    });
    
    // Рейтинг звёздами
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
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
