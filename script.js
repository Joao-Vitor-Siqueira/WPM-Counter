const input = document.getElementById("input");
const board = document.getElementById("textContainer");
const timer = document.getElementById("timer");
let wordsTyped = 0;
let misses = 0;

let regExp = /\w+/g;
let allWords = [...board.innerHTML.matchAll(regExp)];
let tries = 0;
let spansLength = 0;




//metaphorpsum.com/paragraphs/<numberOfParagraphs>/<numberOfSentences>

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
    if(tries == allWords.length){
        console.log(`Words typed:${wordsTyped}\nMisses:${misses}`);
    }
    
    console.log(allWords)
}




String.prototype.replaceWord = function(index, replacement,word) {
    return this.substring(0, index) + replacement + this.substring(index + word.length);
}
