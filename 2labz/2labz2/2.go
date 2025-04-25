package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func normalizeEmail(email string) string {
	email = strings.TrimSpace(email)
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return "" // пропускаем некорректные email
	}
	username := strings.ReplaceAll(parts[0], ".", "")
	username = strings.Split(username, "+")[0]
	return username + "@" + parts[1]
}

func main() {
	fmt.Println("Введите email-адреса через запятую и пробел:")
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)

	emails := strings.Split(input, ", ")
	uniqueEmails := make(map[string]bool)

	for _, email := range emails {
		normalized := normalizeEmail(email)
		if normalized != "" {
			uniqueEmails[normalized] = true
		}
	}

	fmt.Println("\nУникальные адреса после нормализации:")
	for email := range uniqueEmails {
		fmt.Println("-", email)
	}

	fmt.Printf("\nКоличество уникальных адресов: %d\n", len(uniqueEmails))
}
