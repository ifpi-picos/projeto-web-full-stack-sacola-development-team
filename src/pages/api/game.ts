import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const clientId = process.env.IGDB_CLIENT_ID;
        const accessToken = process.env.IGDB_ACCESS_TOKEN;

        if (!clientId || !accessToken) {
            throw new Error('Variáveis de ambiente não configuradas corretamente.');
        }

        const gameId = req.query.id; // Pega o ID do jogo da URL
        if (!gameId) {
            throw new Error('ID do jogo não especificado.');
        }

        const response = await fetch("https://api.igdb.com/v4/games", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
            },
            body: `fields name,cover.image_id,genres.name,summary,platforms.name,rating,first_release_date,screenshots.image_id,videos.video_id,involved_companies.company.name,involved_companies.publisher; where id = ${gameId};`
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            throw new Error('Erro ao buscar informações do jogo.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erro interno do servidor.'});
    }
}