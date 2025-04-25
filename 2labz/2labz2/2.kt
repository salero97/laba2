fun normalizeEmail(email: String): String {
    val parts = email.split("@")
    var username = parts[0].replace(".", "").split("+")[0]
    return "$username@${parts[1]}"
}

fun main() {
    println("Введите email-адреса через запятую и пробел:")
    val input = readLine()!!
    val emails = input.split(", ")

    val uniqueEmails = emails.map { normalizeEmail(it) }.toSet()

    println("\nУникальные адреса после нормализации:")
    uniqueEmails.forEach { println("- $it") }

    println("\nКоличество уникальных адресов: ${uniqueEmails.size}")
}
