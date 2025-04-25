using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.Write("Введите количество чисел: ");
        string? input = Console.ReadLine();
        if (input == null) {
            Console.WriteLine("Ошибка ввода");
            return;
        }
        int n = int.Parse(input);
        
        var result = new List<string>();
        for (int i = 0; i < n; i++) {
            Console.Write($"Введите число {i+1}: ");
            string? numInput = Console.ReadLine();
            if (numInput == null) {
                Console.WriteLine("Ошибка ввода");
                continue;
            }
            
            int num = int.Parse(numInput);
            
            // Пропускаем числа от 1 до 9
            if (num >= 1 && num <= 9) continue;
            
            // Переворачиваем число
            int reversed = 0;
            int temp = num;
            while (temp > 0) {
                reversed = reversed * 10 + temp % 10;
                temp /= 10;
            }
            result.Add(reversed.ToString());
        }
        
        Console.WriteLine($"Перевернутые числа без ведущих нулей: {string.Join(" ", result)}");
    }
}