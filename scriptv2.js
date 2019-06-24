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
    
    
    
    
}



document.getElementById('button1').addEventListener('click', clicked);




function clicked(){
    
    console.log("Button Click Successful")
    
}
