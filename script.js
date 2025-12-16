const defaultFoods = [
    "螺狮粉", "火锅", "烧烤", "麻辣烫", "酸菜鱼",
    "寿司", "披萨", "汉堡", "炸鸡", "兰州拉面",
    "沙县小吃", "黄焖鸡米饭", "烤肉", "牛排", "自助餐",
    "冒菜", "串串香", "轻食沙拉", "米线", "盖浇饭",
    "饺子", "馄饨", "炒饭", "炒面", "肯德基", "麦当劳"
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
