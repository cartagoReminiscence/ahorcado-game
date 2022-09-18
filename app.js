/*
Cómo presentar el trabajo final (según lo que va a considerar el profesor):
    - (ponerlo al final del trabajo) Conclusiones y recomendaciones de la propuesta final. [recomendaciones son en base a las conclusiones]
[Es posible realizarlo en 5 clases? discutir y recomendaciones, crees que puede servir para evaluar en siguientes cursos?, feedback a la institucion, el curso, el proceso de aprendizaje]
[se trata de evaluar todo el proceso de aprendizaje del presente curso]
    - Los que expusieron: 
    - subir video en el trabajo final [duracion 30 segundas aprox]

To do:
    - Agregar un universo de palabras candidatas a ser adivinadas [check]
    - escoger aleatoriamente una palabra del array y asignar (este string) a la variable "palabra" [check]
    - Agregar el boton "Pedir una pista" [check]
    - Muestre en pantalla si perdí o gané [check]

    - Mostrar en pantalla los acumuladores (usar metodo "document.querySelector") como por ejm:
    las variables "totalCoincidencias" convertir de "_ _ _ _ _ _" a "_ N N _ _ _", 
    "totalFallas" -> "Numero de intentos restantes", las pistas

*/

/*  Escoger aleatoriamente palabra-textoPísta de un array  */
//Array de pares de strings: palabra-textoPista
let palabras = [
    ['atlantico', 'Un océano'],
    ['ordenador', 'Una máquina'],
    ['laurel', 'Un árbol'],
    ['plaza', 'Espacio público'],
    ['rueda', 'Gran invento'],
    ['cereza', 'Una fruta'],
    ['petanca', 'Un juego'],
    ['higuera', 'Un árbol'],
    ['everest', 'Un monte'],
    ['relampago', 'Antecede al trueno'],
    ['jirafa', 'Un animal'],
    ['luxemburgo', 'Un país'],
    ['uruguay', 'Un país'],
    ['ilustracion', 'Representación gráfica'],
    ['excursion', 'Actividad en la naturaleza'],
    ['empanadilla', 'De la panadería'],
    ['pastel', 'De la pastelería'],
    ['colegio', 'Lugar para estudiar'],
    ['carrera', 'Competición'],
    ['mermelada', 'Confitura'],
];

//Funcion retona el par de strings: palabra y pista
let escogerPalabraYPista = () => {
    //Generar un numero entero aleatorio en el rango de [0, len> (en nuestro caso len = 20, entonces [0, 20>)
    let len = palabras.length;
    let pos = Math.floor( Math.random() * len );//numero entero aleatorio de 0 a 19, pos: posicion

    let [ palabra, textoPista ] = palabras[pos];//Escoger la palabra y su respectiva pista
    palabra = palabra.toUpperCase();//convertir a mayúsculas
    return [ palabra, textoPista ]
};

let [ palabra, textoPista ] = escogerPalabraYPista();//Asignar la palabra a adivinar y su pista respectiva

// Genera la misma cantidad de caracteres del string "palabra" con "_" caracteres
const guionBajoPalabraDesc = () => {
    let divPalabraDesc = document.querySelector('#palabra-desconocida');//etiqueta div id="palabra-desconocida"
    let parrafoSetLetraDesconocida = document.createElement('p');//etiqueta p id="set-letra-desconocida"
    parrafoSetLetraDesconocida.id = "set-letra-desconocida";
    // Agregar "_" caracteres a div id="palabra-desconocida"
    let len = palabra.length;
    for(let i = 0; i < len; i++){
        let spanLetraDesc = document.createElement('span');//crear etiqueta span id="letra-desconocida"
        spanLetraDesc.className = 'letra-desconocida';
        spanLetraDesc.id = `span-${ i }`;
        spanLetraDesc.innerText = '__';

        parrafoSetLetraDesconocida.innerHTML += ' ';//espacio entre "spanLetraDesc" elementos
        parrafoSetLetraDesconocida.append( spanLetraDesc );// Agregar a "parrafoSetLetraDesconocida"
    }
    divPalabraDesc.append(parrafoSetLetraDesconocida);//agregar a "divPalabraDesc"
};

// Limpia la pantalla de "_" caracteres
const limpiarPalabraDesc = () => {
    let divPalabraDesc = document.querySelector('#palabra-desconocida');
    let firstDivPalabraDesc = divPalabraDesc.firstElementChild;
    if( divPalabraDesc.childElementCount != 0 )
        divPalabraDesc.removeChild( firstDivPalabraDesc );
};

