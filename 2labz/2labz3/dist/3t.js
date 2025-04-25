const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Введите количество чисел: ', (nStr) => {
    const n = parseInt(nStr);
    if (isNaN(n)) {
        console.error('Ошибка: введите корректное число');
        readline.close();
        return;
    }
    const result = [];
    let i = 0;
    const askNumber = () => {
        if (i >= n) {
            console.log(`Перевернутые числа без ведущих нулей: ${result.join(' ')}`);
            readline.close();
            return;
        }
        readline.question(`Введите число ${i + 1}: `, (numStr) => {
            const num = parseInt(numStr);
            if (isNaN(num)) {
                console.error('Ошибка: введите корректное число');
                i++;
                askNumber();
                return;
            }
            // Пропускаем числа от 1 до 9
            if (num >= 1 && num <= 9) {
                i++;
                askNumber();
                return;
            }
            // Переворачиваем число
            const reversedStr = numStr.split('').reverse().join('');
            const reversed = parseInt(reversedStr) || 0;
            result.push(reversed.toString());
            i++;
            askNumber();
        });
    };
    askNumber();
});
