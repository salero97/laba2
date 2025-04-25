using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static string NormalizeEmail(string email) {
        email = email.Trim();
        var parts = email.Split('@');
        if (parts.Length != 2) return email;
        
        var username = parts[0].Replace(".", "").Split('+')[0];
        return $"{username}@{parts[1]}";
    }

    static void Main() {
        Console.WriteLine("Введите email-адреса через запятую и пробел:");
        var input = Console.ReadLine() ?? "";
        var emails = input.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries);
        var uniqueEmails = new HashSet<string>();

        foreach (var email in emails) {
            var normalized = NormalizeEmail(email);
            if (normalized.Contains('@')) {
                uniqueEmails.Add(normalized);
            }
        }

        Console.WriteLine("\nУникальные адреса после нормализации:");
        foreach (var email in uniqueEmails.OrderBy(e => e)) {
            Console.WriteLine($"- {email}");
        }

        Console.WriteLine($"\nКоличество уникальных адресов: {uniqueEmails.Count}");
    }
}
