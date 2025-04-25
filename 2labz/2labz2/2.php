<?php
function normalizeEmail($email) {
    list($username, $domain) = explode('@', $email);
    $username = str_replace('.', '', $username);
    $username = explode('+', $username)[0];
    return $username . '@' . $domain;
}

echo "Введите email-адреса через запятую и пробел:\n";
$input = trim(fgets(STDIN));
$emails = explode(', ', $input);

$uniqueEmails = [];
foreach ($emails as $email) {
    $normalized = normalizeEmail($email);
    $uniqueEmails[$normalized] = true;
}

echo "\nУникальные адреса после нормализации:\n";
foreach (array_keys($uniqueEmails) as $email) {
    echo "- $email\n";
}

echo "\nКоличество уникальных адресов: " . count($uniqueEmails) . "\n";
?>
