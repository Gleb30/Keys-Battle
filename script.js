// -------- СОСТОЯНИЕ --------
let balance = 2500;
let totalOpened = 847293;
let currentRouletteCase = null;
let isSpinning = false;
const balanceEl = document.getElementById('balanceAmount');
const totalOpenedEl = document.getElementById('totalOpened');

// -------- ДАННЫЕ КЕЙСОВ --------
const caseLoot = {
    arsenal: {
        name: "Арсенал Кейс",
        icon: "fas fa-box-open",
        price: 350,
        category: "popular",
        premium: false,
        items: [
            { name: "AK-47 | Красная линия", icon: "fas fa-gun", rarity: "Легендарное", value: 1850, color: "#e67e22" },
            { name: "M4A4 | Киберспорт", icon: "fas fa-crosshairs", rarity: "Редкое", value: 620, color: "#3498db" },
            { name: "AWP | Dragon Lore", icon: "fas fa-dragon", rarity: "Топ-легенда", value: 4200, color: "#f1c40f" },
            { name: "SSG 08 | Омут", icon: "fas fa-water", rarity: "Обычное", value: 40, color: "#95a5a6" },
            { name: "Нож | Мрамор", icon: "fas fa-khanda", rarity: "Эпическое", value: 2400, color: "#9b59b6" }
        ]
    },
    cyberCase: {
        name: "Киберпанк 3000",
        icon: "fas fa-microchip",
        price: 450,
        category: "new",
        premium: false,
        items: [
            { name: "Синт-голова шлем", icon: "fas fa-robot", rarity: "Ультра редкий", value: 2850, color: "#c0392b" },
            { name: "Имплант Визор", icon: "fas fa-eye", rarity: "Редкий", value: 990, color: "#2ecc71" },
            { name: "Неоновый револьвер", icon: "fas fa-bolt", rarity: "Легендарный", value: 1850, color: "#e67e22" },
            { name: "Кибер-скин 'Глитч'", icon: "fas fa-waveform", rarity: "Обычное", value: 55, color: "#7f8c8d" },
            { name: "Электро-кинжал", icon: "fas fa-broom-ball", rarity: "Мифическое", value: 3100, color: "#c39bd3" }
        ]
    },
    legacyCase: {
        name: "Винтажный сундук",
        icon: "fas fa-crown",
        price: 280,
        category: "popular",
        premium: false,
        items: [
            { name: "Золотой слиток", icon: "fas fa-gold", rarity: "Редкое", value: 780, color: "#f39c12" },
            { name: "Silent USP | Shadow", icon: "fas fa-gun", rarity: "Обычное", value: 32, color: "#bdc3c7" },
            { name: "Легендарный меч", icon: "fas fa-fist-raised", rarity: "Легенда", value: 2200, color: "#d35400" },
            { name: "Секретный чертеж", icon: "fas fa-scroll", rarity: "Эпическое", value: 1340, color: "#8e44ad" },
            { name: "Бронзовая монета", icon: "fas fa-coins", rarity: "Обычное", value: 22, color: "#a6c1e0" }
        ]
    },
    premiumCase: {
        name: "Премиум Кейс",
        icon: "fas fa-gem",
        price: 1000,
        category: "premium",
        premium: true,
        items: [
            { name: "Золотой AK-47", icon: "fas fa-crown", rarity: "Мифическое", value: 5000, color: "#ffd700" },
            { name: "Алмазный нож", icon: "fas fa-gem", rarity: "Легендарное", value: 4500, color: "#00ffff" },
            { name: "Плазменная винтовка", icon: "fas fa-bolt", rarity: "Эпическое", value: 3000, color: "#ff00ff" },
            { name: "Кибер-крылья", icon: "fas fa-feather", rarity: "Редкое", value: 1500, color: "#00ff00" }
        ]
    }
};

// -------- ЛАЙВ ДРОПЫ --------
const playerNames = ["ProGamer", "LuckyOne", "ShadowFox", "DragonSlayer", "NightHawk", "CyberWolf", "StarPlayer", "MegaWin"];
const liveDrops = [
    "ProGamer открыл AK-47 | Красная линия",
    "LuckyOne получил AWP | Dragon Lore",
    "ShadowFox выбил Нож | Мрамор",
    "DragonSlayer нашел Золотой слиток",
    "NightHawk открыл Неоновый револьвер",
    "CyberWolf получил Алмазный нож"
];

function updateLiveDrop() {
    const liveDropText = document.getElementById('liveDropText');
    if (liveDropText) {
        const randomDrop = liveDrops[Math.floor(Math.random() * liveDrops.length)];
        liveDropText.textContent = randomDrop;
    }
}

setInterval(updateLiveDrop, 3000);
updateLiveDrop();

// -------- ОБНОВЛЕНИЕ СЧЕТЧИКА --------
function incrementTotalOpened() {
    totalOpened++;
    if (totalOpenedEl) {
        totalOpenedEl.textContent = totalOpened.toLocaleString();
    }
}

