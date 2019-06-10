/* global $ */



let selectedPokemon = 0 // Initialise variable to hold random Pokemon ID

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    
 });




function getRandomPokemon(){
    
        let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 807) + 1).toString()}`; // Generates a random pokemon id from the API
    
        console.log(pokeapiUrl);
    
    
    
    
    
    
    
    
    
};
