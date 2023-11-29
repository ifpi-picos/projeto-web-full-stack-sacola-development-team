import {verifyIfTheUserIsLogged} from "@/components/Utils/utilities";

export async function getUserGamesStatusList() {
    try {
        const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
        const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
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
        return verifyIfTheUserIsLogged(data);
    } catch (error) {
        console.log(error)
    }
}

export function getStatusFromGameId(id: string, gameStatusList: any) {
    try {
        if (gameStatusList === null) return null;
        const parsedGameStatusList = JSON.parse(gameStatusList);
        const localGameStatusList = parsedGameStatusList.gameStatusList.localGames;
        const steamGameStatusList = parsedGameStatusList.gameStatusList.steamGames;


        for (const listName in steamGameStatusList) {
            const array = steamGameStatusList[listName];
            if (array.includes(id)) {
                return listName;
            }
        }

        for (const listName in localGameStatusList) {
            const array = localGameStatusList[listName];
            if (array.includes(id)) {
                return listName;
            }
        }

        return null;
    } catch (error) {
        console.log(error);
        return null; // Return null in case of any error
    }
}


export async function getGameStatusById(gameId: string) {
    try {
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
        return verifyIfTheUserIsLogged(data);
    } catch (error) {
        console.log(error)
    }
}