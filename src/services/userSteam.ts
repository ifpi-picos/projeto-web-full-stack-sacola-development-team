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
    await syncSteamGames();
    return verifyIfTheUserIsLogged(data);
}

export async function getSteamUser() {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");

    const response = await fetch(url + "/user/steam", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
    });
    const data = await response.json();
    return verifyIfTheUserIsLogged(data);
}

export async function removeSteamUser() {
    try {
        const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
        const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
        const Token = localStorage.getItem("acessToken");

        const response = await fetch(url + "/user/steam", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Client_Token: `${Client_Token}`,
                Authorization: `Bearer ${Token}`,
            },
        });

        if (response.status === 204) {
            return true;
        } else {
            const data = await response.json();
            return verifyIfTheUserIsLogged(data);
        }
    }
    catch (error: any) {
        console.log(error);
    }
}

export async function syncSteamGames() {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_RAILWAY_URL;
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

export async function getSteamGames() {
    try {
        const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
        const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
        const Token = localStorage.getItem("acessToken");

        const response = await fetch(url + "/user/steam/games", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Client_Token: `${Client_Token}`,
                Authorization: `Bearer ${Token}`,
            },
        });
        const data = await response.json();
        return verifyIfTheUserIsLogged(data);
    } catch (error: any) {
        console.log(error);
    }
}

export async function getSteamGame(id: string | string[]) {
    try {
        const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
        const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
        const Token = localStorage.getItem("acessToken");

        const response = await fetch(url + "/steam/game/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Client_Token: `${Client_Token}`,
                Authorization: `Bearer ${Token}`,
            },
        });
        const data = await response.json();
        return verifyIfTheUserIsLogged(data);
    } catch (error: any) {
        console.log(error);
    }
}
