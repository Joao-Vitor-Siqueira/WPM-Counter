const input = document.getElementById("input");
const board = document.getElementById("textContainer");
const timer = document.getElementById("timer");
let wordsTyped = 0;
let misses = 0;
let secondsLeft = 60;

let regExp = /\w+/g;
let allWords = [...board.innerHTML.matchAll(regExp)];
let tries = 0;
let spansLength = 0;



function countDown(){
    let myinterval = setInterval(() =>{
        timer.innerHTML = secondsLeft.toString();
        secondsLeft --
        if(secondsLeft < 0){
            clearInterval(myinterval)
        }
    },1000)
}




function checkWord(e){
    
    let currentWord = allWords[tries][0];
    
    if(e.value.length >= currentWord.length){
        if(e.value == currentWord){
            wordsTyped++ 
        }
        else{
            misses ++
        }
        e.value = "";
        board.innerHTML = board.innerHTML.replaceWord(allWords[tries].index + spansLength,`<span style='color:#000000;'>` + currentWord + "</span>",currentWord);
        tries ++;
        spansLength += 36; //keep track of the string current length
        board.scrollTop += 5;
        
    }
    if(tries == allWords.length || secondsLeft == 0){
        removeChilds(document.body)
        showResults();
    }
    
   
}


function showResults(){
    removeChilds(document.body)
    let div = document.createElement('div');
    if(secondsLeft > 0){
        wordsTyped = Math.floor((wordsTyped * 60) / (60 - secondsLeft)); 
    }

    div.classList.add("results");
    div.innerHTML = `Words per minute: ${wordsTyped}<br>Misses: ${misses}`; 
    document.body.appendChild(div);   
    
}

function removeChilds(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

String.prototype.replaceWord = function(index, replacement,word) {
    return this.substring(0, index) + replacement + this.substring(index + word.length);
}
