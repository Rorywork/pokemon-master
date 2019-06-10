/* global $ */


var selectedPokemon = 0

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    

 });


                var count = 0;
                var n = 10; //arbitrary number of images
            
                function onClick() {
            
                    if (count === 0) {
                        
                        $( document ).ready(function() {
                            
                            var welcomeText = $("<p>").html(`Wild POKEMON appeared`);
                            
                            welcomeText.appendTo("#text-screen");
                            
                             });
                        
                        
                        
                        


                    } else if (count === 1) {
                        
                        
                            $( document ).ready(function() {
                            
                            getRandomPokemon()
                            
                             });

                    } else if (count === 2) {

                            $( document ).ready(function() {
                            
                            var welcomeText = $("<p>").html(`Third Click`);
                            
                            welcomeText.appendTo("#text-screen");
                            
                            getPokemonAbilities(selectedPokemon);
                        
                            
                             });
                    } else if(count === 3) {

                            $( document ).ready(function() {
                            
                            var welcomeText = $("<p>").html(`Fourth Click`);
                            
                            welcomeText.appendTo("#text-screen");
                            
                            getPokemonCharacteristics(selectedPokemon);
                            
                             });
                    }

            
                    count += 1;
            
                    //reset count when image limit is reached
                    if (count === n)
                        count = 0;
                }    
    




function getRandomPokemon(){


    var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`;
    
    console.log(pokeapiUrl);
    
    $.getJSON(pokeapiUrl).done(function(data){
        console.log(data);

        selectedPokemon = data.id;
        console.log (selectedPokemon);

          var name = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
          console.log(name);
          
        var image = data.sprites.front_shiny;
          
          var screen_image = $("<div>").html("<img src=" + image + "></img>");
          screen_image.appendTo("#image-div");
          
          var character = $("<p>").html(`Pokemon species is ${name}`)
          character.appendTo("#text-screen");
          
          
    }).fail(function(){
        
        console.log("Request to Pokeapi failed.")
        
    }).always(function(){
        console.log("Pokemon is awesome my friend.");
    });
    
    return

}


function getPokemonAbilities(pID){


    var pokeapiUrl = `https://pokeapi.co/api/v2/ability/${pID.toString()}`;
    
    console.log(pokeapiUrl);
    
    $.getJSON(pokeapiUrl).done(function(data){
        console.log(data);

          var effect = data.effect_entries[0].effect;
          console.log(effect);
          
          
         var short_effect = data.effect_entries[0].short_effect;
         console.log(short_effect);
          
        // var image = data.sprites.front_shiny;
          
        //   var screen_image = $("<div>").html("<img src=" + image + "></img>");
        //   screen_image.appendTo("#image-div");
          
        //   var character = $("<p>").html(`Pokemon species is ${name}`)
        //   character.appendTo("#text-screen");
          
          
    }).fail(function(){
        
        console.log("Request to Pokeapi failed.")
        
    }).always(function(){
        //console.log("Pokemon is awesome.");
    });
    
    return

}

function getPokemonMoves(pID){


    var pokeapiUrl = `https://pokeapi.co/api/v2/move/${pID.toString()}`;
    
    console.log(pokeapiUrl);
    
    $.getJSON(pokeapiUrl).done(function(data){
        console.log(data);

          var description = data.descriptions[0].description;
          console.log(effect);
          
          
          
    }).fail(function(){
        
        console.log("Request to Pokeapi failed.")
        
    }).always(function(){
        //console.log("Pokemon is awesome.");
    });
    
    return

}







