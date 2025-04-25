import Foundation

func normalizeEmail(_ email: String) -> String {
    let parts = email.components(separatedBy: "@")
    var username = parts[0].replacingOccurrences(of: ".", with: "")
    if let plusRange = username.range(of: "+") {
        username = String(username[..<plusRange.lowerBound])
    }
    return "\(username)@\(parts[1])"
}

print("Введите email-адреса через запятую и пробел:")
if let input = readLine() {
    let emails = input.components(separatedBy: ", ")
    var uniqueEmails = Set<String>()

    for email in emails {
        uniqueEmails.insert(normalizeEmail(email.trimmingCharacters(in: .whitespaces)))
    }

    print("\nУникальные адреса после нормализации:")
    for email in uniqueEmails {
        print("- \(email)")
    }

    print("\nКоличество уникальных адресов: \(uniqueEmails.count)")
}
