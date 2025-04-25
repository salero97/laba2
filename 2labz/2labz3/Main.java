import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            System.out.print("Введите количество чисел: ");
            int n = scanner.nextInt();
            
            ArrayList<String> result = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                System.out.printf("Введите число %d: ", i+1);
                int num = scanner.nextInt();
                
                if (num >= 1 && num <= 9) continue;
                
                int reversed = 0;
                int temp = num;
                while (temp > 0) {
                    reversed = reversed * 10 + temp % 10;
                    temp /= 10;
                }
                result.add(Integer.toString(reversed));
            }
            
            System.out.println("Перевернутые числа без ведущих нулей: " + String.join(" ", result));
        } finally {
            scanner.close(); // Закрываем Scanner для предотвращения утечки ресурсов
        }
    }
}