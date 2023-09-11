// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientId = process.env.IGDB_CLIENT_ID;
    const accessToken = process.env.IGDB_ACCESS_TOKEN;

    if (!clientId || !accessToken) {
      throw new Error('Variáveis de ambiente não configuradas corretamente.');
    }

    const query = req.query.query; // Pega o termo de pesquisa da URL
    if (!query) {
      throw new Error('Termo de pesquisa não especificado.');
    }

    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: `search "${query}"; fields id,name,cover.image_id,involved_companies.company.name;`
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      throw new Error('Erro ao buscar informações do jogo.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
