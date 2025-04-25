import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    // Класс для хранения результата
    static class Result {
        int steps;
        List<String> sequence;
        
        Result(int steps, List<String> sequence) {
            this.steps = steps;
            this.sequence = sequence;
        }
    }
    
    // Функция для вычисления минимального количества операций
    static Result minOperations(List<Character> target) {
        // Получаем длину целевой последовательности
        int n = target.size();
        
        // Создаем список для хранения минимального количества операций
        List<Integer> dp = new ArrayList<>();
        // Инициализируем список значениями от 0 до n
        for (int i = 0; i <= n; i++) dp.add(i);
        
        // Флаг для отслеживания использования операции удвоения
        boolean usedDouble = false;

        // Заполняем список dp значениями
        for (int i = 1; i <= n; i++) {
            // Базовый случай - добавление одного символа
            dp.set(i, dp.get(i - 1) + 1);
            
            // Проверяем возможность операции удвоения
            if (!usedDouble && i % 2 == 0) {
                // Флаг для проверки возможности удвоения
                boolean canDouble = true;
                // Вычисляем половину длины
                int half = i / 2;
                
                // Проверяем совпадение символов в двух половинах
                for (int j = 0; j < half; j++) {
                    if (target.get(j) != target.get(half + j)) {
                        canDouble = false;
                        break;
                    }
                }
                
                // Если можно удвоить и это выгодно
                if (canDouble && dp.get(half) + 1 < dp.get(i)) {
                    // Обновляем значение в dp
                    dp.set(i, dp.get(half) + 1);
                    // Помечаем удвоение как использованное
                    usedDouble = true;
                }
            }
        }

        // Создаем список для хранения последовательности операций
        List<String> sequence = new ArrayList<>();
        // Указатель на текущую позицию (начинаем с конца)
        int i = n;
        // Флаг для отслеживания использования удвоения при восстановлении
        boolean doubleUsed = false;

        // Восстанавливаем последовательность операций
        while (i > 0) {
            // Проверяем возможность операции удвоения
            if (!doubleUsed && i % 2 == 0) {
                // Вычисляем половину длины
                int half = i / 2;
                // Флаг для проверки возможности удвоения
                boolean canDouble = true;
                
                // Проверяем совпадение символов
                for (int j = 0; j < half; j++) {
                    if (target.get(j) != target.get(half + j)) {
                        canDouble = false;
                        break;
                    }
                }
                
                // Если операция удвоения была использована
                if (canDouble && dp.get(i) == dp.get(half) + 1) {
                    // Создаем описание операции
                    StringBuilder opDesc = new StringBuilder("Удвоение (получено '");
                    for (int k = 0; k < i; k++) opDesc.append(target.get(k));
                    opDesc.append("')");
                    
                    // Добавляем операцию в начало списка
                    sequence.add(0, opDesc.toString());
                    // Переходим к строке до удвоения
                    i = half;
                    // Помечаем удвоение как использованное
                    doubleUsed = true;
                    continue;
                }
            }
            
            // Создаем описание операции добавления символа
            String opDesc = "Добавлен '" + target.get(i - 1) + "'";
            
            // Добавляем операцию в начало списка
            sequence.add(0, opDesc);
            // Переходим к предыдущему символу
            i--;
        }

        // Возвращаем результат: количество операций и последовательность
        return new Result(dp.get(n), sequence);
    }
    
    public static void main(String[] args) {
        // Создаем сканер для чтения ввода
        Scanner scanner = new Scanner(System.in);
        
        // Запрашиваем ввод у пользователя
        System.out.print("Введите целевую строку: ");
        String input = scanner.nextLine();
        
        // Преобразуем строку в список символов
        List<Character> target = new ArrayList<>();
        for (char c : input.toCharArray()) target.add(c);
        
        // Вычисляем результат
        Result result = minOperations(target);
        
        // Выводим минимальное количество операций
        System.out.println("Минимальное количество операций: " + result.steps);
        
        // Выводим заголовок для последовательности операций
        System.out.println("Последовательность:");
        
        // Выводим каждую операцию с нумерацией
        for (int i = 0; i < result.sequence.size(); i++) {
            System.out.println((i + 1) + ". " + result.sequence.get(i));
        }
    }
}