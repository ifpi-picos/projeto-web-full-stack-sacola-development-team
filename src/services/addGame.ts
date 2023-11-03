export async function addGameToUser(id: string) {
  const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
  const url = "http://localhost:5000/api/v1" || process.env.NEXT_PUBLIC_RAILWAY_URL;
  const Token = localStorage.getItem("acessToken");
  const response = await fetch(url + "/user/games", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Client_Token: `${Client_Token}`,
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({ game: id }),
  });
  console.log(id);
  const data = await response.json();
  return data;
}
