/* global $ */


var selectedPokemon  // Initialise variable to hold random Pokemon ID

var  name
            
var frontImage
        
var backImage
        
var typeOfPokemon 
        
var abilityOne
        
var weight



// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    
 });




function firstClue(){
    
        let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`; // Generates a random pokemon id from the API
    
        console.log(pokeapiUrl);
    
         $.getJSON(pokeapiUrl).done(function(data){
            console.log(data);
    
        selectedPokemon = data.id;
            console.log (selectedPokemon);
    
        name = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
            console.log(name);
            
        frontImage = data.sprites.front_default;
        console.log(frontImage)
        
        backImage = data.sprites.back_default;
        
        typeOfPokemon = data.types[0].type.name;
            console.log(typeOfPokemon);
        
        abilityOne = data.abilities[0].ability.name;
            console.log(abilityOne);
        
        weight = data.weight;
            console.log(weight);
            
        backImagePokemon();    
     });

}


function frontImagePokemon(){
    
    let frontSprite = $("<div>").html("<img src=" + frontImage + "></img>");
    frontSprite.appendTo("#front-image-div");
    console.log(frontImage)
    
    
}

function backImagePokemon(){
    
    let backSprite = $("<div>").html("<img src=" + backImage + "></img>");
    
    $("#loading-image").empty();
    
    backSprite.appendTo("#loading-image");
    console.log(backImage)
    
    
}

function secondClue(){
    
    let pokemonType = $("<p>").html(`This is a ${typeOfPokemon} Pokemon`)
        $("#messageCol").empty();
               pokemonType.appendTo("#messageCol");
    
    
}

function thirdClue(){
    
    let pokemonAbility = $("<p>").html(`This Pokemon has the ability ${abilityOne}`)
               pokemonAbility.appendTo("#messageCol");
    
    
}

function fourthClue(){
    
    let pokemonWeight = $("<p>").html(`This Pokemon weighs ${weight} Pokegrams`)
               pokemonWeight.appendTo("#messageCol");
    
}



function getPokedex() {
    
    // get the list of Pokemon
    var pokeapiURL = "https://pokeapi.co/api/v2/generation/1";
    
    $.getJSON(pokeapiURL).done(function(data) {
        console.log(data);
        // if required data element is an array then loop through each of the entries
        
        
        
        $.each(data.pokemon_species, function(index,pokemon) {
            console.log(pokemon.name);
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // String manipulation to Capitalise
            var url = pokemon.url;
            // get the Index of the specific Pokemon via substring on the url loking for pos "s/" and final "/"
            var pIndex = url.substring(
                url.lastIndexOf("s/") + 2, 
                url.lastIndexOf("/")
            );
        var pokedex = $("<p>").html(`Pokemon is ${name}`)
              pokedex.appendTo("#pokedex-div");
        });
    });
}    



function getRandomCandidateAnswers(pID, numAnswers) {
    
    var pokemonAnswerIDs = [];            // Initialise array to generate random pokemon IDs
    
    // Loop numAnswers - 1 times to populate array. (minus 1 to accomodate an element for the correct answer)
    for (i = 0; i < numAnswers - 1; i++) {
        
        var candidateAnswerID = Math.floor(Math.random() * 151) + 1;
        pokemonAnswerIDs.indexOf(candidateAnswerID) === -1 && candidateAnswerID != pID ? pokemonAnswerIDs.push(candidateAnswerID) :  i-- ;
    }
    
    // Finally add the correct Pokemon ID to the array
    pokemonAnswerIDs.push(pID);
    
    console.log(pokemonAnswerIDs);    
    
    // Code to build array of possible answers from the API pokemon names seleced from the random IDs above
    
    var pokeapiURL = "https://pokeapi.co/api/v2/generation/1";      // API call to return full Pokedex
    
    var candidateAnswerPokemonNames = [];       // Initialise array for Pokemon names
    
    // JSON execute to return API data to variable data
    $.getJSON(pokeapiURL).done(function(data) {
        //console.log(data);
       
        // Loop through species element to retrieve Pokemon name and unique url       
        $.each(data.pokemon_species, function(index,pokemon) {
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // String manipulation to Capitalise Pokemon name
            var url = pokemon.url;
            // get the Index of the specific Pokemon via substring on the url looking for pos "s/" and final "/"
            var pIndex = url.substring(
                url.lastIndexOf("s/") + 2, 
                url.lastIndexOf("/")
            );
            
            // If the PokemonAnswerIDs array contains the current pIndex from the API call, then push the name onto the array
            
            pokemonAnswerIDs.indexOf(parseInt(pIndex)) >= 0 ? candidateAnswerPokemonNames.push(name) : console.log() ;
        });
        
    console.log(candidateAnswerPokemonNames);
    
    $.each(candidateAnswerPokemonNames, function(index,pokemonName) {
        let selectPokemon = $("<p>").html(`Select ${pokemonName}`)
               selectPokemon.appendTo("#select-screen");
    });
    

    });
    

}


function getMewTwo(){
    
     let pokeapiUrl = "https://pokeapi.co/api/v2/pokemon/mewtwo"
    
        console.log(pokeapiUrl);
    
         $.getJSON(pokeapiUrl).done(function(data){
            console.log(data);
    
        frontImage = data.sprites.front_default;
        console.log(frontImage)
        
        $("#loading-image").empty();
        
        $('#loading-image').prepend("<img src=" + frontImage + "></img>")
        
      
     });
    
}

function writeText(message){
    
    let screenMessage = $("<p>").html(message)
    
    $("#messageCol").empty();
    
    screenMessage.appendTo("#messageCol")
}

function loadingScreen(){
    
    writeText("Loading");
    getMewTwo();
    
}





    //         var image = data.sprites.front_shiny;
              
    //           var screen_image = $("<div>").html("<img src=" + image + "></img>");
    //           screen_image.appendTo("#image-div");
              
    //           var character = $("<p>").html(`Pokemon species is ${name}`)
    //           character.appendTo("#text-screen");
              
              
    //     }).fail(function(){
            
    //         console.log("Request to Pokeapi failed.")
            
    // }).always(function(){
    //     console.log("Pokemon is awesome my friend.");