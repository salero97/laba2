function minOperations(target) {
    const n = target.length;
    const dp = new Array(n + 1).fill(0);
    let usedDouble = false;
    
    // Заполняем массив динамического программирования
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i-1] + 1; // Базовый случай
        
        // Проверяем возможность единственного удвоения
        if (!usedDouble && i % 2 === 0 && target.slice(0, i/2) === target.slice(i/2, i)) {
            if (dp[i/2] + 1 < dp[i]) {
                dp[i] = dp[i/2] + 1;
                usedDouble = true;
            }
        }
    }

    // Восстанавливаем последовательность
    const sequence = [];
    let i = n;
    let doubleUsed = false;
    
    while (i > 0) {
        // Определяем тип последней операции
        if (!doubleUsed && i % 2 === 0 && 
            target.slice(0, i/2) === target.slice(i/2, i) && 
            dp[i] === dp[i/2] + 1) {
            sequence.push(`Удвоение (получено '${target.slice(0, i)}')`);
            i /= 2;
            doubleUsed = true;
        } else {
            sequence.push(`Добавлен '${target[i-1]}'`);
            i--;
        }
    }
    
    return {
        steps: dp[n],
        sequence: sequence.reverse() // Разворачиваем последовательность
    };
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите целевую строку: ', (target) => {
    const result = minOperations(target);
    console.log(`Минимальное количество операций: ${result.steps}`);
    console.log('Последовательность:');
    result.sequence.forEach((step, i) => {
        console.log(`${i + 1}. ${step}`);
    });
    readline.close();
});