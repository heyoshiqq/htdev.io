document.addEventListener('DOMContentLoaded', function() {
    function toggleStatInfo() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            stat.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const statInfo = document.getElementById(targetId);
                const isVisible = getComputedStyle(statInfo).visibility === 'visible';

                // Переключаем видимость описания текущего элемента
                statInfo.style.visibility = isVisible ? 'hidden' : 'visible';

                // Скрываем описание остальных элементов, кроме текущего
                statNumbers.forEach(otherStat => {
                    if (otherStat !== stat) {
                        const otherTargetId = otherStat.getAttribute('data-target');
                        const otherStatInfo = document.getElementById(otherTargetId);
                        otherStatInfo.style.visibility = 'hidden';
                    }
                });
            });
        });
    }

    function handleResize() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            hideStatInfo();
            toggleStatInfo();
        } else {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                stat.replaceWith(stat.cloneNode(true));
            });
            
            showStatInfo();
        }
    }

    function hideStatInfo() {
        const statInfos = document.querySelectorAll('.stat-info');
        statInfos.forEach(info => {
            info.style.visibility = 'hidden';
        });
    }

    function showStatInfo() {
        const statInfos = document.querySelectorAll('.stat-info');
        statInfos.forEach(info => {
            info.style.visibility = 'visible';
        });
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('resize', handleResize);

    handleResize();
});

let currentCard = 0;
const cards = document.querySelectorAll('.case-card');
const logos = document.querySelectorAll('.logo');

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    logos.forEach((logo, i) => {
        logo.classList.toggle('active', i === index);
    });
    currentCard = index;
}

function prevCard() {
    const newIndex = (currentCard - 1 + cards.length) % cards.length;
    showCard(newIndex);
}

function nextCard() {
    const newIndex = (currentCard + 1) % cards.length;
    showCard(newIndex);
}

logos.forEach((logo, i) => {
    logo.addEventListener('click', () => showCard(i));
});

// Initialize first card as active
showCard(0);

