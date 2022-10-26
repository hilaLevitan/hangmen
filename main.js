"use strict";
import imgList from "./imgList.json" assert { type: "json" };
import wordsList from "./wordList.json" assert { type: "json" };
//let response = await axios.get("https://random-word-api.herokuapp.com/word");
//let word = response.data;
//const image = document.querySelector("img");
//window.onload = () => generateRandomPicture(imgList);
const btnCheck = document.getElementById("btnCheck");
const btnReset = document.getElementById("btnReset");
const container = document.querySelector("#wordContainer");
const darkSquresArr = document.querySelectorAll(".a");
const fireworkContainer = document.querySelector(".pyro");
const letter = document.getElementById("letter");
const body = document.getElementById("body");
let flag, index, wordG;

function generateRandomPicture(array) {
  let randomNum = Math.floor(Math.random() * array.length);
  // image.setAttribute("src", array[randomNum]);
  document.getElementById(
    "tbl"
  ).style.backgroundImage = `url(${array[randomNum]})`; //.setAttribute("backgroundImage", array[randomNum]);
}
function genarateUnderScores(
  word = wordsList[Math.floor(Math.random() * wordsList.length + 1)]
) {
  wordG = word;

  let underScore;
  for (let i = 0; i < word.length; i++) {
    underScore = document.createElement("p");
    underScore.setAttribute("id", word[i]);
    underScore.setAttribute("class", "letterContainer");
    container.append(underScore);
  }
}

function winning() {
  flag = false;
  //copied code 🤐  lines 40-195{
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  body.prepend(canvas);
  // const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  function Firework(x, y, height, yVol, R, G, B) {
    this.x = x;
    this.y = y;
    this.yVol = yVol;
    this.height = height;
    this.R = R;
    this.G = G;
    this.B = B;
    this.radius = 2;
    this.boom = false;
    var boomHeight = Math.floor(Math.random() * 200) + 150;
    this.draw = function () {
      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.beginPath();
      //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
      ctx.fill();
    };
    this.update = function () {
      this.y -= this.yVol;
      if (this.radius < 20) {
        this.radius += 0.35;
      }
      if (this.y < boomHeight) {
        this.boom = true;

        for (var i = 0; i < 120; i++) {
          particleArray.push(
            new Particle(
              this.x,
              this.y,
              // (Math.random() * 2) + 0.5//
              Math.random() * 2 + 1,
              this.R,
              this.G,
              this.B,
              1
            )
          );
        }
      }
      this.draw();
    };
    this.update();
  }

  window.addEventListener("click", (e) => {
    var x = e.clientX;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var height = Math.floor(Math.random() * 20) + 5;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
  });

  function Particle(x, y, radius, R, G, B, A) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
    this.timer = 0;
    this.fade = false;

    // Change random spread
    this.xVol = Math.random() * 10 - 4;
    this.yVol = Math.random() * 10 - 4;

    // console.log(this.xVol, this.yVol);
    this.draw = function () {
      //   ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
      ctx.save();
      ctx.beginPath();
      // ctx.fillStyle = "white"
      ctx.globalCompositeOperation = "screen";
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
      ctx.fill();

      ctx.restore();
    };
    this.update = function () {
      this.x += this.xVol;
      this.y += this.yVol;

      // Comment out to stop gravity.
      if (this.timer < 200) {
        this.yVol += 0.12;
      }
      this.A -= 0.02;
      if (this.A < 0) {
        this.fade = true;
      }
      this.draw();
    };
    this.update();
  }

  var fireworkArray = [];
  var particleArray = [];
  for (var i = 0; i < 6; i++) {
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var height = Math.floor(Math.random() * 20) + 10;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
  }

  function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < fireworkArray.length; i++) {
      fireworkArray[i].update();
    }
    for (var j = 0; j < particleArray.length; j++) {
      particleArray[j].update();
    }
    if (fireworkArray.length < 4) {
      var x = Math.random() * canvas.width;
      var y = canvas.height;
      var height = Math.floor(Math.random() * 20);
      var yVol = 5;
      var R = Math.floor(Math.random() * 255);
      var G = Math.floor(Math.random() * 255);
      var B = Math.floor(Math.random() * 255);
      fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
    }

    fireworkArray = fireworkArray.filter((obj) => !obj.boom);
    particleArray = particleArray.filter((obj) => !obj.fade);
  }
  animate();

  window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  //  }
}

function checkIfUserWon() {
  //checking if there is an empty underscore- NO winning yet
  const arr = document.querySelectorAll(".letterContainer");
  if (Array.from(arr).every((undrscr) => undrscr.textContent !== "")) winning();
}
function lost() {
  //for (let i = 0; i < wordG.length; i++) {
  //fill the underscores with the word
  const arr = document.querySelectorAll(".letterContainer");
  arr.forEach(function (underScore) {
    underScore.textContent = underScore.id;
    underScore.style.color = "red";
  });

  letter.textContent = "";
  //make the word blink
  container.classList.add("lost");
  //}
  flag = false;
  setTimeout(function () {
    container.classList.remove("lost");
  }, 3000);
}

function fail() {
  let lastSqrId = darkSquresArr[darkSquresArr.length - 1].id;
  lastSqrId = +lastSqrId.charAt(lastSqrId.length - 1);
  document.getElementById(`a${index}`).style.backgroundColor = "unset";
  if (index >= lastSqrId) {
    lost();
    return;
  }

  index++;
}
function checkLetter() {
  if (!flag) return;
  console.log(wordG);
  if (letter.value === "") return; //there is no letter
  if (!wordG.includes(`${letter.value}`)) {
    //the word doesn't include the letter
    fail();
    letter.value = "";
    return;
  }
  const arr = document.querySelectorAll(`#${letter.value}`);
  arr.forEach((element) => {
    element.textContent = letter.value;
  });
  letter.value = "";
  checkIfUserWon();
  letter.focus();
}
//check buttons (or the ENTER key)
btnCheck.addEventListener("click", checkLetter);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkLetter();
  }
});
function setGame() {
  const canvas = document.getElementById("canvas");
  if (canvas) canvas.remove();
  flag = true;
  index = 1;
  fireworkContainer.innerHTML = container.innerHTML = letter.value = "";
  darkSquresArr.forEach((el) => (el.style.backgroundColor = "#111")); //dark the image
  genarateUnderScores();
  generateRandomPicture(imgList);
  container.classList.remove("lost");
  alert(
    "Hi, welcome to HANGMAN \n Try to guess the hidden word by typing letters in the underscore in the top left corner. to check if the letter is a right guess press either the check button or Enter\n Good Luck :)"
  );
  letter.focus();
  container.style.color = "white";
}
btnReset.addEventListener("click", setGame);
setGame();
