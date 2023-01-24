class PasswordGenerator {
    constructor() {
        //Declarando os caracteres que não serão utilizados na geração da senha
        this.forbiddenChars = "{}[]()/\ '''`~;:.<>^?%";
        this.newForbiddenChar = [...this.forbiddenChars];

        this.password = document.getElementById('password');
        this.passwordDiv = document.getElementById("passwordDiv");
        this.btnPassword = document.getElementById("btnPassword");
        this.slider = document.getElementById("slider");
        this.banidChar = document.getElementById("banidChar");

        this.btnPassword.addEventListener('click', this.generatePassword.bind(this));
        this.slider.addEventListener('input', this.generatePassword.bind(this));
        this.banidChar.addEventListener('keydown',(e)=>{
            let filteredChars;
            if(e.key === "Control" || e.key === "Meta" || e.key === "Shift" || e.key === "Tab" || e.key === "Enter") return;
            filteredChars = e.key;
            this.updateForbiddenChars(filteredChars);
        })
        this.password.addEventListener('click', this.copyPassword.bind(this));


    }

    // Declaração da função para gerar uma nova senha
    generatePassword() {
        // Atualiza o conteúdo do elemento password com a nova senha gerada
        this.password.innerText = this.generationRandomPassword(this.slider.value);
        document.getElementById('copyPassword').classList.add("disabled")
    }

    // Declaração da função para gerar uma senha aleatória
    generationRandomPassword(passwordSize) {
        // Define o intervalo de valores ASCII permitidos para os caracteres da senha
        const max = 127;
        const min = 33;
        // Cria um array vazio para armazenar os valores ASCII gerados
        let numbers = []
        // Gera valores ASCII aleatórios dentro do intervalo permitido
        let ascii = Math.floor(Math.random() * (max - min) + min);
        for (let i = 0; i < passwordSize; i++) {
            while(this.forbiddenChars.includes(String.fromCharCode(ascii))){
                ascii = Math.floor(Math.random() * (max - min) + min);
            }
            numbers.push(ascii);
            ascii = Math.floor(Math.random() * (max - min) + min);
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
    
    //Declaração da função para atualizar os caracteres que não serão utilizados
    updateForbiddenChars(filteredChars){
        if(filteredChars === "Backspace") {
            if(this.banidChar.value === "") this.forbiddenChars = "";
            this.forbiddenChars = this.forbiddenChars.slice(0,-1);
        }else{
            this.forbiddenChars += filteredChars;
        }
    }

    //Declaração da função para copiar a senha gerada para area de transferencia 
    copyPassword(){
        let copyPassword = document.getElementById('copyPassword');
        const password = this.password.innerHTML        
        navigator.clipboard.writeText(password).then(()=>{
            copyPassword.innerText = "Senha copiada";
            copyPassword.classList.remove("disabled")
        })

    }
}

let passwordGenerator = new PasswordGenerator();
document.getElementById("banidChar").value = passwordGenerator.forbiddenChars;