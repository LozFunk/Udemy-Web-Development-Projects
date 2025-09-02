let diceArray = [
    "./images/dice1.png",
    "./images/dice2.png",
    "./images/dice3.png",
    "./images/dice4.png",
    "./images/dice5.png",
    "./images/dice6.png",
]

let randomNumber1 = Math.floor(Math.random()*6)
let randomNumber2 = Math.floor(Math.random()*6)

document.getElementById("dice1").src = diceArray[randomNumber1]
document.getElementById("dice2").src = diceArray[randomNumber2]

if (randomNumber1 > randomNumber2) {
    document.getElementById("output").textContent = "Player 1 wins!!"
} else if (randomNumber1 < randomNumber2) {
    document.getElementById("output").textContent = "Player 2 wins!!"
} else {
    document.getElementById("output").textContent = "It's a draw. No one wins"
}