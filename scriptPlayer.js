const canvas = document.getElementById('canvasPlayer');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const ctx = canvas.getContext("2d");

//it will the the dropdown and get the option 
let action = "idle";
const dropdown = document.getElementById("animation-select");
dropdown.addEventListener('change', function (e) {
    action = e.target.value;
})

//create a variable to import the image
const playerImage = new Image();
playerImage.src = './resource/shadow_dog.png'

//image width divided by the colunms, and image height divide by rowns
const spriteWidth = 575;
const spriteHeight = 523;

//control the speed of the image loop
let gameframe = 0;
const staggerFrames = 10;

//this arry will hold each animation location
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bit',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
//this loop will create the location for each action
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameframe / staggerFrames) % spriteAnimations[action].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[action].loc[position].y;
    // ctx.drawImage(playerImage,sx,sy,sw,sh,dx,dy,dw,dh); 
    //"s" are the position of the image, and the "d" are the place to put the image in canvas
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameframe++;
    requestAnimationFrame(animate);
};
animate();