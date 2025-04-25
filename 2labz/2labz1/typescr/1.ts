function calculateMinOperations(input: string): number {
    const n = input.length;
    // Создаем массив через цикл для совместимости
    const dp: number[] = [];
    for (let i = 0; i <= n; i++) {
        dp[i] = i;
    }

    for (let i = 2; i <= n; i++) {
        // Базовый вариант - добавление по одному символу
        dp[i] = dp[i - 1] + 1;
        
        // Проверяем возможность удвоения
        if (i % 2 === 0) {
            const half = i / 2;
            const firstHalf = input.substring(0, half);
            const secondHalf = input.substring(half, i);
            
            if (firstHalf === secondHalf) {
                dp[i] = Math.min(dp[i], dp[half] + 1);
            }
        }
    }
    
    return dp[n];
}

// Тестируем функцию с уникальным именем переменной
const sampleString = "dbadbaa";
console.log(calculateMinOperations(sampleString));  // Выведет 5
