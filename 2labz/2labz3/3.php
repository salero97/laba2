<?php
echo "Введите количество чисел: ";
$n = intval(trim(fgets(STDIN)));

$result = [];
for ($i = 0; $i < $n; $i++) {
    echo "Введите число " . ($i+1) . ": ";
    $num = intval(trim(fgets(STDIN)));
    
    // Пропускаем числа от 1 до 9
    if ($num >= 1 && $num <= 9) continue;
    
    // Переворачиваем число
    $reversed = intval(strrev(strval($num)));
    array_push($result, $reversed);
}

echo "Перевернутые числа без ведущих нулей: " . implode(" ", $result) . "\n";
?>