const display = document.getElementById('display');
const keys = document.querySelectorAll('.keyboard div');

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
            // só mostra no display se a condição acima for verdadeira
            display.textContent += value;
        }
        // verifica se tem algum número no display e se uma tecla de operação foi clicada
        if (display.textContent && keyClass && keyClass.includes('operation-key')) {
            // chama a função para criar a expressão númerica passando o valor da operação
            createExpression(value);
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
    let number1 = Number(expressionArray[0]);
    let number2 = Number(expressionArray[2]);
    // pega a operação escolhida, na expressão
    let operation = expressionArray[1];

    // verifica qual é a operação e realiza ela
    switch(operation) {
        case '+':
            let sumResult = number1 + number2;
            display.textContent = sumResult;
        break;
        case '-':
            let subtractionResult = number1 - number2
            display.textContent = subtractionResult;
        break;
        case 'x':
            let multiplicationResult = number1 * number2;
            display.textContent = multiplicationResult;
        break;
        case '÷':
            if (number2 === 0) {
                alert('Não é possível dividir por 0')
                display.textContent = '';
            } else {
                let divisionResult = number1 / number2;
                if (Number.isInteger(divisionResult)) {
                    display.textContent = divisionResult;
                } else {
                    display.textContent = divisionResult.toFixed(1);
                }
            }
    }
    console.log(expressionArray);
    // limpa o array com a expressão para poder começar de novo
    expressionArray.splice(0);
    // se apertar a tecla = ele limpa o array da expressão, para poder começar de novo
    if (operation == '=') {
        expression.splice(0);
    }
}