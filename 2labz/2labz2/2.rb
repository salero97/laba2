def normalize_email(email)
  email = email.strip.downcase  # Удаляем пробелы и приводим к нижнему регистру
  username, domain = email.split('@')
  username = username.gsub('.', '').split('+').first
  "#{username}@#{domain}"
rescue
  nil # Возвращаем nil для некорректных email-адресов
end

puts "Введите email-адреса через запятую:"
input = gets.chomp
emails = input.split(',').map(&:strip)  # Разделяем по запятым и убираем пробелы

# Нормализуем и удаляем дубликаты и некорректные адреса
normalized_emails = emails.map { |email| normalize_email(email) }.compact.uniq

puts "\nУникальные адреса после нормализации:"
normalized_emails.each { |email| puts "- #{email}" }

puts "\nКоличество уникальных адресов: #{normalized_emails.size}"