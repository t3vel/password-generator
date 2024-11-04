const mainEl = document.querySelector('.app');
const passwordEl = document.createElement('input');
passwordEl.classList.add('password');
passwordEl.setAttribute('placeholder', 'Generated password');
passwordEl.addEventListener('keypress', (e) => {
    e.preventDefault();
});

passwordEl.addEventListener('focus', (e) => {
    navigator.clipboard.writeText(passwordEl.value);
});

const copyBtn = document.createElement('button');
copyBtn.classList.add('copy__pass');
copyBtn.innerText = 'Copy';

copyBtn.addEventListener('click', (e) => {
    passwordEl.select();
    passwordEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordEl.value);
});

const genereteBtn = document.createElement('button');
genereteBtn.classList.add('generate__pass');
genereteBtn.innerText = 'Generate';

genereteBtn.addEventListener('click', (e) => {
    let passwordLength = +passwordInput.value || 12; // За замовчуванням 12, якщо поле порожнє
    let password = generatePassword(passwordLength);
    passwordEl.value = password;
});


function generatePassword(passwordLength) {
    const numbersChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";


    let allChars = '';
    if (document.getElementById('numbers').checked) allChars += numbersChars;
    if (document.getElementById('upper').checked) allChars += upperChars;
    if (document.getElementById('lower').checked) allChars += lowerChars;
    if (document.getElementById('symbols').checked) allChars += symbolChars;


    if (allChars === '') {
        alert('Please select at least one character type for the password.');
        return '';
    }

    let randomString = '';
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomNumber];
    }
    return randomString;
}


mainEl.appendChild(passwordEl);
mainEl.appendChild(copyBtn);
mainEl.appendChild(genereteBtn);

const types = [
    { id: 'numbers', label: 'Use numbers' },
    { id: 'upper', label: 'Use upper letters' },
    { id: 'lower', label: 'Use lower letters' },
    { id: 'symbols', label: 'Use special characters' }
];

types.forEach(type => {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = type.id;
    checkbox.classList.add('checkbox');

    let label = document.createElement('label');
    label.htmlFor = type.id;
    label.textContent = type.label;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    mainEl.appendChild(checkboxContainer);
});


const passwordInput = document.createElement('input');
passwordInput.type = 'text';
passwordInput.classList.add('password__input');
mainEl.appendChild(passwordInput);
