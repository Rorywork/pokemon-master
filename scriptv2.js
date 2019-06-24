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
    
    let imageRequired = "front"
    let elem = document.createElement("img");
    document.getElementById("image-placeholder").appendChild(elem);
    
    imageRequired === "front" ? elem.src = 'https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png' : elem.src = 'https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__340.jpg';
}
