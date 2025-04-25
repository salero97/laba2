const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите количество чисел: ', (nStr) => {
    const n = parseInt(nStr);
    const result = [];
    let i = 0;
    
    const askNumber = () => {
        if (i >= n) {
            console.log(`Перевернутые числа без ведущих нулей: ${result.join(' ')}`);
            readline.close();
            return;
        }
        
        readline.question(`Введите число ${i+1}: `, (numStr) => {
            const num = parseInt(numStr);
            
            if (num >= 1 && num <= 9) {
                i++;
                askNumber();
                return;
            }
            
            const reversed = parseInt(numStr.split('').reverse().join(''));
            result.push(reversed.toString());
            i++;
            askNumber();
        });
    };
    
    askNumber();
});