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

// JavaScript to handle modal and form validation
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById("contactModal");

    // Get the button that opens the modal
    var btn = document.getElementById("contactBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Form validation
    var form = document.getElementById('callbackForm');
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var nameError = document.getElementById('nameError');
    var phoneError = document.getElementById('phoneError');

    form.addEventListener('submit', function(event) {
        var isValid = true;

        // Reset error messages
        nameError.style.display = 'none';
        phoneError.style.display = 'none';

        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        }

        // Validate phone (simple validation for demonstration, you might want to use a more robust validation)
        var phonePattern = /^[+]?[0-9\s-]{10,15}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});





