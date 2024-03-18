const display = document.getElementById('display');
const keys = document.querySelectorAll('#keyboard div');

// array que vai guardar a expressão numérica
const expression = [];

// adiciona evento de click em cada tecla da calculadora
keys.forEach(key => {
    key.addEventListener('click', event => {
        let key = event.target;
        let keyClass = key.getAttribute('class');
        let value = key.getAttribute('id');

        // verifica se o elemento clicado tem uma classe e se tem a classe 'display-key'
        if (keyClass && keyClass.includes('display-key')) {
            // se já tiver um número no display e clicar na tecla de sinal negativo, adiciona o sinal na frente do número
            if (keyClass.includes('negative-key') && display.textContent != '') {
                let negativeKey = value + display.textContent
                display.textContent = negativeKey;
            }
            else {
                display.textContent += value;
            }

        }
        // verifica se tem algum número no display e se uma tecla de operação foi clicada
        if (display.textContent && keyClass && keyClass.includes('operation-key')) {
            // chama a função para criar a expressão númerica passando o valor da operação
            createExpression(value);
        }
        // funcionalidade na tecla de deletar
        if (value === 'delete_key' && display.textContent != '') {
            // guarda o valor que está no display
            const currentNumber = display.textContent;
            // guarda o número sem o último dígito
            const newNumber = currentNumber.substring(0, currentNumber.length - 1);
            // exibe o novo número (sem o último dígito) no display
            display.textContent = newNumber;
        }
    })
});

// função que cria a expressão, recebendo o valor da operação desejada
function createExpression(operationValue) {
    // passa o número digitado e a operação para o array da expressão
    expression.push(display.textContent);
    expression.push(operationValue);
    // limpa o display
    display.textContent = '';
    // se o array tiver tamanho 4, significa que dois números foram passados
    // isso permite que somente realize operações com 2 números
    if (expression.length === 4) {
        // chama a função que realiza a operação, passando a expressão
        operationFunction(expression);
    }
}

// função que realiza a operação e recebe uma expressão do tipo: [1, +, 2, =]
function operationFunction(expressionArray) {
    // pega os números na expressão
    // substitui a vírgula pelo ponto para fazer o cálculo
    let number1 = expressionArray[0].replace(',', '.');
    let number2 = expressionArray[2].replace(',', '.');
    // pega a operação escolhida, na expressão
    let operation = expressionArray[1];
    let result;
    let stringResult;

    // verifica qual é a operação e realiza ela
    switch (operation) {
        case '+':
            result = Number(number1) + Number(number2);
            // converte o resultado em uma string
            stringResult = result.toString();
            // substitui o ponto pela vírgula quando for mostrar no display
            display.textContent = stringResult.replace('.', ',');
            break;
        case '-':
            result = Number(number1) - Number(number2);
            stringResult = result.toString();
            display.textContent = stringResult.replace('.', ',');
            break;
        case 'x':
            result = Number(number1) * Number(number2);
            stringResult = result.toString();
            display.textContent = stringResult.replace('.', ',');
            break;
        case '÷':
            if (number2 == 0) {
                alert('Não é possível dividir por 0')
                display.textContent = '';
            } else {
                result = Number(number1) / Number(number2);
                if (Number.isInteger(result)) {
                    display.textContent = result;
                } else {
                    stringResult = result.toFixed(9).toString();
                    display.textContent = stringResult.replace('.', ',');
                }
            }
    }
    console.log(expressionArray);
    // limpa o array com a expressão para poder começar de novo
    expressionArray.splice(0);
    // se apertar a tecla = ele limpa o array da expressão, para poder começar de novo
    if (operation == '=') {
        expressionArray.splice(0);
    }
}