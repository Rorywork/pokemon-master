var pokemonToGuess;
var gameStatus = "startGame";
var loadStatus = "loadGame"

document.getElementById('newFetch').addEventListener('click', function(){
    doFetch("electrod");
}, false);

document.getElementById('viewResults').addEventListener('click', viewResults);


document.getElementById('viewAPI').addEventListener('click', function(){
    api("electrodex");
}, false);
    

document.getElementById('switchButton').addEventListener('click', status);



function status(){
    
    console.log(loadStatus);
    
    if (loadStatus == "loadGame"){
        
    doFetch("electrode");
    
    loadStatus = "gameLoaded"

        
    } else {
        
        doFetch("")
        
        loadStatus ="loadGame"
    }
}




function api(pokeSelection) {
    let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    pokeSelection === "electrode" ? apiUrl = `${baseUrl}${pokeSelection}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;
    console.log(apiUrl);
    return apiUrl 
}



function doFetch(pokeSelection){
    
    
    loadStatus = "firstClue";
    
    
    
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
        
        
    
        
        getClue() {
            
            if (loadStatus == "firstClue"){
                return `The Pokemon has the ability ${this.ability}`
            }
            if (loadStatus == "secondClue"){
                return `The Pokemon weighs ${this.weight} Pokegrams`
            }
            if (loadStatus == "thirdClue"){
                return `The Pokemon weighs ${this.height} Pokegrams`
            }
        }
    
    }

    
    

    const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    pokeSelection === "electrode" ? apiUrl = `${baseUrl}${pokeSelection}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;
    
    
    
    fetch(apiUrl)
    .then(results => { return results.json();
    })
    .then(data => {
        
        console.log(data);

        pokemonToGuess = new Pokemon(
                                data.id,
                                data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1),
                                data.sprites.front_default,
                                data.sprites.back_default,
                                data.types[0].type.name,
                                data.abilities[0].ability.name,
                                data.weight,
                                data.height)
                                
                                
        gameStatus = "firstclueloaded"            
        
        console.log("Fetch successful")
        loadStatus = "secondClue";
        console.log(pokemonToGuess.getClue());
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
    

    

}


function viewResults(){
    
    console.log(pokemonToGuess);    
    const screenOutput = document.getElementById('pokeOutput');
    screenOutput.textContent = `The name of the pokemon is ${pokemonToGuess.name}, the height is ${pokemonToGuess.height} and the game status is ${gameStatus}`;
    
}