const pantalla = document.querySelector('.pantalla-calculadora');
const teclas = document.querySelector('.teclas-calculadora');

let valorPantalla = '0';
let primerOperando = null;
let operador = '';

function actualizarPantalla() {
    pantalla.value = valorPantalla;
}

function manejarEntrada(entrada) {
    if (!isNaN(entrada) || entrada === '.') {
        if (valorPantalla === '0') {
            valorPantalla = entrada;
        } else {
            valorPantalla += entrada;
        }
    } else if (entrada === 'AC') {
        valorPantalla = '0';
        primerOperando = null;
        operador = '';
    } else if (entrada === '=') {
        if (primerOperando !== null && operador) {
            valorPantalla = calcular(primerOperando, parseFloat(valorPantalla), operador).toString();
            primerOperando = null;
            operador = '';
        }
    } else {
        if (operador && primerOperando !== null) {
            valorPantalla = calcular(primerOperando, parseFloat(valorPantalla), operador).toString();
        }
        primerOperando = parseFloat(valorPantalla);
        operador = entrada;
        valorPantalla = '0';
    }

    actualizarPantalla();
}

function calcular(primerOperando, segundoOperando, operador) {
    switch (operador) {
        case '+':
            return primerOperando + segundoOperando;
        case '-':
            return primerOperando - segundoOperando;
        case '*':
            return primerOperando * segundoOperando;
        case '/':
            return primerOperando / segundoOperando;
        default:
            return segundoOperando;
    }
}

// Asegúrate de que el DOM esté completamente cargado antes de intentar seleccionar elementos
document.addEventListener('DOMContentLoaded', () => {
    teclas.addEventListener('click', (evento) => {
        if (evento.target.matches('button')) {
            manejarEntrada(evento.target.value);
        }
    });

    // Actualiza la pantalla inicial
    actualizarPantalla();
});
