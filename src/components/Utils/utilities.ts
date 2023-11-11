export function removeFromSessionStorage(gameId: string) {
    sessionStorage.removeItem(`gameStatus:${gameId}`);
    sessionStorage.setItem(`game_${gameId}`, "false");
}

export function removeFromLocalStorage() {
    localStorage.removeItem("userGames");
    localStorage.removeItem("gameStatusList");
}