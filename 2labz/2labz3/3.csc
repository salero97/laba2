using System;
using System.Linq;

class Program {
    static void Main() {
        Console.Write("Введите числа: ");
        string[] numbers = Console.ReadLine().Split();
        var result = numbers.Where(n => n.Replace("-", "").Length > 1)
                          .Select(num => {
                              string reversed = new string(num.Reverse().ToArray()).TrimStart('0');
                              return reversed == "" ? "0" : reversed;
                          });
        Console.Write("Перевернутые числа без ведущих нулей: ");
        Console.WriteLine(string.Join(" ", result));
    }
}
