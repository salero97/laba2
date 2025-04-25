import readline from 'node:readline';
class StringBuilder {
    value = "";
    append(str) {
        this.value += str;
    }
    toString() {
        return this.value;
    }
}
function minOperations(target) {
    const n = target.length;
    const dp = [];
    for (let i = 0; i <= n; i++)
        dp.push(i);
    let usedDouble = false;
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        // Проверка возможности удвоения
        if (!usedDouble && i % 2 === 0) {
            let canDouble = true;
            const half = i / 2;
            for (let j = 0; j < half; j++) {
                if (target[j] !== target[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            if (canDouble && dp[half] + 1 < dp[i]) {
                dp[i] = dp[half] + 1;
                usedDouble = true;
            }
        }
    }
    // Восстановление последовательности
    const sequence = [];
    let i = n;
    let doubleUsed = false;
    while (i > 0) {
        if (!doubleUsed && i % 2 === 0) {
            let canDouble = true;
            const half = i / 2;
            for (let j = 0; j < half; j++) {
                if (target[j] !== target[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            if (canDouble && dp[i] === dp[half] + 1) {
                const sb = new StringBuilder();
                sb.append("Удвоение (получено '");
                for (let k = 0; k < i; k++)
                    sb.append(target[k]);
                sb.append("')");
                sequence.unshift(sb.toString());
                i /= 2;
                doubleUsed = true;
                continue;
            }
        }
        sequence.unshift(`Добавлен '${target[i - 1]}'`);
        i--;
    }
    return {
        steps: dp[n],
        sequence: sequence
    };
}
// Чтение ввода
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Введите целевую строку: ', (target) => {
    const result = minOperations(target);
    console.log(`Минимальное количество операций: ${result.steps}`);
    console.log('Последовательность:');
    result.sequence.forEach((step, i) => {
        console.log(`${i + 1}. ${step}`);
    });
    rl.close();
});
