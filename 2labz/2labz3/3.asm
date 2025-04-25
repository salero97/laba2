section .data
    prompt_count db "Введите количество чисел: ", 0
    prompt_num db "Введите число ", 0
    prompt_colon db ": ", 0
    result_msg db "Перевернутые числа без ведущих нулей: ", 0
    space db " ", 0
    newline db 10, 0
    buffer times 32 db 0

section .bss
    numbers resd 100  ; Максимум 100 чисел

section .text
    global _start

print_string:
    mov rsi, rdi
    mov rdx, 0
.count:
    cmp byte [rsi + rdx], 0
    je .done
    inc rdx
    jmp .count
.done:
    mov rax, 1
    mov rdi, 1
    syscall
    ret

read_number:
    mov rax, 0
    mov rdi, 0
    mov rsi, buffer
    mov rdx, 32
    syscall
    
    xor rax, rax
    xor rcx, rcx
.convert:
    movzx rdx, byte [buffer + rcx]
    cmp rdx, 10
    je .done_convert
    cmp rdx, '0'
    jb .done_convert
    cmp rdx, '9'
    ja .done_convert
    imul rax, 10
    sub rdx, '0'
    add rax, rdx
    inc rcx
    jmp .convert
.done_convert:
    ret

reverse_number:
    xor rsi, rsi
    mov rbx, 10
.reverse_loop:
    xor rdx, rdx
    div rbx
    imul rsi, 10
    add rsi, rdx
    test rax, rax
    jnz .reverse_loop
    mov rax, rsi
    ret

print_number:
    mov rbx, 10
    lea rcx, [buffer + 31]
    mov byte [rcx], 0
.dec_loop:
    dec rcx
    xor rdx, rdx
    div rbx
    add dl, '0'
    mov [rcx], dl
    test rax, rax
    jnz .dec_loop
    
    mov rsi, rcx
    lea rdx, [buffer + 31]
    sub rdx, rcx
    
    mov rax, 1
    mov rdi, 1
    syscall
    ret

_start:
    mov rdi, prompt_count
    call print_string
    call read_number
    mov r8, rax
    
    xor r9, r9
    mov r10, numbers
.read_loop:
    cmp r9, r8
    jge .process_numbers

    mov rdi, prompt_num
    call print_string
    mov rax, r9
    add rax, 1
    call print_number
    mov rdi, prompt_colon
    call print_string
    
    call read_number
    mov [r10 + r9*4], eax
    inc r9
    jmp .read_loop

.process_numbers:
    mov rdi, result_msg
    call print_string

    xor r9, r9
.print_loop:
    cmp r9, r8
    jge .exit_print

    mov eax, [numbers + r9*4]
    cmp eax, 1
    jl .next_number
    cmp eax, 9
    jle .next_number

    xor rdx, rdx
    call reverse_number
    call print_number
    mov rdi, space
    call print_string

.next_number:
    inc r9
    jmp .print_loop

.exit_print:
    mov rdi, newline
    call print_string

.exit:
    mov rax, 60
    xor rdi, rdi
    syscall