// Reemplazar "_" por palabras encontradas
let agregarCaracteresASetLetraDesc = (arreglo) => {
    let parrafoSetLetraDesconocida = document.querySelector('p');//etiqueta p id="set-letra-desconocida"
};

/*              */ 
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

/*     funcion reconocer posiociones      */
let posiciones;
let reconocerPos = ( letra ) => {
    posiciones = [];
    let iterador = palabra.matchAll(letra);//reconoce la posicion de todas las coincidencias de la 'letra'
    for(let i of iterador) posiciones.push(i.index);
};

/** */
let mostrarEnSetLetraDesc = () => {
    let parrafo = document.querySelector('#set-letra-desconocida');
    let letra = input.value.toUpperCase();
    for(let pos of posiciones){
        let span = parrafo.children[pos];
        span.innerText = letra;
    }
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
    //
    let letra = input.value;
    // 
    letra = letra.toUpperCase();
    let { estado, contador: coincidencias } = validacion(palabra, letra);
    
    if(estado && uniendoPalabra.indexOf(letra) === -1){
        totalCoincidencias += coincidencias;
        for(let cont = 0; cont < coincidencias; cont++){
            uniendoPalabra.push(letra);
        }
        reconocerPos(letra);
        mostrarEnSetLetraDesc();
    }
    else{
        cambiarImg();
        totalFallas -= 1;
    }
    
    /*  Determina si Ganaste o perdiste el juego   */
    if( totalFallas === 0 ){
        btnIngresar.disabled = true;
        btnPedirPista.disabled = true;
        /*              */
        limpiarPalabraDesc();//Limpiar pantalla
        // Perdiste en pantalla
        let parrafoPerdiste = document.createElement('p');
        parrafoPerdiste.className = 'letra-desconocida';
        parrafoPerdiste.innerText = `Perdiste la palabra es ${ palabra } :(`;
        
        let divPalabraDesc = document.querySelector('#palabra-desconocida');//etiqueta div id="palabra-desconocida"
        divPalabraDesc.append( parrafoPerdiste );
    }

    if( totalCoincidencias === palabra.length ){
        btnIngresar.disabled = true;
        btnPedirPista.disabled = true;
         /*              */
        limpiarPalabraDesc();//Limpiar pantalla
        // Perdiste en pantalla
        let parrafoPerdiste = document.createElement('p');
        parrafoPerdiste.className = 'letra-desconocida';
        parrafoPerdiste.innerText = `GANASTE:\t la palabra es ${ palabra }!`;//reemplazar por el atributo innerText de la etiqueta "div"
        
        let divPalabraDesc = document.querySelector('#palabra-desconocida');//etiqueta div id="palabra-desconocida"
        divPalabraDesc.append( parrafoPerdiste );
    }
};

/*  Pedir Pista  */
let divPedirPista = document.querySelector('#div-pedir-pista');//variable referencia a etiqueta 'div' id="div-pedir-pista"
let btnPedirPista = document.querySelector('#pedir-pista');//referencia a 'button' id="pedir-pista"
const pedirPista = () => {
    btnPedirPista.disabled = true;
    //Creacion de la etiqueta 'p' id="pista"
    let pista = document.createElement('p');
    pista.id = 'pista';
    pista.innerText = textoPista;
    //Agregar "pista" al DOM
    divPedirPista.append(pista);
};

const limpiarPista = () => {//Eliminar hijo, si es una pista
    let lastChildPedirPista = divPedirPista.lastElementChild;
    if( lastChildPedirPista.id === 'pista' ) divPedirPista.removeChild( lastChildPedirPista );
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
    posiciones = [];//reiniciar las posiciones
    [ palabra, textoPista ] = escogerPalabraYPista();//Asignar la palabra a adivinar y su pista respectiva
    limpiarPalabraDesc();//limpia la pantalla de "_" caracteres
    guionBajoPalabraDesc();// añade "_" caracteres 

    limpiarPista();//limpia en pantalla la pista de la partida anterior

    btnPedirPista.disabled = false;//habilitar boton al inicio del juego

    input.value = '';//limpia caja de entra

    totalFallas = 6;
    totalCoincidencias = 0;
    uniendoPalabra = [];
    btnIngresar.disabled = false;
    reiniciar();
    img = document.createElement('img');
    img.src = `./img/ahorcado_2.jpeg`;
    picture.append(img);
};

/* Cambiar el estado del juego */
const cambiarImg = () => {
    num = contadorImgSet(num);
    //
    picture.removeChild(picture.firstElementChild);

    let img = document.createElement('img');
    img.src = `./img/ahorcado_${ num }.jpeg`;

    picture.append(img);
};

// 
iniciar();

console.log({ palabra });