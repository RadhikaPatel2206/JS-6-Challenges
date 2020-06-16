// Challenge 1: Your age in days
calculateAge = () => {
    const birthYear = prompt("What is your birth year ?");
    if (isNaN(birthYear)) {
        alert("Expected year of your birth (number), instead received some other input!");
    } else {
        const ageInDays = birthYear * 365;
        const result = `
        <h3>Your age in days is ${ageInDays}</h3>
        `;

        document.getElementById("age-output").innerHTML = result;
    }
}

resetAge = () => {
    document.getElementById("age-output").innerHTML = "";
}

// Challenge 2: Random Dog Generator
var dogImage = "";
const dogURL = "https://dog.ceo/api/breeds/image/random";
fetch(dogURL)
.then((response) => {
    return response.json();
})
.then((data) => {
    dogImage = data.message;
})

generateDog = () => {
    const result = document.createElement("img");
    result.classList.add("result-image");
    result.src = dogImage;
    
    document.getElementById("dog-output").appendChild(result);
}

// Challenge 3: Rock Paper Scissor Game
const rpsImageSrc = {
    rock: "https://cliparting.com/wp-content/uploads/2016/10/Rock-clip-art-images-free-clipart.png",
    paper: "http://clipartbarn.com/wp-content/uploads/2017/08/Paper-clip-art-free-clipart-images-3-4.png",
    scissor: "http://clipartbarn.com/wp-content/uploads/2016/10/Scissors-clipart-scissor-image-1-2.png",
}

const scoreOption = {
    rock: {
        rock: [0.5, 0.5, "You tied!", "yellow"],
        paper: [0, 1, "You lost!", "red"],
        scissor: [1, 0, "You won!", "green"],
    },
    paper: {
        rock: [1, 0, "You won!", "green"],
        paper: [0.5, 0.5, "You tied!", "yellow"],
        scissor: [0, 1, "You lost!", "red"],
    },
    scissor: {
        rock: [0, 1, "You lost!", "red"],
        paper: [1, 0, "You won!", "green"],
        scissor: [0.5, 0.5, "You tied!", "yellow"],
    },
}

rpsGame = (yourSelection) => {
    const botSelection = ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)];
    const scoreSelection = scoreOption[yourSelection][botSelection];
    const message = scoreSelection[2];
    const color = scoreSelection[3];
    showResult(yourSelection, botSelection, message, color);
}

showResult = (yourSelection, botSelection, message, color) => {
    const result = `
    <img class="rps-end-image" id="rps-yourSelection" src="${rpsImageSrc[yourSelection]}">
    <div class="rps-result">
        <h3 style="color: ${color};">${message}</h3>
    </div>
    <img class="rps-end-image" id="rps-botSelection" src="${rpsImageSrc[botSelection]}">
    `;

    document.getElementById("rps-output").innerHTML = result;
}

// Challenge 4: Change the color of all buttons
var buttonList = document.getElementsByTagName("button")
var buttonClassList = [];
for (const button of buttonList) {
    buttonClassList.push(button.className);
}

changeButtonColor = (selection) => {
    if (selection == "reset") {
        resetButtons();
    } else if (selection == "red") {
        redButtons();
    } else if (selection == "green") {
        greenButtons();
    } else if (selection == "random") {
        randomButtons();
    }
}

resetButtons = () => {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].classList = buttonClassList[i];
    }
}

redButtons = () => {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].classList = "btn btn-lg btn-danger";
    }
}

greenButtons = () => {
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].classList = "btn btn-lg btn-success";
    }
}

randomButtons = () => {
    const color = ["btn-primary", "btn-secondary", "btn-success", "btn-danger", "btn-warning", "btn-info", "btn-light", "btn-dark"]
    let randomColor = "";
    for (let i = 0; i < buttonList.length; i++) {
        randomColor = color[Math.floor(Math.random() * 9)]
        buttonList[i].classList = `btn btn-lg ${randomColor}`;
    }
}

// Challenge 5: BlacJack game
const cardsData = {
    "A": {
        points: 10,
        imgSrc: "assests/images/A.png",
    },
    "K": {
        points: 10,
        imgSrc: "assests/images/K.png",
    },
    "Q": {
        points: 10,
        imgSrc: "assests/images/Q.png",
    },
    "J": {
        points: 10,
        imgSrc: "assests/images/J.png",
    },
    "10": {
        points: 10,
        imgSrc: "assests/images/10.png",
    },
    "9": {
        points: 9,
        imgSrc: "assests/images/9.png",
    },
    "8": {
        points: 8,
        imgSrc: "assests/images/8.png",
    },
    "7": {
        points: 7,
        imgSrc: "assests/images/7.png",
    },
    "6": {
        points: 6,
        imgSrc: "assests/images/6.png",
    },
    "5": {
        points: 5,
        imgSrc: "assests/images/5.png",
    },
    "4": {
        points: 4,
        imgSrc: "assests/images/4.png",
    },
    "3": {
        points: 3,
        imgSrc: "assests/images/3.png",
    },
    "2": {
        points: 2,
        imgSrc: "assests/images/2.png",
    },
}

