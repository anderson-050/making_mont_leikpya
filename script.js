document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('snackQuantity');
    const calculateButton = document.getElementById('calculateButton');
    const themeToggle = document.getElementById('themeToggle');
    const resultBox = document.getElementById('resultBox');
    const ingredientList = document.getElementById('ingredientList');
    const errorBox = document.getElementById('errorBox');

    const BASE_RECIPE = {
        'Rice': 9.8,
        'Black Pelun Bean': 3.5,
        'Sugar': 0.4,
        'Sesame Powder': 3
    };

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });

    function calculate() {
        const qty = Number(quantityInput.value);

        calculateButton.classList.add('btn-active');// to show clicking effect even if we just hit 'Enter' on keyboard
        setTimeout (() => calculateButton.classList.remove('btn-active'), 150);

        if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
            errorBox.classList.remove('hidden');
            resultBox.classList.add('hidden');
            errorBox.classList.add('flash');
            setTimeout(() => errorBox.classList.remove('flash'), 150);
            return;
        }

        errorBox.classList.add('hidden');
        resultBox.classList.remove('hidden');
        resultBox.classList.add('flash');
        setTimeout(() => resultBox.classList.remove('flash'), 150);

        setTimeout(() => {
            ingredientList.innerHTML = '';
            for (const [name, amount] of Object.entries(BASE_RECIPE)) {
                const total =  Number((amount * qty).toFixed(1));
                const li = document.createElement('li');
                li.innerHTML = `<span>${name}</span> <strong>${total} grams</strong>`;
                ingredientList.appendChild(li);
            }
        }, 150);
    }
    calculateButton.addEventListener('click', calculate);
    quantityInput.addEventListener('keypress', (e) => e.key === 'Enter' && calculate());
    calculate();
});