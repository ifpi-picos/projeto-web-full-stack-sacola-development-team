import Swal from "sweetalert2";

export function removeFromSessionStorage(gameId: string, gameStatus?: boolean, game?: boolean) {
    if (gameStatus && !game) {
        sessionStorage.removeItem(`gameStatus:${gameId}`);
    } else if (gameStatus && game) {
        sessionStorage.setItem(`game_${gameId}`, "false");
        sessionStorage.removeItem(`gameStatus:${gameId}`);
    }
}

export function removeFromLocalStorage(gameStatusList?: boolean, userGames?: boolean) {
    if (gameStatusList && !userGames) {
        localStorage.removeItem("gameStatusList");
    } else if (userGames && gameStatusList) {
        localStorage.removeItem("userGames");
        localStorage.removeItem("userSteamGames");
        localStorage.removeItem("gameStatusList");
    }
}

export function verifyIfTheUserIsLogged(data: any) {
    if (data.message === "Unauthorized") {
        Swal.fire({
            title: "Sessão expirada",
            text: "Sua sessão expirou, faça login novamente.",
            icon: "warning",
            confirmButtonText: "Ok",
        }).then(r => {
            if (r.isConfirmed) {
                removeFromLocalStorage(true, true);
                removeFromSessionStorage('', true, true);
                window.location.href = "/";
            } else {
                removeFromLocalStorage(true, true);
                removeFromSessionStorage('', true, true);
                window.location.href = "/";
            }
        });
    } else {
        return data;
    }
}