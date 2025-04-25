package main

import "fmt"

func main() {
	var n int
	fmt.Print("Введите количество чисел: ")
	fmt.Scan(&n)

	var result []string
	for i := 0; i < n; i++ {
		var num int
		fmt.Printf("Введите число %d: ", i+1)
		fmt.Scan(&num)

		// Пропускаем числа от 1 до 9
		if num >= 1 && num <= 9 {
			continue
		}

		// Переворачиваем число
		reversed := 0
		for num > 0 {
			reversed = reversed*10 + num%10
			num /= 10
		}
		result = append(result, fmt.Sprint(reversed))
	}
	fmt.Println("Перевернутые числа без ведущих нулей:", result)
}
