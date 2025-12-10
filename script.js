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

// ФОРМА ОТЗЫВА - НОВЫЙ КОД
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли на странице элементы формы отзыва
    const openReviewBtn = document.getElementById('openReviewForm');
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    const reviewForm = document.getElementById('reviewForm');
    
    if (!openReviewBtn || !reviewFormContainer) {
        console.log('Элементы формы отзыва не найдены');
        return;
    }
    
    console.log('Инициализация формы отзыва...');
    
    // 1. ОТКРЫТИЕ ФОРМЫ ОТЗЫВА
    openReviewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Клик по кнопке "Оставить отзыв"');
        
        // Показываем форму
        reviewFormContainer.style.display = 'block';
        
        // Плавная прокрутка к форме
        setTimeout(() => {
            reviewFormContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
        
        // Фокус на первое поле
        const nameInput = document.getElementById('reviewName');
        if (nameInput) {
            setTimeout(() => nameInput.focus(), 300);
        }
    });
    
    // 2. ЗАКРЫТИЕ ФОРМЫ
    const closeReviewBtn = document.getElementById('closeReviewForm');
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener('click', function() {
            console.log('Закрытие формы отзыва');
            closeReviewForm();
        });
    }
    
    // Закрытие при клике вне формы (опционально)
    document.addEventListener('click', function(e) {
        if (reviewFormContainer.style.display === 'block' && 
            !reviewFormContainer.contains(e.target) && 
            e.target !== openReviewBtn) {
            closeReviewForm();
        }
    });
    
    // 3. РЕЙТИНГ ЗВЁЗДАМИ
    let selectedRating = 0;
    const stars = document.querySelectorAll('.stars i');
    const ratingText = document.getElementById('ratingText');
    
    // Инициализация звёзд
    function initStars() {
        console.log('Инициализация звёзд рейтинга');
        
        stars.forEach(star => {
            // Клик по звезде
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-rating'));
                console.log('Выбрана оценка:', selectedRating);
                updateStars(selectedRating);
                updateRatingText(selectedRating);
            });
            
            // Наведение на звезду
            star.addEventListener('mouseover', function() {
                const hoverRating = parseInt(this.getAttribute('data-rating'));
                updateStars(hoverRating, true);
            });
            
            // Уход мыши
            star.addEventListener('mouseout', function() {
                updateStars(selectedRating, false);
            });
        });
    }
    
    // Обновление отображения звёзд
    function updateStars(rating, isHover = false) {
        stars.forEach((star, index) => {
            const starRating = index + 1;
            
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.style.color = isHover ? '#ffc107' : '#ffc107';
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                star.style.color = isHover ? '#ddd' : '#ddd';
            }
        });
    }
    
    // Обновление текста оценки
    function updateRatingText(rating) {
        if (!ratingText) return;
        
        const ratingTexts = {
            1: 'Плохо',
            2: 'Удовлетворительно',
            3: 'Нормально',
            4: 'Хорошо',
            5: 'Отлично!'
        };
        
        ratingText.textContent = ratingTexts[rating] || 'Поставьте оценку';
        ratingText.style.color = rating >= 4 ? '#4CAF50' : 
                                rating >= 3 ? '#FF9800' : 
                                '#F44336';
    }
    
    // Сброс звёзд
    function resetStars() {
        selectedRating = 0;
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
            star.style.color = '#ddd';
        });
        if (ratingText) {
            ratingText.textContent = 'Поставьте оценку';
            ratingText.style.color = '#666';
        }
    }
    
    // 4. ОТПРАВКА ФОРМЫ
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы отзыва');
            
            // Сбор данных
            const formData = {
                name: document.getElementById('reviewName').value.trim(),
                email: document.getElementById('reviewEmail').value.trim(),
                rating: selectedRating,
                text: document.getElementById('reviewText').value.trim(),
                service: document.getElementById('reviewService').value,
                date: new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
            };
            
            console.log('Данные формы:', formData);
            
            // ВАЛИДАЦИЯ
            let isValid = true;
            let errorMessage = '';
            
            // Проверка имени
            if (!formData.name) {
                isValid = false;
                errorMessage = 'Пожалуйста, введите ваше имя';
                highlightError('reviewName');
            } else {
                removeError('reviewName');
            }
            
            // Проверка оценки
            if (formData.rating === 0) {
                isValid = false;
                errorMessage = 'Пожалуйста, поставьте оценку';
                if (ratingText) {
                    ratingText.style.color = '#F44336';
                }
            }
            
            // Проверка текста отзыва
            if (!formData.text) {
                isValid = false;
                errorMessage = 'Пожалуйста, напишите текст отзыва';
                highlightError('reviewText');
            } else {
                removeError('reviewText');
            }
            
            if (!isValid) {
                showAlert(errorMessage, 'error');
                return;
            }
            
            // ПОКАЗАТЬ ЗАГРУЗКУ
            showLoading();
            
            // ИМИТАЦИЯ ОТПРАВКИ НА СЕРВЕР
            setTimeout(() => {
                // В реальном проекте здесь будет fetch или axios
                console.log('Отправка данных на сервер...', formData);
                
                // УСПЕШНАЯ ОТПРАВКА
                showSuccessMessage(formData.name);
                
                // Очистка формы
                resetForm();
                
                // Сохранение в localStorage (для демо)
                saveReviewToLocalStorage(formData);
                
            }, 1500); // Имитация задержки сети
            
        });
    }
    
    // 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    
    // Показать загрузку
    function showLoading() {
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
        }
    }
    
    // Показать успешное сообщение
    function showSuccessMessage(userName) {
        const successHTML = `
            <div class="review-success">
                <i class="fas fa-check-circle"></i>
                <h4>Спасибо, ${userName}!</h4>
                <p>Ваш отзыв успешно отправлен.</p>
                <p>После проверки модератором он появится на сайте.</p>
                <p><em>Мы ценим ваше мнение!</em></p>
                <button id="closeSuccess" class="btn btn--primary" style="margin-top: 20px;">
                    Закрыть
                </button>
            </div>
        `;
        
        reviewFormContainer.innerHTML = successHTML;
        
        // Кнопка закрытия успешного сообщения
        document.getElementById('closeSuccess').addEventListener('click', function() {
            closeReviewForm();
        });
        
        // Автозакрытие через 8 секунд
        setTimeout(() => {
            if (reviewFormContainer.innerHTML.includes('review-success')) {
                closeReviewForm();
            }
        }, 8000);
    }
    
    // Сохранение в localStorage (для демонстрации)
    function saveReviewToLocalStorage(review) {
        try {
            let reviews = JSON.parse(localStorage.getItem('alanKayReviews') || '[]');
            reviews.push({
                ...review,
                id: Date.now(),
                status: 'pending' // на модерации
            });
            localStorage.setItem('alanKayReviews', JSON.stringify(reviews));
            console.log('Отзыв сохранён в localStorage:', reviews.length, 'всего');
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }
    
    // Сброс формы
    function resetForm() {
        if (reviewForm) {
            reviewForm.reset();
            resetStars();
            
            // Восстанавливаем кнопку отправки
            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить отзыв';
                submitBtn.disabled = false;
            }
        }
    }
    
    // Закрытие формы
    function closeReviewForm() {
        reviewFormContainer.style.display = 'none';
        resetForm();
        
        // Восстанавливаем оригинальную форму
        if (!reviewFormContainer.querySelector('#reviewForm')) {
            restoreOriginalForm();
        }
    }
    
    // Восстановление оригинальной формы
    function restoreOriginalForm() {
        const originalFormHTML = `
            <div class="review-form">
                <h3>Напишите ваш отзыв</h3>
                <form id="reviewForm">
                    <div class="form-row">
                        <input type="text" placeholder="Ваше имя" id="reviewName" required>
                        <input type="email" placeholder="Ваш email" id="reviewEmail">
                    </div>
                    
                    <div class="rating-input">
                        <span>Ваша оценка:</span>
                        <div class="stars">
                            <i class="far fa-star" data-rating="1"></i>
                            <i class="far fa-star" data-rating="2"></i>
                            <i class="far fa-star" data-rating="3"></i>
                            <i class="far fa-star" data-rating="4"></i>
                            <i class="far fa-star" data-rating="5"></i>
                        </div>
                        <span id="ratingText" class="rating-text">Поставьте оценку</span>
                    </div>
                    
                    <textarea placeholder="Расскажите о вашем опыте посещения нашего салона..." 
                              rows="5" id="reviewText" required></textarea>
                    
                    <select id="reviewService">
                        <option value="">Выберите услугу</option>
                        <option value="Классический массаж">Классический массаж</option>
                        <option value="Спортивный массаж">Спортивный массаж</option>
                        <option value="Антицеллюлитный массаж">Антицеллюлитный массаж</option>
                        <option value="Лимфодренажный массаж">Лимфодренажный массаж</option>
                        <option value="Медовый массаж">Медовый массаж</option>
                        <option value="Ламинирование ресниц">Ламинирование ресниц</option>
                        <option value="Оформление бровей">Оформление бровей</option>
                        <option value="Другое">Другое</option>
                    </select>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-paper-plane"></i>
                            Отправить отзыв
                        </button>
                        <button type="button" id="closeReviewForm" class="btn btn--light">
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        reviewFormContainer.innerHTML = originalFormHTML;
        
        // Переинициализация формы
        initReviewForm();
    }
    
    // Подсветка ошибки
    function highlightError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.borderColor = '#F44336';
            element.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
        }
    }
    
    // Убрать подсветку ошибки
    function removeError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.borderColor = '#ddd';
            element.style.boxShadow = 'none';
        }
    }
    
    // Показать alert
    function showAlert(message, type = 'error') {
        // Создаём свой alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert ${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        // Стили для alert
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Анимация
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(alertDiv);
        
        // Закрытие по кнопке
        alertDiv.querySelector('.close-alert').addEventListener('click', function() {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        });
        
        // Автозакрытие через 5 секунд
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // 6. ИНИЦИАЛИЗАЦИЯ ФОРМЫ
    function initReviewForm() {
        console.log('Инициализация новой формы отзыва');
        
        // Перепривязываем обработчики
        const newOpenBtn = document.getElementById('openReviewForm');
        const newCloseBtn = document.getElementById('closeReviewForm');
        const newForm = document.getElementById('reviewForm');
        const newStars = document.querySelectorAll('.stars i');
        
        if (newOpenBtn) {
            newOpenBtn.addEventListener('click', function(e) {
                e.preventDefault();
                reviewFormContainer.style.display = 'block';
                setTimeout(() => {
                    reviewFormContainer.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            });
        }
        
        if (newCloseBtn) {
            newCloseBtn.addEventListener('click', closeReviewForm);
        }
        
        if (newForm) {
            newForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Здесь будет обработка отправки
                // Для простоты просто закроем форму
                showSuccessMessage('Пользователь');
            });
        }
        
        if (newStars.length > 0) {
            stars = newStars;
            initStars();
        }
    }
    
    // ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
    initStars();
    console.log('Форма отзывов готова к работе!');
    
    // 7. АДМИН-ПАНЕЛЬ ДЛЯ ПРОСМОТРА ОТЗЫВОВ (опционально)
    // Добавьте в консоли браузера: localStorage.getItem('alanKayReviews')
});
