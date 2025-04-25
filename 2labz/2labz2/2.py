def normalize_email(email):
    email = email.strip()  # Удаляем пробелы в начале и конце
    username, domain = email.split('@')
    username = username.replace('.', '')          # Удаляем все точки
    username = username.split('+')[0]             # Игнорируем часть после +
    return f"{username.lower()}@{domain.lower()}"  # Приводим к нижнему регистру

print("Введите email-адреса через запятую:")
input_emails = [email.strip() for email in input().split(',')]  # Разделяем по запятым и убираем пробелы

normalized_emails = []
for email in input_emails:
    try:
        normalized = normalize_email(email)
        normalized_emails.append(normalized)
    except ValueError:
        print(f"Некорректный email: {email}")

unique_emails = set(normalized_emails)           # Уникальные адреса

print("\nУникальные адреса после нормализации:")
for email in sorted(unique_emails):
    print(f"- {email}")

print(f"\nКоличество уникальных адресов: {len(unique_emails)}")