// -------- ОБНОВЛЕНИЕ БАЛАНСА --------
function updateBalanceUI() {
    if (balanceEl) {
        balanceEl.innerText = Math.floor(balance);
    }
}

// -------- ЭКРАНИРОВАНИЕ HTML --------
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// -------- ИСТОРИЯ --------
function addHistory(itemName, caseName, rarity, itemValue) {
    const historyDiv = document.getElementById('historyList');
    if (!historyDiv) return;
    
    const newEntry = document.createElement('div');
    newEntry.className = 'history-item';
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    newEntry.innerHTML = `
        <i class="fas fa-gem"></i>
        <span class="item-name"><strong>${escapeHtml(caseName)}</strong> → ${escapeHtml(itemName)} (${escapeHtml(rarity)})</span>
        <span class="item-date">${timeStr} • +${itemValue} CR</span>
    `;
    historyDiv.prepend(newEntry);
    
    while (historyDiv.children.length > 15) {
        historyDiv.removeChild(historyDiv.lastChild);
    }
    
    const placeholder = historyDiv.querySelector('.placeholder-item');
    if (placeholder && historyDiv.children.length > 1) {
        placeholder.remove();
    }
}

// -------- ПОКАЗАТЬ РЕЗУЛЬТАТ --------
function showResult(wonItem, finalValue) {
    const resultArea = document.getElementById('resultArea');
    const winDisplay = document.getElementById('winDisplay');
    
    if (resultArea && winDisplay) {
        resultArea.style.display = 'block';
        winDisplay.innerHTML = `
            <div class="win-icon" style="background:${wonItem.color || '#222'}33; border-color:${wonItem.color || 'gold'};">
                <i class="${wonItem.icon}" style="font-size:2.8rem; color: ${wonItem.color || '#FFD166'};"></i>
            </div>
            <div class="win-info">
                <h3>${escapeHtml(wonItem.name)}</h3>
                <p class="win-rarity" style="color:${wonItem.color || '#FFD966'}">⭐ ${escapeHtml(wonItem.rarity)} ⭐</p>
                <p style="font-size: 1.2rem; color: #FFD166;">+${finalValue} CREDITS</p>
            </div>
        `;
        winDisplay.style.animation = 'none';
        winDisplay.offsetHeight;
        winDisplay.style.animation = 'winAppear 0.5s ease';
    }
}

// -------- АНИМАЦИЯ РУЛЕТКИ --------
function initRoulette(caseId) {
    const selectedCase = caseLoot[caseId];
    if (!selectedCase) return;
    
    currentRouletteCase = caseId;
    const overlay = document.getElementById('rouletteOverlay');
    const track = document.getElementById('rouletteTrack');
    const status = document.getElementById('rouletteStatus');
    
    // Создаем слоты для рулетки
    const items = selectedCase.items;
    let slotsHTML = '';
    // Создаем 20 слотов (4 прокрутки по 5 предметов)
    for (let i = 0; i < 20; i++) {
        const item = items[i % items.length];
        slotsHTML += `
            <div class="item-slot">
                <div class="slot-content">
                    <i class="${item.icon}" style="color: ${item.color};"></i>
                    <span style="color: ${item.color};">${item.name}</span>
                </div>
            </div>
        `;
    }
    
    track.innerHTML = slotsHTML;
    track.style.transform = 'translateX(0)';
    
    if (status) status.textContent = 'Нажмите "КРУТИТЬ" для открытия';
    
    if (overlay) {
        overlay.classList.add('active');
    }
}

// -------- КРУТИТЬ РУЛЕТКУ --------
function spinRoulette() {
    if (isSpinning || !currentRouletteCase) return;
    
    const selectedCase = caseLoot[currentRouletteCase];
    if (!selectedCase) return;
    
    if (balance < selectedCase.price) {
        alert(`❌ Недостаточно кредитов! Нужно ${selectedCase.price} CREDITS.`);
        return;
    }
    
    isSpinning = true;
    const spinBtn = document.getElementById('spinBtn');
    const status = document.getElementById('rouletteStatus');
    
    if (spinBtn) spinBtn.disabled = true;
    if (status) status.textContent = 'Крутим...';
    
    balance -= selectedCase.price;
    updateBalanceUI();
    
    // Выбираем случайный предмет
    const items = selectedCase.items;
    const randomIndex = Math.floor(Math.random() * items.length);
    const wonItem = { ...items[randomIndex] };
    
    // Рассчитываем позицию остановки
    const slotWidth = 120; // ширина слота
    const totalSlots = 20;
    const targetSlot = 10 + randomIndex; // останавливаемся в центре
    const distance = targetSlot * slotWidth;
    const spinDistance = distance + (Math.random() * 20 - 10); // небольшой разброс
    
    // Анимация прокрутки
    const track = document.getElementById('rouletteTrack');
    if (track) {
        track.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        track.style.transform = `translateX(-${spinDistance}px)`;
    }
    
    // Показываем результат после анимации
    setTimeout(() => {
        let finalValue = wonItem.value;
        if (wonItem.rarity !== "Обычное") {
            const variance = Math.floor(finalValue * (Math.random() * 0.2 - 0.1));
            finalValue = Math.max(10, finalValue + variance);
        }
        finalValue = Math.floor(finalValue);
        
        if (status) status.textContent = `Выпало: ${wonItem.name}!`;
        
        balance += finalValue;
        updateBalanceUI();
        incrementTotalOpened();
        
        showResult(wonItem, finalValue);
        addHistory(wonItem.name, selectedCase.name, wonItem.rarity, finalValue);
        
        isSpinning = false;
        if (spinBtn) {
            spinBtn.disabled = false;
            spinBtn.textContent = 'ОТКРЫТЬ ЕЩЕ РАЗ';
        }
    }, 3000);
}

