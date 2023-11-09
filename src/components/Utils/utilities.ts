export function removeFromSessionStorage(gameId: string) {
    sessionStorage.removeItem(`gameStatus:${gameId}`);
}

export function removeFromLocalStorage(gameId: string) {
    localStorage.setItem(`game_${gameId}`, "false");
    localStorage.removeItem("userGames");
    localStorage.removeItem("gameStatusList");
}