#include <iostream>
#include <vector>

using namespace std;

int main() {
    // Запрашиваем количество чисел
    cout << "Введите количество чисел: ";
    int n;
    cin >> n;
    
    vector<int> numbers;
    vector<int> result;
    
    // Вводим числа
    for (int i = 0; i < n; i++) {
        cout << "Введите число " << i+1 << ": ";
        int num;
        cin >> num;
        numbers.push_back(num);
    }
    
    // Обрабатываем каждое число
    for (int num : numbers) {
        // Пропускаем числа от 1 до 9
        if (num >= 1 && num <= 9) {
            result.push_back(num);
            continue;
        }
        
        // Переворачиваем число
        int reversed = 0;
        int temp = num;
        while (temp > 0) {
            reversed = reversed * 10 + temp % 10;
            temp /= 10;
        }
        result.push_back(reversed);
    }
    
    // Выводим результат
    cout << "Перевернутые числа без ведущих нулей: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}