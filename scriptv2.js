/* global $ */

// This is the Pokemon object which will be used in the program

var apiReturn;
var gameState = "off";

class Pokemon {
    constructor(id,name,frontImage, backImage, type, ability, weight, height) {
            this.id = id;
            this.name = name;
            this.frontImage = frontImage;
            this.backImage = backImage;
            this.type = type;
            this.ability = ability;
            this.weight = weight;
            this.height = height;
    }
    getImageFront() {
        return this.frontImage;
    }
    getImageBack() {
        return this.backImage;
    }
    getWeight() {
        return this.weight;
    }
    getAbility() {
        return this.ability;
    }
    getType() {
        return this.type;
    }
}

document.getElementById('A-Button').addEventListener('click', function(){
    console.log(gameState);
    textOnScreen(gameState);
}, false);


document.getElementById('C-Button').addEventListener('click', function(){
    textOnScreen(gameState);
}, false);

// Capturing the keyboard arrow keys 
document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowUp' ) {
    alert('Up arrow')
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowDown' ) {
    alert('Down arrow')
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowLeft' ) {
    alert('Left arrow')
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowRight' ) {
    alert('Right arrow')
  }
});
//-----------------------------------------




document.getElementById('button1').addEventListener('click', pokemonImage);

// document.getElementById('button3').addEventListener('click', textOnScreen("loading-screen"));
document.getElementById('button4').addEventListener('click', getApi);

document.getElementById('button3').addEventListener('click', function(){
    textOnScreen("loading-screen");
}, false);


function getApi(selectApi){
    
    const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
    selectApi === "electrode" ? apiUrl = `${baseUrl}${selectApi}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;
    
    fetch(apiUrl)
    .then(results => { return results.json();
    })
    .then(data => {
        
        console.log(data);

        apiReturn = new Pokemon(
                                data.id,
                                data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1),
                                data.sprites.front_default,
                                data.sprites.back_default,
                                data.types[0].type.name,
                                data.abilities[0].ability.name,
                                data.weight,
                                data.height)
                                
        console.log("Fetch successful")

    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
}


function textOnScreen(gameStatus) {
    
    console.log(`The game state is ${gameStatus}`);
    switch (gameStatus) {
        case "off":
            document.getElementById("text").innerHTML = "Loading Pokemon Master";
            let elem = document.createElement("img");
            document.getElementById("image").appendChild(elem);
                elem.src = apiReturn.getImageFront();
                gameState = "loading-screen";

            break;
            
        case "loading-screen":
                document.getElementById("text").innerHTML = "Here are the instructions on how to play the game. The back of a pokemon will appear on screen, press the B button to get clues about the pokemon, when you are ready to guess press the A button";
                getApi();
                gameState = "instructions-screen";
            break;
            
        case "instructions-screen":
            
            console.log(apiReturn.getImageFront());
            document.querySelector("img").src=apiReturn.getImageBack();
            gameState = "first-clue-screen"
            break;
            
        case "first-clue-screen":
            document.getElementById("text").innerHTML = `The Pokemon has is a ${apiReturn.getType()} Pokemon.`;
            gameState = "second-clue-screen"    
            break;
            
        case "second-clue-screen":
            document.getElementById("text").innerHTML = `The Pokemon has the ability ${apiReturn.getAbility()}`;
            gameState = "third-clue-screen"
            break;
            
        case "third-clue-screen":
            document.getElementById("text").innerHTML = `The Pokemon weighs ${apiReturn.getWeight()} Pokegrams`;
            gameState = "next-screen"
            break;
            
    }
}
    




function pokemonImage(imageRequired, url){
    

    let elem = document.createElement("img");
    document.getElementById("image").appendChild(elem);
    
    imageRequired === "front" ? elem.src = 'https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__340.jpg' : elem.src = 'https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__340.jpg';
}



function createImage(){
    
    let elem = document.createElement("img");
    document.getElementById("image").appendChild(elem);
    
    if(gameState === "off" || gameState === "loading-screen"){
        
        elem.src = apiReturn.getImageFront();
        
    }else{
        
        console.log(apiReturn.getImageFront());
        document.querySelector("img").src=apiReturn.getImageFront();
        // im.src=apiReturn.getImageFront();
        // elem.src = apiReturn.getImageFront();
    }

}







