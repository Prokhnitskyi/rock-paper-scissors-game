function getComputerChoice() {
    const results = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return results.at(randomIndex);
}