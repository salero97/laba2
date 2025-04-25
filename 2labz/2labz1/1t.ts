class StringBuilder {
    private parts: string[] = [];

    append(str: string): void {
        this.parts.push(str);
    }

    toString(): string {
        return this.parts.join('');
    }
}

function minOperations(target: string): {steps: number, sequence: string[]} {
    // Преобразуем строку в массив символов
    const chars = Array.from(target);
    // Получаем длину целевой последовательности
    const n = chars.length;
    
    // Создаем массив для хранения минимального количества операций
    const dp: number[] = [];
    // Инициализируем массив значениями от 0 до n
    for (let i = 0; i <= n; i++) dp.push(i);
    
    // Флаг для отслеживания использования операции удвоения
    let usedDouble = false;

    // Заполняем массив dp значениями
    for (let i = 1; i <= n; i++) {
        // Базовый случай - добавление одного символа
        dp[i] = dp[i - 1] + 1;
        
        // Проверяем возможность операции удвоения
        if (!usedDouble && i % 2 === 0) {
            // Флаг для проверки возможности удвоения
            let canDouble = true;
            // Вычисляем половину длины
            const half = i / 2;
            
            // Проверяем совпадение символов в двух половинах
            for (let j = 0; j < half; j++) {
                if (chars[j] !== chars[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            
            // Если можно удвоить и это выгодно
            if (canDouble && dp[half] + 1 < dp[i]) {
                // Обновляем значение в dp
                dp[i] = dp[half] + 1;
                // Помечаем удвоение как использованное
                usedDouble = true;
            }
        }
    }

    // Создаем массив для хранения последовательности операций
    const sequence: string[] = [];
    // Указатель на текущую позицию (начинаем с конца)
    let i = n;
    // Флаг для отслеживания использования удвоения при восстановлении
    let doubleUsed = false;

    // Восстанавливаем последовательность операций
    while (i > 0) {
        // Проверяем возможность операции удвоения
        if (!doubleUsed && i % 2 === 0) {
            // Вычисляем половину длины
            const half = i / 2;
            // Флаг для проверки возможности удвоения
            let canDouble = true;
            
            // Проверяем совпадение символов
            for (let j = 0; j < half; j++) {
                if (chars[j] !== chars[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            
            // Если операция удвоения была использована
            if (canDouble && dp[i] === dp[half] + 1) {
                // Создаем описание операции
                const opDesc = new StringBuilder();
                opDesc.append("Удвоение (получено '");
                for (let k = 0; k < i; k++) opDesc.append(chars[k]);
                opDesc.append("')");
                
                // Добавляем операцию в начало массива
                sequence.unshift(opDesc.toString());
                // Переходим к строке до удвоения
                i = half;
                // Помечаем удвоение как использованное
                doubleUsed = true;
                continue;
            }
        }
        
        // Создаем описание операции добавления символа
        const opDesc = `Добавлен '${chars[i - 1]}'`;
        
        // Добавляем операцию в начало массива
        sequence.unshift(opDesc);
        // Переходим к предыдущему символу
        i--;
    }

    // Возвращаем результат: количество операций и последовательность
    return {
        steps: dp[n],
        sequence: sequence
    };
}

// Чтение ввода в Node.js
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите целевую строку: ', (target) => {
    const result = minOperations(target);
    console.log(`Минимальное количество операций: ${result.steps}`);
    console.log('Последовательность:');
    result.sequence.forEach((step, i) => {
        console.log(`${i + 1}. ${step}`);
    });
    rl.close();
});