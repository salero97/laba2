#include <iostream>
#include <vector>
#include <list>

// Функция для вычисления минимального количества операций
std::pair<int, std::list<std::string>> minOperations(const std::vector<char>& target) {
    // Получаем длину целевой последовательности
    int n = target.size();
    
    // Создаем вектор для хранения минимального количества операций
    std::vector<int> dp;
    // Инициализируем вектор значениями от 0 до n
    for(int i = 0; i <= n; i++) dp.push_back(i);
    
    // Флаг для отслеживания использования операции удвоения
    bool usedDouble = false;

    // Заполняем вектор dp значениями
    for(int i = 1; i <= n; i++) {
        // Базовый случай - добавление одного символа
        dp[i] = dp[i-1] + 1;
        
        // Проверяем возможность операции удвоения
        if(!usedDouble && i % 2 == 0) {
            // Флаг для проверки возможности удвоения
            bool canDouble = true;
            // Вычисляем половину длины
            int half = i/2;
            
            // Проверяем совпадение символов в двух половинах
            for(int j = 0; j < half; j++) {
                if(target[j] != target[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            
            // Если можно удвоить и это выгодно
            if(canDouble && dp[half] + 1 < dp[i]) {
                // Обновляем значение в dp
                dp[i] = dp[half] + 1;
                // Помечаем удвоение как использованное
                usedDouble = true;
            }
        }
    }

    // Создаем список для хранения последовательности операций
    std::list<std::string> sequence;
    // Указатель на текущую позицию (начинаем с конца)
    int i = n;
    // Флаг для отслеживания использования удвоения при восстановлении
    bool doubleUsed = false;

    // Восстанавливаем последовательность операций
    while(i > 0) {
        // Проверяем возможность операции удвоения
        if(!doubleUsed && i % 2 == 0) {
            // Вычисляем половину длины
            int half = i/2;
            // Флаг для проверки возможности удвоения
            bool canDouble = true;
            
            // Проверяем совпадение символов
            for(int j = 0; j < half; j++) {
                if(target[j] != target[half + j]) {
                    canDouble = false;
                    break;
                }
            }
            
            // Если операция удвоения была использована
            if(canDouble && dp[i] == dp[half] + 1) {
                // Создаем описание операции
                std::string opDesc = "Удвоение (получено '";
                for(int k = 0; k < i; k++) opDesc += target[k];
                opDesc += "')";
                
                // Добавляем операцию в начало списка
                sequence.push_front(opDesc);
                // Переходим к строке до удвоения
                i = half;
                // Помечаем удвоение как использованное
                doubleUsed = true;
                continue;
            }
        }
        
        // Создаем описание операции добавления символа
        std::string opDesc = "Добавлен '";
        opDesc += target[i-1];
        opDesc += "'";
        
        // Добавляем операцию в начало списка
        sequence.push_front(opDesc);
        // Переходим к предыдущему символу
        i--;
    }

    // Возвращаем результат: количество операций и последовательность
    return {dp[n], sequence};
}

int main() {
    // Выводим приглашение для ввода
    std::cout << "Введите целевую строку: ";
    
    // Читаем ввод пользователя
    std::string input;
    std::cin >> input;
    
    // Преобразуем строку в вектор символов
    std::vector<char> target(input.begin(), input.end());
    
    // Вычисляем результат
    auto result = minOperations(target);
    
    // Выводим минимальное количество операций
    std::cout << "Минимальное количество операций: " << result.first << std::endl;
    
    // Выводим заголовок для последовательности операций
    std::cout << "Последовательность:" << std::endl;
    
    // Выводим каждую операцию с нумерацией
    int counter = 1;
    for(const auto& step : result.second) {
        std::cout << counter++ << ". " << step << std::endl;
    }
    
    return 0;
}