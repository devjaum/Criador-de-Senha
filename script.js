class PasswordGenerator {
    constructor() {
        this.password = document.getElementById('password');
        this.passwordDiv = document.getElementById("passwordDiv");
        this.btnPassword = document.getElementById("btnPassword");
        this.slider = document.getElementById("slider");

        this.btnPassword.addEventListener('click', this.generatePassword.bind(this));
        this.slider.addEventListener('input', this.generatePassword.bind(this));
    }

    // Declaração da função para gerar uma nova senha
    generatePassword() {
        // Atualiza o conteúdo do elemento password com a nova senha gerada
        this.password.innerText = this.generationRandomPassword(this.slider.value);
    }

    // Declaração da função para gerar uma senha aleatória
    generationRandomPassword(passwordSize) {
        // Define o intervalo de valores ASCII permitidos para os caracteres da senha
        const max = 127;
        const min = 33;
        // Cria um array vazio para armazenar os valores ASCII gerados
        let numbers = []
        // Gera valores ASCII aleatórios dentro do intervalo permitido
        for (let i = 0; i < passwordSize; i++) {
            let ascii = Math.floor(Math.random() * (max - min) + min);
            numbers.push(ascii);
        }
        // Converte os valores ASCII gerados em caracteres e retorna a senha gerada
        return this.convertAscii(numbers);
    }

    // Declaração da função para converter valores ASCII em caracteres
    convertAscii(numbers) {
        // Inicializa uma string vazia para armazenar a senha gerada
        let txt = "";
        // Itera pelo array de valores ASCII e adiciona o caractere correspondente à string txt
        numbers.forEach(element => {
            txt += String.fromCharCode(element);
        });
        // Retorna a senha gerada
        return txt;
    }
}

let passwordGenerator = new PasswordGenerator();
