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

export async function getStatusFromGameId(id: string, gameStatusList: any) {
    const gameStatus = JSON.parse(gameStatusList)
    console.log(gameStatus)
    if (gameStatus === null) return null;
    const gameStatusListArray = gameStatus.gameStatusList

    for (const listName in gameStatusListArray) {
        const array = gameStatusListArray[listName]
        if (array.includes(id)) {
            return listName
        }
    }
}