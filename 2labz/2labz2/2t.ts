import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function normalizeEmail(email: string): string {
    const [username, domain] = email.toLowerCase().split('@');
    if (!username || !domain) return '';
    const normalized = username.replace(/\./g, '').split('+')[0];
    return `${normalized}@${domain}`;
}

async function main() {
    const rl = readline.createInterface({ input, output });
    
    try {
        const input = await rl.question('Введите email-адреса через запятую: ');
        const emails = input.split(',').map(e => e.trim());
        const unique = new Set<string>();

        for (const email of emails) {
            const normalized = normalizeEmail(email);
            if (normalized) unique.add(normalized);
        }

        console.log('\nУникальные адреса после нормализации:');
        unique.forEach(email => console.log(`- ${email}`));
        console.log(`\nКоличество уникальных адресов: ${unique.size}`);
    } finally {
        rl.close();
    }
}

main().catch(console.error);