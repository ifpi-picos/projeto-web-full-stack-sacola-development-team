export function removeFromSessionStorage(gameId: string, gameStatus?: boolean, game?: boolean) {
    if (gameStatus) {
        sessionStorage.removeItem(`gameStatus:${gameId}`);
    } else if (gameStatus && game) {
        sessionStorage.setItem(`game_${gameId}`, "false");
        sessionStorage.removeItem(`game_${gameId}`);
        sessionStorage.removeItem(`gameStatus:${gameId}`);
    }
}

export function removeFromLocalStorage(gameStatusList?: boolean, userGames?: boolean) {
    if (gameStatusList) {
        localStorage.removeItem("gameStatusList");
    } else if (userGames && gameStatusList) {
        localStorage.removeItem("userGames");
        localStorage.removeItem("gameStatusList");
    }
}