var pokemonToGuess;
var gameStatus;

document.getElementById('newFetch').addEventListener('click', doFetch);
document.getElementById('viewResults').addEventListener('click', viewResults);
document.getElementById('viewAPI').addEventListener('click', function(){
    api("electrodex");
}, false);
    



function api(pokeSelection) {
    let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    pokeSelection === "electrode" ? apiUrl = `${baseUrl}${pokeSelection}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;
    console.log(apiUrl);
}




















function doFetch(){
    
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
    
    
    
    const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`; // Generates a random pokemon id from the API
    fetch(pokeapiUrl)
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
    
    
    const electrodeapiUrl = `https://pokeapi.co/api/v2/pokemon/electrode`;
    
    
    fetch(electrodeapiUrl)
    
    
    
    .then(results => { return results.json();
    })
    .then(data => {
        
        console.log(data);

        electrode = new Pokemon(
                                data.id,
                                data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1),
                                data.sprites.front_default,
                                data.sprites.back_default,
                                data.types[0].type.name,
                                data.abilities[0].ability.name,
                                data.weight,
                                data.height)
                                
        gameStatus = "electrodeloaded"                        
        console.log("Fetch successful")
        
        console.log(electrode.name)
        
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
    

}





// function api(pokeSelection) {
    
// console.log('111')

// let baseUrl = "https://pokeapi.co/api/v2/pokemon/";


// // // electrodeApi = `${baseUrl}${"electrode"}`
// // // allPokemonApi = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`


// // if (pokeSelection === "electrode"){
    
// //     apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeSelection}`
    
// // } else {
    
// //     apiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`;

// // }


// // condition ? exprIfTrue : exprIfFalse 


// pokeSelection === "electrode" ? apiUrl = `${baseUrl}${pokeSelection}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;


// console.log(apiUrl);

// }














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