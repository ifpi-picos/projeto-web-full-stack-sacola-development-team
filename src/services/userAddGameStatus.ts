import {verifyIfTheUserIsLogged} from "@/components/Utils/utilities";

export async function userAddGameStatus(id: string | string[] | undefined, status: string) {
    try {
        const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
        const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
        const Token = localStorage.getItem("acessToken");
        const response = await fetch(url + "/user/games/status", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Client_Token: `${Client_Token}`,
                Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({ game: id, status: status }),
        });
        const data = await response.json();
        if (data.message === "Jogo não encontrado!") {
            throw new Error(data.message);
        }
        return verifyIfTheUserIsLogged(data);
    } catch (error: any) {
        if (error.message === "Jogo não encontrado!") {
            return error.message;
        }
    }
}