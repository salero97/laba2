import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
async function main() {
    const rl = createInterface({
        input: stdin,
        output: stdout
    });
    try {
        // Запрашиваем количество чисел
        const countInput = await rl.question('Введите количество чисел: ');
        const count = parseInt(countInput);
        // Проверяем корректность ввода
        if (isNaN(count) || count <= 0) {
            throw new Error('Некорректное количество чисел');
        }
        const results = [];
        // Запрашиваем каждое число
        for (let i = 0; i < count; i++) {
            const numInput = await rl.question(`Введите число ${i + 1}: `);
            const num = parseInt(numInput);
            // Проверяем корректность числа
            if (isNaN(num)) {
                console.log(`Ошибка: "${numInput}" не является числом. Пропускаем.`);
                continue;
            }
            // Обрабатываем числа от 1 до 9
            if (num >= 1 && num <= 9) {
                results.push(num);
                continue;
            }
            // Переворачиваем число
            const reversed = parseInt(numInput.split('').reverse().join('')) || 0;
            results.push(reversed);
        }
        // Выводим результат
        console.log('Перевернутые числа без ведущих нулей:', results.join(' '));
    }
    catch (error) {
        // Обрабатываем ошибки
        console.error('Произошла ошибка:', error instanceof Error ? error.message : error);
    }
    finally {
        // Закрываем интерфейс чтения
        rl.close();
    }
}
// Запускаем программу
main();
