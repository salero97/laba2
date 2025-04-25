using System;
using System.Collections.Generic;

// Основная программа
class Program
{
    static void Main()
    {
        // Ввод целевой строки пользователем
        Console.Write("Введите целевую строку: ");
        string target = Console.ReadLine() ?? string.Empty; // Чтение строки или пустая строка по умолчанию
        
        // Вызов функции для получения минимальных операций и последовательности
        var result = MinOperations(target);
        
        // Вывод минимального количества операций
        Console.WriteLine($"Минимальное количество операций: {result.steps}");
        Console.WriteLine("Последовательность:");
        // Вывод каждого шага последовательности
        for (int i = 0; i < result.sequence.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {result.sequence[i]}");
        }
    }

    static (int steps, List<string> sequence) MinOperations(string target)
    {
        int n = target.Length; // Длина целевой строки
        // Используем List вместо массива
        List<int> dp = new List<int>(n + 1); // Создание списка для хранения минимальных операций
        for (int i = 0; i <= n; i++) dp.Add(i); // Инициализация значениями 0..n
        bool usedDouble = false; // Флаг, указывающий использование удвоения

        // Основной цикл для заполнения dp
        for (int i = 1; i <= n; i++)
        {
            dp[i] = dp[i - 1] + 1; // Минимум операций — добавить один символ
            
            // Проверка возможности удвоения
            if (!usedDouble && i % 2 == 0)
            {
                bool canDouble = true; // Флаг, можно ли удвоить
                int half = i / 2; // Индекс половины строки
                // Проверка совпадения половин строки
                for (int j = 0; j < half; j++)
                {
                    if (target[j] != target[half + j])
                    {
                        canDouble = false; // Если символы не совпадают, удвоение невозможно
                        break;
                    }
                }
                // Если можно удвоить и это уменьшает число операций
                if (canDouble && dp[half] + 1 < dp[i])
                {
                    dp[i] = dp[half] + 1; // Обновляем минимальное число операций
                    usedDouble = true; // Устанавливаем флаг, что удвоение было использовано
                }
            }
        }

        // Восстановление последовательности шагов
        List<string> sequence = new List<string>(); // Создаем список для хранения шагов
        int pos = n; // Текущий индекс в строке
        bool doubleUsed = false; // Флаг использования удвоения при восстановлении

        while (pos > 0)
        {
            // Проверка возможности удвоения при обратном восстановлении
            if (!doubleUsed && pos % 2 == 0)
            {
                int half = pos / 2; // Индекс половины
                bool canDouble = true; // Можно ли удвоить
                for (int j = 0; j < half; j++)
                {
                    if (target[j] != target[half + j])
                    {
                        canDouble = false;
                        break;
                    }
                }
                // Если удвоение соответствует минимальному числу операций
                if (canDouble && dp[pos] == dp[half] + 1)
                {
                    // Добавляем шаг удвоения
                    sequence.Insert(0, $"Удвоение (получено '{target.Substring(0, pos)}')");
                    pos /= 2; // Переход к предыдущему состоянию
                    doubleUsed = true; // Помечаем, что удвоение использовано
                    continue; // Продолжаем цикл
                }
            }
            // Добавление шага добавления символа
            sequence.Insert(0, $"Добавлен '{target[pos - 1]}'");
            pos--; // Переход к предыдущему символу
        }

        // Возвращение минимальных операций и последовательности
        return (dp[n], sequence);
    }
}
