function instantSimulationGameDebugFunction (num) {
    endGame();
    startGame();
    for (let i = 0; i < num; i++) {
        computerSubmit();
    }
    endGame();
}
