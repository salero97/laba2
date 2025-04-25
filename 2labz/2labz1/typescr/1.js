function calculateMinOperations(input) {
    var n = input.length;
    // Создаем массив через цикл для совместимости
    var dp = [];
    for (var i = 0; i <= n; i++) {
        dp[i] = i;
    }
    for (var i = 2; i <= n; i++) {
        // Базовый вариант - добавление по одному символу
        dp[i] = dp[i - 1] + 1;
        // Проверяем возможность удвоения
        if (i % 2 === 0) {
            var half = i / 2;
            var firstHalf = input.substring(0, half);
            var secondHalf = input.substring(half, i);
            if (firstHalf === secondHalf) {
                dp[i] = Math.min(dp[i], dp[half] + 1);
            }
        }
    }
    return dp[n];
}
// Тестируем функцию с уникальным именем переменной
var sampleString = "dbadbaa";
console.log(calculateMinOperations(sampleString)); // Выведет 5
