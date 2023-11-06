import Player from "@/core/Player";

const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_RAILWAY_URL;

export async function addUserDocument(player: Player, Token: string) {
  try {
    if (!Client_Token) {
      throw new Error("Variáveis de ambiente não configuradas corretamente.");
    }

    const playerJson = {
      _id: player.id,
      name: player.name,
      username: player.name,
      email: player.email,
      photo: player.photo,
    };

    const response = await fetch(url + "/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Client_Token: `${Client_Token}`,
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerJson),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return true;
    } else {
      const errorData = await response.json();
      if (errorData.message === "Usuário já cadastrado!") {
        return true;
      } else {
        throw new Error(errorData.message);
      }
    }
  } catch (error: any) {
    if (error.message === "Conflict") {
        return true;
    } else {
        throw new Error(error.message);
    }
  }
}