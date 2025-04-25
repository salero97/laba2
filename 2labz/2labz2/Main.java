import java.util.*;

public class Main {
    // Удаляет точки и всё после первого '+' в имени пользователя
    public static String normalizeEmail(String email) {
        email = email.trim(); // Удаляем возможные пробелы в начале и конце
        String[] parts = email.split("@");
        if (parts.length != 2) {
            return email; // Если email некорректный, возвращаем как есть
        }
        String username = parts[0].replace(".", "").split("\\+")[0];
        return username.toLowerCase() + "@" + parts[1].toLowerCase();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Введите email-адреса через запятую и пробел:");
        
        // Читаем ввод, удаляем возможные лишние пробелы вокруг запятых
        String input = scanner.nextLine().replaceAll(",\\s+", ",").replaceAll("\\s+,", ",");
        String[] emails = input.split(",");
        
        Set<String> uniqueEmails = new HashSet<>();
        
        for (String email : emails) {
            String normalized = normalizeEmail(email.trim());
            if (!normalized.isEmpty()) {
                uniqueEmails.add(normalized);
            }
        }

        // Вывод результатов
        System.out.println("\nУникальные адреса после нормализации:");
        uniqueEmails.forEach(email -> System.out.println("- " + email));
        System.out.println("\nКоличество уникальных адресов: " + uniqueEmails.size());
        
        scanner.close();
    }
}