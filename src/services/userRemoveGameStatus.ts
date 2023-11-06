export async function userRemoveGameStatus(id: string | string[] | undefined, status: string) {
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_RAILWAY_URL;
    const Token = localStorage.getItem("acessToken");
    const response = await fetch(url + "/user/games/status", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Client_Token: `${Client_Token}`,
            Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ game: id, status: status }),
    });
    if (response.status === 204) {
        return "Status do jogo atualizado com sucesso!";
    }
}