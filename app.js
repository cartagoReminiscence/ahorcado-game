/*
Cómo presentar el trabajo final (según lo que va a considerar el profesor):
    - (ponerlo al final del trabajo) Conclusiones y recomendaciones de la propuesta final. [recomendaciones son en base a las conclusiones]
[Es posible realizarlo en 5 clases? discutir y recomendaciones, crees que puede servir para evaluar en siguientes cursos?, feedback a la institucion, el curso, el proceso de aprendizaje]
[se trata de evaluar todo el proceso de aprendizaje del presente curso]
    - Los que expusieron: 
    - subir video en el trabajo final [duracion 30 segundas aprox]

To do:
    - Agregar un universo de palabras candidatas a ser adivinadas
    - escoger aleatoriamente una palabra del array y asignar (este string) a la variable "palabra"

    - Mostrar en pantalla los acumuladores (usar metodo "document.querySelector") como por ejm:
    las variables "totalCoincidencias" convertir de "_ _ _ _ _ _" a "_ N N _ _ _", 
    "totalFallas" -> "Numero de intentos restantes", las pistas

    - Agregar el boton "Pedir una pista"
    - 

*/

// let palabra = "***********";
// let palabra = "***";
let palabra = "INNATO"

// Genera la misma cantidad de caracteres del string "palabra" con "_" caracteres
const guionBajoPalabraDesc = () => {
    let divPalabraDesc = document.querySelector('#palabra-desconocida');//etiqueta div id="palabra-desconocida"
    // Agregar "_" caracteres a div id="palabra-desconocida"
    let len = palabra.length;
    for(let i = 0; i < len; i++){
        let spanLetraDesc = document.createElement('span');//etiqueta span id="letra-desconocida"
        spanLetraDesc.id = 'letra-desconocida';
        spanLetraDesc.innerText = '__';

        divPalabraDesc.innerHTML += ' ';//espacio entre "spanLetraDesc" elementos
        divPalabraDesc.append( spanLetraDesc );// Agregar a "divPalabraDesc"
    }
};

// Limpia la pantalla de "_" caracteres
const limpiarPalabraDesc = () => {
    let divPalabraDesc = document.querySelector('#palabra-desconocida');
    while( divPalabraDesc.childElementCount != 0 ){
        let firstDivPalabraDesc = divPalabraDesc.firstElementChild;
        divPalabraDesc.removeChild( firstDivPalabraDesc );
    }
};

function validacion(palabra, caracter){
    let tam = palabra.length;//tamaño de la palabra
    let contador = 0;//numero de coincidencias

    for(let i = 0; i < tam; i++)
        if(caracter.toUpperCase() === palabra[i])
            contador += 1;

    return {
        estado: (contador > 0) ? true: false,
        contador,
    };
}

/* Contador */
let num = 2;
const contadorImgSet = num => {
    if( num === 7 ) return 1;
    return num + 1;
};


// Ingresar una palabra
let input = document.querySelector('input');

// 
let totalFallas = 6;//numero de fallas (intentos errados) disponibles
let totalCoincidencias = 0;
let uniendoPalabra = [];
// 
let btnIngresar = document.querySelector('#ingresar');
const ingresar = () => {
    let letra = input.value;
    
    // console.log({ valor_input: input.value });
    
    letra = letra.toUpperCase();
    let { estado, contador: coincidencias } = validacion(palabra, letra);
    
    if(estado && uniendoPalabra.indexOf(letra) === -1){
        totalCoincidencias += coincidencias;
        for(let cont = 0; cont < coincidencias; cont++) uniendoPalabra.push(letra);
        console.log("Acertaste");
    }
    else{
        cambiarImg();
        totalFallas -= 1;
        console.log("Fallaste!!!");
    }
    
    console.log({ totalCoincidencias });
    
    /*  Determina si Ganaste o perdiste el juego   */
    if( totalFallas === 0 ){
        btnIngresar.disabled = true;
        console.log("===================");
        console.log("PERDISTE!!!!!");
        console.log("===================");
    }

    if( totalCoincidencias === palabra.length ){
        btnIngresar.disabled = true;
        console.log("===================");
        console.log("GANASTEEEE!!!!!");
        console.log("===================");
    }
    
};
        
/* Reiniciar el juego */
const reiniciar = () => {
if( picture.childElementCount != 0 ){
    let firstImg = picture.firstElementChild;
    picture.removeChild(firstImg);
    
    num = 2;//reinicia contador
}
};

let picture = document.querySelector('picture');
const iniciar = () => {
    limpiarPalabraDesc();//limpia la pantalla de "_" caracteres
    guionBajoPalabraDesc();// añade "_" caracteres 
    // console.log({ len_palabra: palabra.length });//corroboración del tamaño de "palabra-desconocida"

    totalFallas = 6;
    totalCoincidencias = 0;
    uniendoPalabra = [];
    btnIngresar.disabled = false;
    reiniciar();
    img = document.createElement('img');
    img.src = `./img/ahorcado_2.jpeg`;
    picture.append(img);
    // console.log({ contador: num, hijos: picture.childElementCount });
};

/* Cambiar el estado del juego */
const cambiarImg = () => {
    num = contadorImgSet(num);
    // console.log({ contador: num });

    picture.removeChild(picture.firstElementChild);

    let img = document.createElement('img');
    img.src = `./img/ahorcado_${ num }.jpeg`;

    picture.append(img);
};

// 
iniciar();

console.log({ palabra });