use std::io;

fn main() {
    // Создаем строку для хранения ввода пользователя
    let mut input = String::new();
    
    // Запрашиваем количество чисел
    println!("Введите количество чисел: ");
    // Читаем ввод пользователя
    io::stdin().read_line(&mut input).expect("Ошибка чтения");
    // Преобразуем ввод в число
    let n: u32 = input.trim().parse().expect("Ожидалось число");
    
    // Вектор для хранения результатов
    let mut result = Vec::new();
    
    // Цикл для ввода чисел
    for i in 0..n {
        // Очищаем строку для нового ввода
        input.clear();
        // Запрашиваем число
        println!("Введите число {}: ", i+1);
        // Читаем ввод
        io::stdin().read_line(&mut input).expect("Ошибка чтения");
        // Преобразуем в число
        let num: u32 = input.trim().parse().expect("Ожидалось число");
        
        // Пропускаем числа от 1 до 9
        if (1..=9).contains(&num) {
            continue;
        }
        
        // Переворачиваем число
        let mut temp = num;
        let mut reversed = 0;
        while temp > 0 {
            reversed = reversed * 10 + temp % 10;
            temp /= 10;
        }
        // Добавляем в результат
        result.push(reversed.to_string());
    }
    
    // Выводим результат
    print!("Перевернутые числа без ведущих нулей: ");
    println!("{}", result.join(" "));
}