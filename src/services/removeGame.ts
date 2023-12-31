import {verifyIfTheUserIsLogged} from "@/components/Utils/utilities";

export async function removeGameUser(id: string) {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");
    const response = await fetch(url + "/user/games", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({game: id}),
    });
    if (!response.ok) {
        const data = await response.json();
        return verifyIfTheUserIsLogged(data)
    }
    return true;
}