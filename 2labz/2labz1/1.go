package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// Функция для вычисления минимального количества операций
func minOperations(target []rune) (int, []string) {
	// Получаем длину целевой последовательности
	n := len(target)

	// Создаем слайс для хранения минимального количества операций
	dp := make([]int, n+1)
	// Инициализируем слайс значениями от 0 до n
	for i := range dp {
		dp[i] = i
	}

	// Флаг для отслеживания использования операции удвоения
	usedDouble := false

	// Заполняем слайс dp значениями
	for i := 1; i <= n; i++ {
		// Базовый случай - добавление одного символа
		dp[i] = dp[i-1] + 1

		// Проверяем возможность операции удвоения
		if !usedDouble && i%2 == 0 {
			// Флаг для проверки возможности удвоения
			canDouble := true
			// Вычисляем половину длины
			half := i / 2

			// Проверяем совпадение символов в двух половинах
			for j := 0; j < half; j++ {
				if target[j] != target[half+j] {
					canDouble = false
					break
				}
			}

			// Если можно удвоить и это выгодно
			if canDouble && dp[half]+1 < dp[i] {
				// Обновляем значение в dp
				dp[i] = dp[half] + 1
				// Помечаем удвоение как использованное
				usedDouble = true
			}
		}
	}

	// Создаем слайс для хранения последовательности операций
	sequence := make([]string, 0)
	// Указатель на текущую позицию (начинаем с конца)
	i := n
	// Флаг для отслеживания использования удвоения при восстановлении
	doubleUsed := false

	// Восстанавливаем последовательность операций
	for i > 0 {
		// Проверяем возможность операции удвоения
		if !doubleUsed && i%2 == 0 {
			// Вычисляем половину длины
			half := i / 2
			// Флаг для проверки возможности удвоения
			canDouble := true

			// Проверяем совпадение символов
			for j := 0; j < half; j++ {
				if target[j] != target[half+j] {
					canDouble = false
					break
				}
			}

			// Если операция удвоения была использована
			if canDouble && dp[i] == dp[half]+1 {
				// Создаем описание операции
				var opDesc strings.Builder
				opDesc.WriteString("Удвоение (получено '")
				for k := 0; k < i; k++ {
					opDesc.WriteRune(target[k])
				}
				opDesc.WriteString("')")

				// Добавляем операцию в начало слайса
				sequence = append([]string{opDesc.String()}, sequence...)
				// Переходим к строке до удвоения
				i = half
				// Помечаем удвоение как использованное
				doubleUsed = true
				continue
			}
		}

		// Создаем описание операции добавления символа
		opDesc := fmt.Sprintf("Добавлен '%c'", target[i-1])

		// Добавляем операцию в начало слайса
		sequence = append([]string{opDesc}, sequence...)
		// Переходим к предыдущему символу
		i--
	}

	// Возвращаем результат: количество операций и последовательность
	return dp[n], sequence
}

func main() {
	// Создаем читатель для ввода
	reader := bufio.NewReader(os.Stdin)

	// Запрашиваем ввод у пользователя
	fmt.Print("Введите целевую строку: ")
	input, _ := reader.ReadString('\n')

	// Преобразуем строку в слайс рун
	target := []rune(strings.TrimSpace(input))

	// Вычисляем результат
	steps, sequence := minOperations(target)

	// Выводим минимальное количество операций
	fmt.Printf("Минимальное количество операций: %d\n", steps)

	// Выводим заголовок для последовательности операций
	fmt.Println("Последовательность:")

	// Выводим каждую операцию с нумерацией
	for i, step := range sequence {
		fmt.Printf("%d. %s\n", i+1, step)
	}
}
