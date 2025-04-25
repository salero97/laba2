print "Введите количество чисел: "
n = gets.chomp.to_i

result = []
(1..n).each do |i|
  print "Введите число #{i}: "
  num = gets.chomp.to_i
  
  # Пропускаем числа от 1 до 9
  next if (1..9).include?(num)
  
  # Переворачиваем число
  reversed = num.to_s.reverse.to_i
  result << reversed
end

puts "Перевернутые числа без ведущих нулей: #{result.join(' ')}"