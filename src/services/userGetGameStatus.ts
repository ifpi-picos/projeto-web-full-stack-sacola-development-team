export async function getUserGamesStatusList() {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_RAILWAY_URL;
    const Token = localStorage.getItem("acessToken");
    const response = await fetch(url + "/user/games/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
    });
    const data = await response.json();
    return data;
}

export function getStatusFromGameId(id: string, gameStatusList: any) {
    const gameStatus = JSON.parse(gameStatusList)
    if (gameStatus === null) return null;
    const gameStatusListArray = gameStatus.gameStatusList

    for (const listName in gameStatusListArray) {
        const array = gameStatusListArray[listName]
        if (array.includes(id)) {
            return listName
        }
    }
}

export async function getGameStatusById(gameId: string) {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");
    const response = await fetch(url + `/user/games/status/game/${gameId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
    });
    const data = await response.json();
    const status = data.gameStatus
    return await status;
}