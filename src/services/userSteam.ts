import {verifyIfTheUserIsLogged} from "@/components/Utils/utilities";

export async function addSteamUser(steamId: string) {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");

    const response = await fetch(url + "/user/steam", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({steamId: steamId}),
    });
    const data = await response.json();
    return verifyIfTheUserIsLogged(data);
}

export async function syncSteamGames() {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");

    const response = await fetch(url + "/user/steam/games", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
    });
    const data = await response.json();
    return verifyIfTheUserIsLogged(data);
}