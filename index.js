const buttons = document.querySelectorAll(".action-btn");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");

const playerFighter = document.getElementById("player-choice");
const computerFighter = document.getElementById("computer-choice");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

const emojis = {
  pedra: "👊",
  papel: "🖐️",
  tesoura: "✌️"
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.id;
    const computerSelection = computerPlay();
    
    // Atualizar Emojis na Arena
    playerFighter.textContent = emojis[playerSelection];
    computerFighter.textContent = emojis[computerSelection];

    // Limpar classes de animação/glow
    playerFighter.classList.remove("active");
    computerFighter.classList.remove("active");

    // Determinar resultado e adicionar classe de vencedor na arena
    const result = playRound(playerSelection, computerSelection);
    resultEl.textContent = result;
  });
});

function computerPlay() {
  const choices = ["pedra", "papel", "tesoura"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "EMPATE!";
  } else if (
    (playerSelection === "pedra" && computerSelection === "tesoura") ||
    (playerSelection === "papel" && computerSelection === "pedra") ||
    (playerSelection === "tesoura" && computerSelection === "papel")
  ) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    playerFighter.classList.add("active"); // Acender neon azul
    return "VITÓRIA! " + playerSelection.toUpperCase() + " VENCE " + computerSelection.toUpperCase();
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    computerFighter.classList.add("active"); // Acender neon vermelho
    return "DERROTA! " + computerSelection.toUpperCase() + " VENCE " + playerSelection.toUpperCase();
  }
}

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  playerFighter.textContent = "?";
  computerFighter.textContent = "?";
  playerFighter.classList.remove("active");
  computerFighter.classList.remove("active");
  resultEl.textContent = "ESCOLHA SUA ARMA!";
});