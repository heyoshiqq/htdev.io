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
            newText = 'Запускаем и оцениваем эффективность рекламных<br> кампаний<br>- Таргетированная реклама в соцсетях<br>- Контекстная реклама<br><br>';
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

    const validateForm = () => {
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }
        
        if (!consentCheckbox.checked) {
            isValid = false;
        }

        submitBtn.disabled = !isValid;
        if (isValid) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
        
        return isValid;
    };

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalSpan.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const formData = new FormData(form);

        fetch('https://heyoshiqq.github.io/htdev.io/send-email.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultMessage.textContent = 'Заявка успешно отправлена!';
                form.reset();
                submitBtn.disabled = true;
                submitBtn.classList.remove('active');
                submitBtn.textContent = 'Отправлено';
                setTimeout(() => {
                    modal.style.display = 'none';
                    resultMessage.textContent = '';
                    submitBtn.textContent = 'Отправить';
                }, 3000);
            } else {
                throw new Error('Ошибка при отправке формы');
            }
        })
        .catch(error => {
            resultMessage.textContent = 'Ошибка при отправке формы. Пожалуйста, попробуйте снова.';
        });
    });
});
