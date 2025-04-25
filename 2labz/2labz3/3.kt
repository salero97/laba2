fun main() {
    print("Введите количество чисел: ")
    val n = readLine()!!.toInt()
    
    val result = mutableListOf<String>()
    for (i in 1..n) {
        print("Введите число $i: ")
        val num = readLine()!!.toInt()
        
        // Пропускаем числа от 1 до 9
        if (num in 1..9) continue
        
        // Переворачиваем число
        val reversed = num.toString().reversed().toInt()
        result.add(reversed.toString())
    }
    
    println("Перевернутые числа без ведущих нулей: ${result.joinToString(" ")}")
}