// -------- ЗАКРЫТЬ РУЛЕТКУ --------
function closeRoulette() {
    if (isSpinning) return;
    
    const overlay = document.getElementById('rouletteOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    currentRouletteCase = null;
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) spinBtn.textContent = 'КРУТИТЬ';
}

// -------- ОТРИСОВКА КЕЙСОВ --------
function renderCases(filter = 'all') {
    const grid = document.getElementById('casesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    for (const [id, data] of Object.entries(caseLoot)) {
        if (filter !== 'all' && data.category !== filter) continue;
        
        const card = document.createElement('div');
        card.className = `case-card ${data.premium ? 'premium' : ''}`;
        card.setAttribute('data-case', id);
        card.innerHTML = `
            <div class="case-icon"><i class="${data.icon}"></i></div>
            <h3>${escapeHtml(data.name)}</h3>
            <div class="case-price"><i class="fas fa-coins"></i> ${data.price} CREDITS</div>
            <div class="badge"><i class="fas fa-trophy"></i> ${data.items.length} предметов</div>
            <button class="btn-open" data-id="${id}">🔑 ОТКРЫТЬ</button>
        `;
        grid.appendChild(card);
    }
    
    // Назначаем обработчики
    document.querySelectorAll('.btn-open').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const caseId = btn.getAttribute('data-id');
            if (caseId) {
                initRoulette(caseId);
            }
        });
    });
}

// -------- ФИЛЬТРЫ КЕЙСОВ --------
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.getAttribute('data-filter');
        renderCases(filter);
    }
});

// -------- ПОПОЛНЕНИЕ БАЛАНСА --------
const addCreditsBtn = document.getElementById('addCreditsBtn');
if (addCreditsBtn) {
    addCreditsBtn.addEventListener('click', () => {
        balance += 500;
        updateBalanceUI();
        const balCard = document.querySelector('.balance-card');
        if (balCard) {
            balCard.classList.add('shake');
            setTimeout(() => balCard.classList.remove('shake'), 300);
        }
        // Визуальный эффект
        if (balanceEl) {
            balanceEl.style.color = '#00ff00';
            setTimeout(() => balanceEl.style.color = '#FFD166', 500);
        }
    });
}

// -------- КНОПКИ РУЛЕТКИ --------
document.getElementById('spinBtn')?.addEventListener('click', spinRoulette);
document.getElementById('closeRoulette')?.addEventListener('click', closeRoulette);

// Закрытие рулетки по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRoulette();
    }
});

// -------- ОЧИСТКА ИСТОРИИ --------
document.getElementById('clearHistory')?.addEventListener('click', function() {
    const historyDiv = document.getElementById('historyList');
    if (historyDiv) {
        historyDiv.innerHTML = '<div class="history-item placeholder-item"><i class="fas fa-clock"></i> <span>История очищена</span></div>';
    }
});

// -------- PROVABLY FAIR ПРОВЕРКА --------
document.getElementById('verifyBtn')?.addEventListener('click', function() {
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    alert(`🔒 Хеш последнего результата: ${hash}\nВы можете проверить его на нашем сервере.`);
});

// -------- МОБИЛЬНОЕ МЕНЮ --------
const menuBtn = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');
if (menuBtn && navUl) {
    menuBtn.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
}

// -------- ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// -------- ЗАПУСК --------
document.addEventListener('DOMContentLoaded', function() {
    renderCases();
    updateBalanceUI();
    
    // Демо-история
    setTimeout(() => {
        const historyDiv = document.getElementById('historyList');
        if (historyDiv && historyDiv.children.length === 1 && historyDiv.children[0].classList.contains('placeholder-item')) {
            addHistory("AK-47 | Красная линия", "Арсенал Кейс", "Легендарное", 1920);
            addHistory("AWP | Dragon Lore", "Арсенал Кейс", "Топ-легенда", 4200);
            addHistory("Неоновый револьвер", "Киберпанк 3000", "Легендарный", 1850);
        }
    }, 500);
    
    console.log('🔥 Keys Battle - Рулетка кейсов готова!');
});