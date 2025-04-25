#include <iostream>
#include <string>
#include <vector> 
using namespace std; 

// функция для обработки email
string fix_email(string email) {
    int dog_position = -1; // позиция @
    // ищем где собака
    for(int i = 0; i < email.length(); i++) {
        if(email[i] == '@') {
            dog_position = i;
            break; // нашли и хватит
        }
    }
    // если нет собаки - вернем как есть (хотя так не должно быть)
    if(dog_position == -1) return email;
    
    // берем часть до собаки
    string name = email.substr(0, dog_position);
    // и после собаки
    string domen = email.substr(dog_position);
    
    // убираем точки в имени
    string clean_name = "";
    for(char c : name) {
        if(c != '.') { // если не точка - добавляем
            clean_name += c;
        }
    }
    
    // теперь ищем плюс
    bool plus_found = false;
    string final_name = "";
    for(char c : clean_name) {
        if(c == '+') { // нашли плюс - все, дальше не надо
            plus_found = true;
            break;
        }
        final_name += c; // добавляем буквы пока не встретили плюс
    }
    
    // склеиваем имя и домен
    return final_name + domen;
}

int main() {
    cout << "Введите email адреса через запятую:" << endl;
    string input;
    getline(cin, input); // считываем всю строку
    
    // будем хранить уникальные email
    vector<string> uniq_emails;
    
    // разбиваем строку по запятым
    string current_email = "";
    for(char c : input) {
        if(c == ',') {
            // удаляем пробелы в начале и конце
            while(!current_email.empty() && current_email[0] == ' ') {
                current_email.erase(0, 1);
            }
            while(!current_email.empty() && current_email.back() == ' ') {
                current_email.pop_back();
            }
            if(!current_email.empty()) {
                // обрабатываем email
                string fixed = fix_email(current_email);
                // проверяем есть ли уже такой
                bool already_exists = false;
                for(string s : uniq_emails) {
                    if(s == fixed) {
                        already_exists = true;
                        break;
                    }
                }
                if(!already_exists) {
                    uniq_emails.push_back(fixed);
                }
            }
            current_email = "";
        } else {
            current_email += c;
        }
    }
    if(!current_email.empty()) {
        while(!current_email.empty() && current_email[0] == ' ') {
            current_email.erase(0, 1);
        }
        while(!current_email.empty() && current_email.back() == ' ') {
            current_email.pop_back();
        }
        string fixed = fix_email(current_email);
        bool already_exists = false;
        for(string s : uniq_emails) {
            if(s == fixed) {
                already_exists = true;
                break;
            }
        }
        if(!already_exists) {
            uniq_emails.push_back(fixed);
        }
    }
    
    // выводим результат
    cout << "Уникальные адреса:" << endl;
    for(string email : uniq_emails) {
        cout << "- " << email << endl;
    }
    cout << "Всего уникальных: " << uniq_emails.size() << endl;
    
    return 0; 
}
