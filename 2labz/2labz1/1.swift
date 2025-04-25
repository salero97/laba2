import Foundation

func minOperations(target: [Character]) -> (steps: Int, sequence: [String]) {
    // Получаем длину целевой последовательности
    let n = target.count
    
    // Создаем массив для хранения минимального количества операций
    var dp = [Int](0...n)
    // Флаг для отслеживания использования операции удвоения
    var usedDouble = false

    // Заполняем массив dp значениями
    for i in 1...n {
        // Базовый случай - добавление одного символа
        dp[i] = dp[i - 1] + 1
        
        // Проверяем возможность операции удвоения
        if !usedDouble && i % 2 == 0 {
            // Вычисляем половину длины
            let half = i / 2
            // Флаг для проверки возможности удвоения
            var canDouble = true
            
            // Проверяем совпадение символов в двух половинах
            for j in 0..<half {
                if target[j] != target[half + j] {
                    canDouble = false
                    break
                }
            }
            
            // Если можно удвоить и это выгодно
            if canDouble && dp[half] + 1 < dp[i] {
                // Обновляем значение в dp
                dp[i] = dp[half] + 1
                // Помечаем удвоение как использованное
                usedDouble = true
            }
        }
    }

    // Создаем массив для хранения последовательности операций
    var sequence = [String]()
    // Указатель на текущую позицию (начинаем с конца)
    var i = n
    // Флаг для отслеживания использования удвоения при восстановлении
    var doubleUsed = false

    // Восстанавливаем последовательность операций
    while i > 0 {
        // Проверяем возможность операции удвоения
        if !doubleUsed && i % 2 == 0 {
            // Вычисляем половину длины
            let half = i / 2
            // Флаг для проверки возможности удвоения
            var canDouble = true
            
            // Проверяем совпадение символов
            for j in 0..<half {
                if target[j] != target[half + j] {
                    canDouble = false
                    break
                }
            }
            
            // Если операция удвоения была использована
            if canDouble && dp[i] == dp[half] + 1 {
                // Создаем описание операции
                var opDesc = "Удвоение (получено '"
                for k in 0..<i {
                    opDesc.append(target[k])
                }
                opDesc.append("')")
                
                // Добавляем операцию в начало массива
                sequence.insert(opDesc, at: 0)
                // Переходим к строке до удвоения
                i = half
                // Помечаем удвоение как использованное
                doubleUsed = true
                continue
            }
        }
        
        // Создаем описание операции добавления символа
        let opDesc = "Добавлен '\(target[i - 1])'"
        
        // Добавляем операцию в начало массива
        sequence.insert(opDesc, at: 0)
        // Переходим к предыдущему символу
        i -= 1
    }

    // Возвращаем результат: количество операций и последовательность
    return (dp[n], sequence)
}

// Основная часть программы
print("Введите целевую строку:", terminator: " ")
if let input = readLine() {
    // Преобразуем строку в массив символов
    let target = Array(input)
    
    // Вычисляем результат
    let result = minOperations(target: target)
    
    // Выводим минимальное количество операций
    print("Минимальное количество операций: \(result.steps)")
    
    // Выводим заголовок для последовательности операций
    print("Последовательность:")
    
    // Выводим каждую операцию с нумерацией
    for (index, step) in result.sequence.enumerated() {
        print("\(index + 1). \(step)")
    }
}