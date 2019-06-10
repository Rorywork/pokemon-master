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




function getRandomPokemon(){
    
        let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 807) + 1).toString()}`; // Generates a random pokemon id from the API
    
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
            
     });

}


function frontImagePokemon(){
    
    let frontSprite = $("<div>").html("<img src=" + frontImage + "></img>");
    frontSprite.appendTo("#front-image-div");
    console.log(frontImage)
    
    
}

function backImagePokemon(){
    
    let backSprite = $("<div>").html("<img src=" + backImage + "></img>");
    backSprite.appendTo("#back-image-div");
    console.log(backImage)
    
    
}

function getTypePokemon(){
    
    let pokemonType = $("<p>").html(`Pokemon type is ${typeOfPokemon }`)
               pokemonType.appendTo("#text-screen");
    
    
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