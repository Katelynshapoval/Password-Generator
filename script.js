var len =  document.getElementById('length');
var rangeInput = document.getElementById('range');
len.value = rangeInput.value;
    
rangeInput.addEventListener('change', function(e) {
    len.value = e.target.value
})

len.addEventListener('change', function(e) {
    rangeInput.value = e.target.value
})

const result = document.getElementById("password");
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
var clipboardEl = document.getElementById("copy");

const randomFunctions = {
    lower: get_lowercase,
    upper: get_uppercase,
    number: get_number,
    symbol: get_symbol
}
// Generate event listen
generateButton.addEventListener('click', () => {
    const length = len.value
    const hasUppercase = document.getElementById('uppercase').checked;
    const hasLowercase = document.getElementById('lowercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;
    result.innerText = generatePassword(hasLowercase, hasUppercase, hasNumbers, hasSymbols, length)
})

// Copy password to clipboard
 clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;
	if(!password) { return; }
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
 })

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	// create a loop
	for (let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunctions[funcName]();
		});
	}
    
    return shuffle(generatedPassword);
}
// Generate functions
function get_lowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function get_uppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function get_number() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function get_symbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

function shuffle(str) {
    return str.split('').sort(function(){return 0.5-Math.random()}).join('');

}