const cardOption = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
const playSound = new Audio("assests/sounds/swish.m4a");
const winSound = new Audio("assests/sounds/cash.mp3");
const lostSound = new Audio("assests/sounds/aww.mp3");
var bjGameData = {win: 0, lost: 0, draw: 0, userScore: 0, botScore: 0, gameStand: false, gameOver: false, }

bjHit = () => {
    console.log(bjGameData.gameStand, bjGameData.gameOver);
    if (bjGameData.gameStand == false) {
        let imgSrc = getRandomCard("user");
        displayCard(imgSrc, "user");
    }
}

sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bjStand() {
    console.log(bjGameData.gameStand, bjGameData.gameOver);
    bjGameData.gameStand = true;
    if ((bjGameData.gameStand == true) && (bjGameData.gameOver == false)) {
        while (bjGameData.botScore <= 16) {
            let imgSrc = getRandomCard("bot");
            displayCard(imgSrc, "bot");
            await sleep(1000);
        }
        showWinner();
        updateScoreTable();
    }
    bjGameData.gameOver = true;
    console.log(bjGameData.gameStand, bjGameData.gameOver);
}

bjDeal = () => {
    console.log(bjGameData.gameStand, bjGameData.gameOver);
    if (bjGameData.gameOver == true) {
        resetDisplay();
        bjGameData.userScore = 0;
        bjGameData.botScore = 0;
        bjGameData.gameStand = false;
        bjGameData.gameOver = false;
    }
}

getRandomCard = (player) => {
    let card = cardOption[Math.floor(Math.random() * 13)];
    let cardData = cardsData[card];
    
    if (player == "user") {
        bjGameData.userScore += cardData["points"];
    } else if (player == "bot") {
        bjGameData.botScore += cardData["points"];
    }

    return cardData.imgSrc;
}

displayCard = (imgSrc, player) => {
    let score;
    let img = document.createElement("img");
    img.classList = "bj-card";
    img.src = imgSrc;

    if (player == "user") {
        score = bjGameData.userScore;
    } else if (player == "bot") {
        score = bjGameData.botScore;
    }
    
    if (score <= 21) {
        document.getElementById(`bj-${player}-score`).innerText = score;
    } else {
        document.getElementById(`bj-${player}-score`).innerText = "BUST";
        document.getElementById(`bj-${player}-score`).style.color = "red";
    }

    document.getElementById(`bj-${player}-cards`).append(img);
    playSound.play();
}

showWinner = () => {
    if (bjGameData.userScore > 21) {
        if (bjGameData.botScore <= 21) {
            document.getElementById("bj-message").innerText = "You lost!";
            document.getElementById("bj-message").style.color = "red";
            lostSound.play();
            bjGameData.lost += 1;
        } else {
            document.getElementById("bj-message").innerText = "You tied!";
            document.getElementById("bj-message").style.color = "yellow";
            bjGameData.draw += 1;
        }
    } else {
        if (bjGameData.botScore > 21) {
            document.getElementById("bj-message").innerText = "You won!";
            document.getElementById("bj-message").style.color = "green";
            winSound.play();
            bjGameData.win += 1;
        } else {
            if (bjGameData.userScore > bjGameData.botScore) {
                document.getElementById("bj-message").innerText = "You won!";
                document.getElementById("bj-message").style.color = "green";
                winSound.play();
                bjGameData.win += 1;
            } else if (bjGameData.userScore == bjGameData.botScore) {
                document.getElementById("bj-message").innerText = "You tied!";
                document.getElementById("bj-message").style.color = "yellow";
                bjGameData.draw += 1;
            } else if (bjGameData.userScore < bjGameData.botScore) {
                document.getElementById("bj-message").innerText = "You lost!";
                document.getElementById("bj-message").style.color = "red";
                lostSound.play();
                bjGameData.lost += 1;
            }
        }
    }
}

updateScoreTable = () => {
    document.getElementById("bj-win-count").innerText = bjGameData.win;
    document.getElementById("bj-lost-count").innerText = bjGameData.lost;
    document.getElementById("bj-draw-count").innerText = bjGameData.draw;
}

resetDisplay = () => {
    document.getElementById("bj-message").removeAttribute("style");
    document.getElementById(`bj-user-score`).removeAttribute("style");
    document.getElementById(`bj-bot-score`).removeAttribute("style");

    document.getElementById("bj-message").innerText = "Let's Play";
    document.getElementById(`bj-user-score`).innerText = 0;
    document.getElementById(`bj-bot-score`).innerText = 0;
    document.getElementById(`bj-user-cards`).innerHTML = "";
    document.getElementById(`bj-bot-cards`).innerHTML = "";
}

// Challenge 6: Random User generator (AJAX API)
const userURL = "https://randomuser.me/api/?results=10";
fetch(userURL)
.then((response) => {
    return response.json();
})
.then((data) => {
    let result = "";
    for (let user of data.results) {
        result += `
        <div class="random-user-details">
            <img src="${user.picture.large}">
            <p class="mt-2">${user.name.first} ${user.name.last}</p>
        </div>
        `;
    }

    document.getElementById("random-user-output").innerHTML = result;
})