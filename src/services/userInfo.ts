import Player from "@/core/Player";

export async function getUserInfo() {
  const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
  const url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || process.env.NEXT_PUBLIC_RAILWAY_URL;
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

    if (response.ok) {
      const data = await response.json();
      const userDTO = data.user;
      return Player.fromJSON(userDTO);
    } else {
      throw new Error("Erro ao buscar informações do usuário.");
    }
  } catch (error) {
    console.error(error);
  }
}
