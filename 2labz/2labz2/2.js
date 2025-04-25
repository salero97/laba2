// Функция нормализации email:
function normalizeEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) return null; // проверка формата email
    
    const username = parts[0].replace(/\./g, '').split('+')[0];
    return `${username}@${parts[1]}`.toLowerCase(); // приводим к нижнему регистру
}

// Основная функция
async function processEmails() {
    // Импортируем модуль readline для работы с консольным вводом
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Запрашиваем email-адреса у пользователя
    const input = await new Promise(resolve => {
        readline.question('Введите email-адреса через запятую: ', resolve);
    });
    readline.close();

    if (!input.trim()) {
        console.log('Ввод отменен или пуст');
        return;
    }

    // Разбиваем ввод на отдельные адреса
    const emails = input.split(',').map(email => email.trim());
    const uniqueEmails = new Set();
    
    // Обрабатываем каждый email
    for (const email of emails) {
        const normalized = normalizeEmail(email);
        if (normalized) {
            uniqueEmails.add(normalized);
        } else {
            console.warn(`Некорректный email: ${email}`);
        }
    }
    
    // Выводим результаты
    console.log('\n=== Результаты обработки ===');
    console.log('Исходные адреса:', input);
    console.log('Уникальные адреса после нормализации:');
    uniqueEmails.forEach(email => console.log(`- ${email}`));
    console.log(`\nИтого уникальных адресов: ${uniqueEmails.size}`);
}

// Запускаем обработку
processEmails();