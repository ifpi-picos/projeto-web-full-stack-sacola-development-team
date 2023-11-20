import Player from "@/core/Player";
import {verifyIfTheUserIsLogged} from "@/components/Utils/utilities";

export async function getUserInfo() {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const Token = localStorage.getItem("acessToken");

    try {
        if (!Client_Token) {
            throw new Error("Variáveis de ambiente não configuradas corretamente.");
        }

        const response = await fetch(`${url}/user`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Client_Token: `${Client_Token}`,
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
            },
        });


        const data = await response.json();
        verifyIfTheUserIsLogged(data);
        const userDTO = data.user;
        return Player.fromJSON(userDTO);

    } catch (error) {
        console.error(error);
    }
}