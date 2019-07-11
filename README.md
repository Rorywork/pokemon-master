# Pokemon Master

Pokemon Master will test your knowledge of the Pokemon in generation 1. You have to work out which Pokemon is is based on a series of clues. Find out here and become a Pokemon Master!

## UX

The goal of Pokemon Master is to provide a fun, entertaining way of testing your knowledge of the differen Pokemon. You are given an image fo the Pokemon from behind and up to three clues to work it out. It is
perfect for procrastinating at work, keeping the kids entertained or providing your daily dose of nostaligia. It is designed for Pokemon fans of all ages. 

#### Player Goals

* Improve the players knowledge of the different types of Pokemon
* Provide an entertaining and visually rich experience
* Fun to play
* Allow the player to compete with friends.

#### Business Goals

* Provide an initial game which can be expanded upon for release to public in future.
* Gain experience using an API, which will be beneficial for future endeavors.

#### Ideal User

* Pokemon fans
* Computer Savvy
* Anyone with a spare few minutes to play

### User Stories
As a user, I want the game to load quickly so I can start playing.  
As a user, I want to play with lots of different Pokemon.  
As a user, I want to see how I am doing in the game and keep track of my score.  
As a user, I want to be challenged so that I improve my knowledge of the Gen 1 Pokemon.
As a user, I want the game to bw fun to play.  
As a user, I would appreciate the game being free to play.  
As a returning player, I would like there to be enough challenge so that there is some replay value within the game.


## Features

Pokemon Master is a single page application with numerous features used to build it.

The background to the page consists of an image which has a darkened overlay which allows the gameboy and credit text to stand out. The image gets darker as you move vertically down the page which is a clever aesthetic feature. 

The page also uses a modal which is accessible by clicking the 'Help' button on the top left corner of the Gameboy, this will bring up an instructions screen which tells the user how to operate the gameboy and how to play the game. 

The primary feature of the page is the gameboy itself, this is built using the Boostrap grid system with columns and rows making up the various elements of the gameboys design. The top row features the 'help' button which activates the modal, as well as an on/off toggler which when switched to the 'on' positon will turn on the screen (effect made using as brighter screen colour to emulate a backlight), and load up the game. The screen itself featutres a darker border as is present on on actual gameboy with a small rectangular screen inside. I have tried to stick to similar dimensions to a real gameboy in order to make the application feel asn authentic as possible.

Below the screen are the arrow keys, again built using the Bootstrap grid, there are nine points with the second, fourth, fifth, sixth and eight point coloured black in order to create the effect of a gamepad. There is a small darker circle within the central point which gives the keys a 3d textured feel. Next to theses keys are the A and B buttons which are used to progress the game. Below these are placeholders for the select and start buttons which are not needed for the game, they are simply a desing feature. 

Finally the gameboy features a curved bottom right edge which reflects the design of the original gameboy. This is done using border-radius. 

#### Features Left To Implement

* Future versions of the game will feature the ability to log your highest scores on a leaderboard to the right of the gameboy.
* Future versions of the game will create a use for the start and select buttons as currently these are just aesthetic features.

## Technologies Used

* HTML
* CSS
* [Bootstrap Grid](https://getbootstrap.com/)
* [Javascript](https://www.javascript.com/)
* [Fontspace](https://www.fontspace.com)



## Deployment

To deploy this page to GitHub Pages from its GitHub repository:

1. Log into GitHub.
2. From the list of repositories on the screen, select `Rorywork/pokemon-master`
3. Go to settings on the right-hand side of the page and click on it.
4. Scroll down to the GitHub Pages section.
5. Under Source click the drop-down menu labeled None and select `Master Branch`
6. On selecting `Master Branch` the page is automatically refreshed, the website is now deployed.
7. Scroll back down to the GitHub Pages section to retrieve the link to the deployed website.
8. [A working link to the website can be found here.](https://rorywork.github.io/pokemon-master/)


#### How to run this project locally
To clone this project from GitHub:

1. Follow this link to the Project GitHub repository.
2. Under the repository name, click "Clone or download".
3. In the Clone with HTTPs section, copy the clone URL for the repository.
4. In your local IDE open Git Bash.
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.
7. ```git clone https://github.com/USERNAME/REPOSITORY```
8. Press Enter. Your local clone will be created.
9. Further reading and troubleshooting on cloning a repository from GitHub here.



https://www.developphp.com/video/JavaScript/Transform-Rotate-Image-Spin-Smooth-Animation-Tutorial