# Ввод количества чисел
n = int(input("Введите количество чисел: "))
numbers = [int(input(f"Введите число {i+1}: ")) for i in range(n)]

result = []
for num in numbers:
    # Пропускаем числа от 1 до 9
    if 1 <= num <= 9:
        continue
    
    # Переворачиваем число
    reversed_num = 0
    temp = num
    while temp > 0:
        reversed_num = reversed_num * 10 + temp % 10
        temp = temp // 10
    result.append(str(reversed_num))

print("Перевернутые числа без ведущих нулей:", ' '.join(result))