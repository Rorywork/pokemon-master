/* global $ */



let selectedPokemon = 0 // Initialise variable to hold random Pokemon ID

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    
 });




function getRandomPokemon(){
    
        let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 807) + 1).toString()}`; // Generates a random pokemon id from the API
    
        console.log(pokeapiUrl);
    
         $.getJSON(pokeapiUrl).done(function(data){
            console.log(data);
    
        let selectedPokemon = data.id;
            console.log (selectedPokemon);
    
        let name = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
            console.log(name);
            
        let frontImage = data.sprites.front_default;
        
        let backImage = data.sprites.back_default;
        
        let typeOfPokemon = data.types[0].type.name;
            console.log(typeOfPokemon);
        
        let abilityOne = data.abilities[0].ability.name;
            console.log(abilityOne);
        
        let weight = data.weight;
            console.log(weight);
            
     });


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