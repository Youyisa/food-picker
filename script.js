const defaultFoods = [
    "黄瓜炒蛋", "大蒜叶炒腊肉", "蒸毛豆", "炒毛豆", "毛豆炒肉",
    "香干炒肉", "清炒油麦菜", "辣椒炒香菇", "香菇炒肉", "香菇滑蛋汤",
    "酸辣藕尖炒肉", "蒸蛋", "老姜肉片汤", "粉条炒蛋", "酸豆角火腿肠炒肉",
    "笋炒肉", "蛋汤", "清炒四季青", "芹菜炒肉", "芹菜炒牛肉",
    "辣椒炒蛋", "韭菜炒肉丝", "韭菜炒蛋", "蛋包豆笋", "清炒红菜苔",
    "辣椒炒皮蛋", "火腿肠炒花菜", "火腿肠炒蛋", "火腿肠炒黄瓜", "花菜炒肉",
    "清炒四季豆", "四季豆炒肉", "辣椒炒肉", "葱爆醋蛋", "小炒日本豆腐",
    "干辣椒炒土豆丝", "蒜苔炒肉", "小炒空心菜", "小炒空心菜梗", "酱辣椒辣牛肉",
    "干辣椒炒包菜", "丝瓜炒蛋", "白灼虾仁", "小炒虾仁", "小炒豆芽",
    "猪肉炖粉条", "荷兰豆炒肉", "清炒荷兰豆", "清炒苋菜", "小炒冬瓜片",
    "小炒莴笋片", "莴笋片炒肉", "炒胡萝卜丁", "胡萝卜炒肉", "小炒秋葵",
    "白灼秋葵", "酸辣鸡杂", "炒茄子", "小炒千层牛肚", "生菜蛋汤",
    "清炒生菜", "清炒芽白", "清炒藕片", "藕片炒肉", "拌面",
    "油豆腐炒肉", "土豆片炒肉"
];

// Initialize foods from localStorage or default
let foods = JSON.parse(localStorage.getItem('foodList')) || [...defaultFoods];

// Save initial list if empty
if (!localStorage.getItem('foodList')) {
    saveFoods();
}

const foodDisplay = document.getElementById('foodDisplay');
const spinBtn = document.getElementById('spinBtn');
const toggleMenuBtn = document.getElementById('toggleMenuBtn');
const menuSection = document.getElementById('menuSection');
const foodListEl = document.getElementById('foodList');
const newFoodInput = document.getElementById('newFoodInput');
const addFoodBtn = document.getElementById('addFoodBtn');

let isSpinning = false;

// Event Listeners
spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    startSpin();
});

toggleMenuBtn.addEventListener('click', () => {
    menuSection.classList.toggle('hidden');
    if (!menuSection.classList.contains('hidden')) {
        renderFoodList();
        toggleMenuBtn.textContent = "收起菜单";
    } else {
        toggleMenuBtn.textContent = "自定义菜单";
    }
});

addFoodBtn.addEventListener('click', addFood);

newFoodInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addFood();
    }
});

// Functions
function saveFoods() {
    localStorage.setItem('foodList', JSON.stringify(foods));
}

function renderFoodList() {
    foodListEl.innerHTML = '';
    foods.forEach((food, index) => {
        const li = document.createElement('li');
        li.className = 'food-item';
        li.innerHTML = `
            <span>${food}</span>
            <button class="delete-btn" onclick="removeFood(${index})">&times;</button>
        `;
        foodListEl.appendChild(li);
    });
}

function addFood() {
    const newFood = newFoodInput.value.trim();
    if (newFood) {
        foods.push(newFood);
        saveFoods();
        renderFoodList();
        newFoodInput.value = '';
    }
}

// Make removeFood globally accessible
window.removeFood = function (index) {
    if (foods.length <= 1) {
        alert("至少要保留一个选项哦！");
        return;
    }
    foods.splice(index, 1);
    saveFoods();
    renderFoodList();
}

function startSpin() {
    if (foods.length === 0) {
        alert("菜单是空的，先添加点吃的吧！");
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = "正在选择...";

    let counter = 0;
    const totalSpins = 30;
    let speed = 50;

    foodDisplay.innerHTML = '';

    const spin = () => {
        const randomIndex = Math.floor(Math.random() * foods.length);
        const food = foods[randomIndex];

        foodDisplay.textContent = food;

        counter++;

        if (counter < totalSpins) {
            if (counter > totalSpins - 10) {
                speed += 30;
            }
            setTimeout(spin, speed);
        } else {
            endSpin(food);
        }
    };

    spin();
}

function endSpin(finalFood) {
    isSpinning = false;
    spinBtn.disabled = false;
    spinBtn.textContent = "不满意？再选一次";
    foodDisplay.innerHTML = `<span class="highlight">${finalFood}</span>`;
}
