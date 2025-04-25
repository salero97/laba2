use std::collections::HashSet; // импортируем HashSet для хранения уникальных адресов
use std::io; // импортируем модуль ввода-вывода для чтения данных с клавиатуры

// функция для нормализации email-адреса
fn normalize_email(email: &str) -> String {
    let parts: Vec<&str> = email.split('@').collect(); // разделяем адрес на имя и домен по символу '@'
    let cleaned = parts[0].replace(".", ""); // удаляем все точки из имени пользователя
    let username = cleaned.split('+').next().unwrap(); // оставляем часть до '+' (если есть)
    format!("{}@{}", username, parts[1]) // собираем снова адрес в формате username@domain
}

fn main() {
    println!("Введите email-адреса через запятую и пробел:"); // просьба ввести список email
    let mut input = String::new(); // создаем пустую строку для данных
    // читаем строку с клавиатуры, если ошибку, выводим сообщение
    io::stdin().read_line(&mut input).expect("Ошибка чтения");

    // разбиваем введенную строку по запятой и пробелу, получая вектор адресов
    let emails: Vec<&str> = input.trim().split(", ").collect();

    let mut unique_emails = HashSet::new(); // создаем множество для хранения уникальных адресов

    // обрабатываем каждый адрес
    for email in emails {
        // добавляем нормализованный адрес в множество
        unique_emails.insert(normalize_email(email));
    }

    println!("\nУникальные адреса после нормализации:");
    // выводим все уникальные адреса
    for email in &unique_emails {
        println!("- {}", email);
    }

    // выводим число уникальных адресов
    println!("\nКоличество уникальных адресов: {}", unique_emails.len());
}
