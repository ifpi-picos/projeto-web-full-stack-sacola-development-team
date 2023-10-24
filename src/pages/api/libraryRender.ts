import { userLibraryGames } from "@/services/userLibraryGames";
import { NextApiRequest, NextApiResponse } from "next";

export default async function libraryRender(req: NextApiRequest, res: NextApiResponse) {
    try {
        const clientId = process.env.IGDB_CLIENT_ID || "default_client_id";
        const accessToken = process.env.IGDB_ACCESS_TOKEN || "default_access_token";

        const userGames = userLibraryGames();

        if (!userGames) {
            throw new Error("ID do jogo não especificado.");
        }

        const response = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": clientId,
                Authorization: `Bearer ${accessToken}`,
            },
            body: `fields name,cover.image_id; where id = ${userGames};`,
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(500).json({ error: "Erro ao buscar informações do jogo." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
}
