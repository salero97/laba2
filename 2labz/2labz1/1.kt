import java.util.*

fun main() {
    // Создаем сканер для чтения ввода из консоли
    val scanner = Scanner(System.`in`)
    
    // Выводим приглашение для ввода целевой строки
    print("Введите целевую строку: ")
    
    // Читаем введенную пользователем строку
    val target = scanner.nextLine()
    
    // Вызываем функцию для вычисления минимального количества операций
    val result = minOperations(target)
    
    // Выводим минимальное количество операций
    println("Минимальное количество операций: ${result.first}")
    
    // Выводим заголовок для последовательности операций
    println("Последовательность:")
    
    // Выводим каждую операцию с нумерацией
    result.second.forEachIndexed { index, step -> 
        println("${index + 1}. $step") 
    }
}

fun minOperations(target: String): Pair<Int, List<String>> {
    // Получаем длину целевой строки
    val n = target.length
    
    // Создаем список для хранения минимального количества операций
    val dp = LinkedList<Int>().apply {
        // Инициализируем список значениями от 0 до n
        for (i in 0..n) add(i)
    }
    
    // Флаг для отслеживания использования операции удвоения
    var usedDouble = false

    // Заполняем список dp значениями
    for (i in 1..n) {
        // Базовый случай - добавление одного символа
        dp[i] = dp[i - 1] + 1
        
        // Проверяем возможность операции удвоения
        if (!usedDouble && i % 2 == 0) {
            // Вычисляем половину длины
            val half = i / 2
            // Флаг для проверки возможности удвоения
            var canDouble = true
            
            // Проверяем совпадение символов в двух половинах
            for (j in 0 until half) {
                // Сравниваем символы из первой и второй половины
                if (target[j] != target[half + j]) {
                    canDouble = false
                    break
                }
            }
            
            // Если можно удвоить и это выгодно
            if (canDouble && dp[half] + 1 < dp[i]) {
                // Обновляем значение в dp
                dp[i] = dp[half] + 1
                // Помечаем, что удвоение использовано
                usedDouble = true
            }
        }
    }

    // Создаем список для хранения последовательности операций
    val sequence = LinkedList<String>()
    // Указатель на текущую позицию (начинаем с конца)
    var i = n
    // Флаг для отслеживания использования удвоения при восстановлении
    var doubleUsed = false

    // Восстанавливаем последовательность операций
    while (i > 0) {
        // Проверяем возможность операции удвоения
        if (!doubleUsed && i % 2 == 0) {
            // Вычисляем половину длины
            val half = i / 2
            // Флаг для проверки возможности удвоения
            var canDouble = true
            
            // Проверяем совпадение символов
            for (j in 0 until half) {
                if (target[j] != target[half + j]) {
                    canDouble = false
                    break
                }
            }
            
            // Если операция удвоения была использована
            if (canDouble && dp[i] == dp[half] + 1) {
                // Создаем описание операции
                val operationDesc = buildString {
                    append("Удвоение (получено '")
                    for (k in 0 until i) {
                        append(target[k])
                    }
                    append("')")
                }
                // Добавляем операцию в начало списка
                sequence.addFirst(operationDesc)
                // Переходим к строке до удвоения
                i /= 2
                // Помечаем удвоение как использованное
                doubleUsed = true
                continue
            }
        }
        
        // Создаем описание операции добавления символа
        val operationDesc = buildString {
            append("Добавлен '")
            append(target[i - 1])
            append("'")
        }
        // Добавляем операцию в начало списка
        sequence.addFirst(operationDesc)
        // Переходим к предыдущему символу
        i--
    }

    // Возвращаем результат: количество операций и последовательность
    return Pair(dp[n], sequence)
}