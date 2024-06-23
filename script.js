/*const guessbutton = document.getElementById('guessbutton');

let intentos = 6;
let palabra = "APPLE";

window.addEventListener('load', init)

function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

function intentar(){
    console.log("Intento!")
}





const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    gameMessages.innerHTML = ''; // Limpiar mensajes anteriores
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);

*/




let resultElement= document.querySelector(".resultado");
let rowId = 1;
let mainContainer = document.querySelector(".main-container")

// peticion al API de palabras


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '90a8876fbdmsha927c2ff5ed0b0ep1357dfjsn184a0eaf543f',
		'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	}
};


//fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1', options)
//.then(result => result.json())
//.finally()
//.then(data => {

    //console.log(data)
    let word = "apple";
    let wordArray= word.toUpperCase().split("");
    console.log(wordArray)
    var actualRow=document.querySelector(".row");
    
    drawSquares(actualRow);
    listenInput(actualRow);
    addfocus(actualRow);
    
    
    function listenInput(actualRow){
        let guessinput = actualRow.querySelectorAll(".guess-input");
        guessinput = [...guessinput];
    
        let userInput=[]
    
        guessinput.forEach(element => {
            element.addEventListener("input", event=> {
                // si no se ha borrado 
                if(event.inputType !== `deleteContentBackward`){
                    //recoger el ingreso de usuario
                    userInput.push(event.target.value.toUpperCase())
                    console.log(userInput)
                    if(event.target.nextElementSibling){
                        event.target.nextElementSibling.focus();
                    }
                    else{
                        //crear arreglo con las letas 
    
                        let guessinputFIlled = document.querySelectorAll(".guess-input")
                        guessinputFIlled = [...guessinputFIlled]
                        let lastFiveguessinputFIlled = guessinputFIlled.slice(-word.length);
                        let finalUserInput = [];
                        lastFiveguessinputFIlled.forEach(element =>{
                           finalUserInput.push (element.value.toUpperCase())
                        });
    
                        // cambiar estilos si existe la letra pero no en la posicion correcta
                        let existIndexArray = existLetter(wordArray,finalUserInput)
                        existIndexArray.forEach(element => {
    
                            guessinput[element].classList.add("gold");
                        });
                        
                        //comparar arreglos para cambiar estilos
                        let rightIndex = compareArrays(wordArray,finalUserInput)
                        console.log(rightIndex)
                        rightIndex.forEach(element =>{
                            guessinput[element].classList.add("green");
    
                        })
    
                        //si los arreglos son iguales
                        if(rightIndex.length == wordArray.length){
                            showResult("Ganaste!")
                            return;
                        }
                        //crear una nueva fila 
    
                        let actualRow = createRow()
    
                        if (!actualRow){
                            return
                        }
    
                        drawSquares(actualRow)
                        listenInput(actualRow)
                        addfocus(actualRow)
                    }
                }
                else{
                    userInput.pop();
                }
                
            });
        })
    }
    
    // funciones
    
    function compareArrays(array1,array2){
        let iqualsIndex = []
        array1.forEach((element, index)=>{
            if (element == array2[index]){
                console.log(`en la posicion ${index} si son iguales`);
                iqualsIndex.push(index);
            }
            else{
                console.log(`en la posicion ${index} NO son iguales`);
            }
    
        });
        return iqualsIndex;
    }
    
    function existLetter(array1,array2){
        let existIndexArray = [];
        array2.forEach((element,index)=>{
            if (array1.includes(element)){
                existIndexArray.push(index)
            }
        });
        return existIndexArray;
    }
    
    function createRow(){
        rowId++
        if (rowId <= 6){
            let newRow =  document.createElement("div");
            newRow.classList.add("row");
            newRow.setAttribute("id", rowId);
            mainContainer.appendChild(newRow);
            return newRow;
        }
        else{
            showResult(`Intentalo de nuevo, la respuesta correcta era "${word.toUpperCase()}"`)
        }
        
    }
    
    function drawSquares(actualRow){
        wordArray.forEach((item, index) => {
            if (index === 0){
                actualRow.innerHTML += `<input type="text" maxlength="1" class="guess-input focus">`
            }else{
                actualRow.innerHTML += `<input type="text" maxlength="1" class="guess-input">`
            }
            
        })
    }
    
    function addfocus(actualRow){
        let focusElement = actualRow.querySelector(".focus")
        console.log(focusElement)
        focusElement.focus();
    }
    
    function showResult(textMsg){
        resultElement.innerHTML = `
            <p>${textMsg}</p>
            <button class="reiniciarbutton">Reiniciar</button> `
    
        let resetBtn = document.querySelector(".reiniciarbutton")
        resetBtn.addEventListener("click", ()=>{
            location.reload();
        });
    }


//});

