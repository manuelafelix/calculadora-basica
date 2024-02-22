const display = document.getElementById('display');
const keys = document.querySelectorAll('.keyboard div');

const expression = [];

// adiciona evento de click em cada tecla da calculadora
keys.forEach(key => {
    key.addEventListener('click', event => {
        let key = event.target;
        let keyClass = key.getAttribute('class');
        let value = key.getAttribute('id')
        // verifica se o elemento clicado tem uma class e se tem a class 'display-key'
        if (keyClass && keyClass.includes('display-key')) {
            // só mostra no display se a condição acima for verdadeira
            display.textContent += value;
        } 
        // se o elemento clicado tiver a classe 'operation-key'
        else if (display.textContent && keyClass && keyClass.includes('operation-key')) {
            // passa o número digitado e a operação para o array da expressão
            expression.push(display.textContent);
            expression.push(value);
            // limpa o display
            display.textContent = '';
            
            // se o array tiver tamanho 4, significa que dois números foram passados
            if (expression.length === 4) {
                // chama a função que realiza a operação, passando a expressão
                operationFunction(expression);
            }
        }
    })
});

// função que realiza a operação dos números
function operationFunction(array) {
    // pega os números digitados
    let number1 = Number(array.slice(0, 1));
    let number2 = Number(array.slice(2, 3));
    // pega a operação escolhida
    let operation = array.slice(1, 2);

    // verifica qual é a operação e realiza ela
    if (operation == '+') {
        display.textContent = (number1 + number2);
    } 
    else if (operation == '-') {
        display.textContent = (number1 - number2);
    }
    else if (operation == 'x') {
        display.textContent = (number1 * number2);
    }
    else if (operation == '÷') {
        if (number2 === 0) {
            alert('Não é possível dividir por 0')
            display.textContent = ''; 
        } else {
            display.textContent = (number1 / number2);
        }
    }
}