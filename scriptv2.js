/* global $ */

// This is the Pokemon object which will be used in the program





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
    getImageUrl() {
        return this.frontImage();
    }
    
    getWeight() {
        return this.weight();
    }
    getAbility() {
        return this.ability();
    }
}

document.getElementById('button1').addEventListener('click', pokemonImage);
document.getElementById('button2').addEventListener('click', clue);
document.getElementById('button3').addEventListener('click', textOnScreen);
document.getElementById('button4').addEventListener('click', getApi);


function getApi(selectApi){
    
    const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
    selectApi === "electrode" ? apiUrl = `${baseUrl}${selectApi}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;
    
    // apiUrl = outcome of that if statement
    
    
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

















function textOnScreen() {
    
    let gameState = "off";
    
    switch (gameState) {
        case "off":
            console.log("Loading Pokemon Master");
            break;
            
        case "loading-screen":
            console.log("These are the instructions for the game");   
            break;
            
        case "instructions-screen":
            console.log("This is a picture of the Pokemon from behind and the first clue");   
            break;
            
        case "first-clue-screen":
            console.log("This is the second clue");   
            break;
            
        case "second-clue-screen":
            console.log("This is the third clue");   
            break;
            
    }

}
    




function pokemonImage(){
    
    let imageRequired = "front"
    let elem = document.createElement("img");
    document.getElementById("image-placeholder").appendChild(elem);
    
    imageRequired === "front" ? elem.src = 'https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png' : elem.src = 'https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__340.jpg';
}


function clue(){
    
    console.log("clicked");
}