function changeContent(type) {
    const dynamicContent = document.getElementById('dynamic-content');
    const textContainer = dynamicContent.querySelector('.text-container p');
    const imageContainer = dynamicContent.querySelector('.image-container img');
    
    let newText = '';
    let newImageSrc = '';
    
    switch (type) {
        case 'development':
            newText = 'Создаём с нуля, развиваем и поддерживаем<br>- Сложные веб‑проекты<br>- Бизнес-приложения<br><br>';
            newImageSrc = 'img/development.png';
            break;
        case 'uxui':
            newText = 'Применяем пользовательский опыт для<br> создания эффективных бизнес-решений<br>- Дизайн интерфейсов<br>- Дизайн email-рассылок<br><br>';
            newImageSrc = 'img/uxui.png';
            break;
        case 'analytics':
            newText = 'Выявляем проблемы и предлагаем пути<br> их решения<br><br>';
            newImageSrc = 'img/analytics.png';
            break;
        case 'visualization':
            newText = 'Создание фотореалистичных<br> изображений и интерактивной<br> визуализации для оценки характеристик<br> будущих и существующих объектов<br><br>';
            newImageSrc = 'img/visualization.png';
            break;
        case 'motionDesign':
            newText = 'Разрабатываем 2D- и 3D-визуализацию для<br>Вашего информационного сообщения<br>- Рекламные баннеры<br>- Моушн-ролики<br><br>';
            newImageSrc = 'img/motionDesign.png';
            break;
        case 'marketing':
            newText = 'Запускаем и оцениваем эффективность<br> рекламных кампаний<br>- Таргетированная реклама в соцсетях<br>- Контекстная реклама<br><br>';
            newImageSrc = 'img/marketing.png';
            break;
        case 'ai':
            newText = 'Используем передовые технологии<br> для развития отрасли MedTech<br><br>';
            newImageSrc = 'img/ai.png';
            break;
        case 'legal':
            newText = 'Проверяем соответствие ваших материалов<br> российскому законодательству во<br> избежание негативных финансовых<br> и репутационных последствий<br><br>';
            newImageSrc = 'img/legal.png';
            break;
        default:
            newText = 'Создание фотореалистичных<br> изображений и интерактивной<br> визуализации для оценки характеристик<br> будущих и существующих объектов<br><br>';
            newImageSrc = 'img/image10.png';
    }

    // Установить начальную непрозрачность
    textContainer.style.opacity = 0;
    imageContainer.style.opacity = 0;

    // Изменить текст и изображение после задержки для плавного перехода
    setTimeout(() => {
        textContainer.innerHTML = newText;
        imageContainer.src = newImageSrc;

        // Установить конечную непрозрачность
        textContainer.style.opacity = 1;
        imageContainer.style.opacity = 1;
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('contactBtn');
    const closeModalSpan = document.querySelector('.close');
    const form = document.getElementById('callbackForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const consentCheckbox = document.getElementById('consent');
    const submitBtn = document.getElementById('submitBtn');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const resultMessage = document.getElementById('resultMessage');

    // Инициализация EmailJS (замените '2CWi7z7hugE8einOp' на ваш публичный ключ)
    emailjs.init('2CWi7z7hugE8einOp');

    // Функция для валидации формы
    const validateForm = () => {
        let isValid = true;

        // Валидация имени
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Валидация телефонного номера (только для российских номеров)
        if (!validateRussianPhoneNumber(phoneInput.value.trim())) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // Валидация согласия на обработку персональных данных
        if (!consentCheckbox.checked) {
            isValid = false;
        }

        // Установка состояния кнопки отправки
        submitBtn.disabled = !isValid;
        if (isValid) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }

        return isValid;
    };

    // Функция для валидации российского телефонного номера
    function validateRussianPhoneNumber(phoneNumber) {
        const phoneRegex = /^((\+7|8)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        return phoneRegex.test(phoneNumber);
    }

    // Открытие модального окна по клику на кнопку "Связаться"
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Закрытие модального окна по клику на кнопку закрыть
    closeModalSpan.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Валидация формы при изменении значений в полях
    form.addEventListener('input', validateForm);

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Отправка формы через EmailJS
        emailjs.send("service_pekdl4a", "template_ie3x4hk", {
            from_name: nameInput.value,
            phone: phoneInput.value
        })
        .then(function(response) {
            console.log('Письмо успешно отправлено', response);
            // Добавьте здесь код для обработки успешной отправки, например, очистка формы и отображение сообщения
            resultMessage.textContent = 'Заявка успешно отправлена!';
            resultMessage.style.color = 'green';
            form.reset();
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                resultMessage.textContent = '';
            }, 3000);
        })
        .catch(function(error) {
            console.error('Произошла ошибка при отправке письма', error);
            // Добавьте здесь код для обработки ошибки при отправке
            resultMessage.textContent = 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.';
            resultMessage.style.color = 'red';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    emailjs.init('2CWi7z7hugE8einOp');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Отправка формы через EmailJS
        emailjs.send("service_pekdl4a", "template_wa46x4p", {
            from_name: form.name.value,
            company: form.company.value,
            phone: form.phone.value,
            email: form.email.value,
            comment: form.comment.value
        })
        .then(function(response) {
            console.log('Письмо успешно отправлено', response);
            alert('Форма успешно отправлена!');
            form.reset();
        }, function(error) {
            console.error('Произошла ошибка при отправке письма', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.');
        });

    });

    // Функция для валидации формы
    function validateForm() {
        let isValid = true;

        // Валидация имени
        const nameInput = form.name;
        if (nameInput.value.trim() === '') {
            isValid = false;
            alert('Пожалуйста, введите имя.');
        }

        // Валидация телефонного номера (только для российских номеров)
        const phoneInput = form.phone;
        if (!validateRussianPhoneNumber(phoneInput.value.trim())) {
            isValid = false;
            alert('Пожалуйста, введите корректный российский номер телефона.');
        }

        // Валидация email (опционально, можете добавить другие проверки)

        return isValid;
    }

    // Функция для валидации российского телефонного номера
    function validateRussianPhoneNumber(phoneNumber) {
        const phoneRegex = /^((\+7|8)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        return phoneRegex.test(phoneNumber);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    iframe.addEventListener('load', function() {
        iframe.contentWindow.document.body.style.outline = 'none';
        iframe.contentWindow.document.body.style.border = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'img/z2 (1).png',
        'img/image2.png',
        'img/image3.png',
        'img/image4.png',
        'img/image5.png'
    ];
    let currentIndex = 0;

    const imgContainer = document.querySelector('.img-container img');

    function showImage(index) {
        imgContainer.src = images[index];
    }

    window.prev1Card = function() {
        currentIndex = (currentIndex - 1 + images.length) < 0 ? images.length - 1 : (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };

    window.next1Card = function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    // Initialize with the first image
    showImage(currentIndex);
});

