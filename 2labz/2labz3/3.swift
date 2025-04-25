import Foundation

print("Введите количество чисел: ", terminator: "")
guard let nStr = readLine(), let n = Int(nStr) else {
    fatalError("Ошибка ввода")
}

var result: [String] = []
for i in 1...n {
    print("Введите число \(i): ", terminator: "")
    guard let numStr = readLine(), let num = Int(numStr) else {
        fatalError("Ошибка ввода")
    }
    
    // Пропускаем числа от 1 до 9
    if (1...9).contains(num) {
        continue
    }
    
    // Переворачиваем число
    let reversed = Int(String(String(num).reversed()))!
    result.append(String(reversed))
}

print("Перевернутые числа без ведущих нулей: \(result.joined(separator: " "))")