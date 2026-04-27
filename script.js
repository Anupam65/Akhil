let currentPin = "";
const targetPin = "2020";

function appendPin(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();

        if (currentPin.length === 4) {
            setTimeout(checkPin, 300);
        }
    }
}

function clearPin() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    }
}

function checkPin() {
    if (currentPin === targetPin) {
        unlock();
    } else {
        const keypadSection = document.querySelector('.keypad-section');
        keypadSection.classList.add('shake');
        setTimeout(() => {
            keypadSection.classList.remove('shake');
            clearPin();
        }, 500);
    }
}

function unlock() {
    const lockScreen = document.getElementById('lock-screen');
    const birthdayScreen = document.getElementById('birthday-screen');

    lockScreen.classList.remove('active');
    setTimeout(() => {
        birthdayScreen.classList.add('active');
        createConfetti();
    }, 600);
}

function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#ffffff', '#ffedbc', '#ff6ac1', '#f0f0f0', '#ff0000'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 5;
        const size = Math.random() * 10 + 5;
        const rotation = Math.random() * 360;

        confetti.style.left = left + '%';
        confetti.style.background = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = Math.random();

        // Custom animation
        confetti.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;

        container.appendChild(confetti);
    }
}

// Add CSS keyframe for confetti fall dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    0% {
        transform: translateY(-20px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

function showSurpriseQuestion() {
    const mainCelebration = document.getElementById('main-celebration');
    const birthdayGreeting = document.querySelector('.happy-birthday');
    const surpriseSection = document.getElementById('surprise-section');

    mainCelebration.style.display = 'none';
    birthdayGreeting.style.display = 'none';
    surpriseSection.style.display = 'block';
}

function revealGifts() {
    const surpriseSection = document.getElementById('surprise-section');
    const giftsContainer = document.getElementById('gifts-container');

    surpriseSection.style.display = 'none';
    giftsContainer.style.display = 'block';
}

function handleNoClick() {
    const surpriseSection = document.getElementById('surprise-section');
    const noResponse = document.getElementById('no-response');

    surpriseSection.style.display = 'none';
    noResponse.style.display = 'block';
}

function tryAgain() {
    const surpriseSection = document.getElementById('surprise-section');
    const noResponse = document.getElementById('no-response');

    noResponse.style.display = 'none';
    surpriseSection.style.display = 'block';
}

function openGift(element) {
    if (!element.classList.contains('open')) {
        element.classList.add('open');
        // Add additional confetti for each gift opened
        createConfetti();
    }
}

function logout() {
    // Reset PIN state
    currentPin = "";
    updateDots();
    
    // Switch screens
    const birthdayScreen = document.getElementById('birthday-screen');
    const lockScreen = document.getElementById('lock-screen');
    
    birthdayScreen.classList.remove('active');
    setTimeout(() => {
        // Reset sub-sections visibility
        document.getElementById('main-celebration').style.display = 'block';
        document.querySelector('.happy-birthday').style.display = 'block';
        document.getElementById('surprise-section').style.display = 'none';
        document.getElementById('gifts-container').style.display = 'none';
        
        // Reset gifts (close all boxes)
        document.querySelectorAll('.gift-box').forEach(box => {
            box.classList.remove('open');
        });
        
        // Show lock screen
        lockScreen.classList.add('active');
    }, 600);
}
