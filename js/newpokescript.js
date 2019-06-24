var pokemonToGuess;
var gameStatus = "startGame";
var loadStatus = "loadGame"

document.getElementById('newFetch').addEventListener('click', function(){
    doFetch("electrode");
}, false);

document.getElementById('viewResults').addEventListener('click', viewResults);


document.getElementById('viewAPI').addEventListener('click', function(){
    api("electrodex");
}, false);
    

document.getElementById('switchButton').addEventListener('click', status);



// event handler for buttons for rotation
on.addEventListener('click', () => rotateMe.classList.add('rotate'))
off.addEventListener('click', () => rotateMe.classList.remove('rotate'))


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




function getElectrode() {
    

    let apiUrl = api("electrode")
    
    console.log(apiUrl)
    
    


    
    
    // let pokeapiUrl = "https://pokeapi.co/api/v2/pokemon/electrode"

    // console.log(pokeapiUrl);

    // $.getJSON(pokeapiUrl).done(function(data) {
    //     console.log(data);

    //     frontImage = data.sprites.front_default;
    //     console.log(frontImage)

    //     $("#loading-image").empty();

    //     $('#loading-image').prepend("<img id='img1' src=" + frontImage + "></img>")


    // }).fail(function() {
    //     console.log("Request to Pokeapi failed.")
    // }).always(function() {
    //     console.log("Request to Pokeapi was successful.");
    //     gameStatus = "loadingcompleted"
    // });


    
    
    
    
}








function doFetch(pokeSelection){
    
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
        
    }
    
    
    
    // const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`; // Generates a random pokemon id from the API
    
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





// function getElectrode() {

//     let pokeapiUrl = "https://pokeapi.co/api/v2/pokemon/electrode"

//     console.log(pokeapiUrl);

//     $.getJSON(pokeapiUrl).done(function(data) {
//         console.log(data);

//         frontImage = data.sprites.front_default;
//         console.log(frontImage)

//         $("#loading-image").empty();

//         $('#loading-image').prepend("<img id='img1' src=" + frontImage + "></img>")


//     }).fail(function() {
//         console.log("Request to Pokeapi failed.")
//     }).always(function() {
//         console.log("Request to Pokeapi was successful.");
//         gameStatus = "loadingcompleted"
//     });

// }