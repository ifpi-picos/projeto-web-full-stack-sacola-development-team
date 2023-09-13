import { format, addDays } from 'date-fns';

const endpoint = 'https://api.igdb.com/v4/';

const apiCache = new Map();

export async function getLatestGameInfo() {
    try {
      // Verifica se os dados estão em cache
      if (apiCache.has('latestGames')) {
        return apiCache.get('latestGames');
      }
  
      const today = new Date();
      const nextWeek = addDays(today, 7); // Adiciona 7 dias à data atual
  
      const queryString = `
        fields id, cover.image_id;
        where release_dates.date >= ${Math.floor(today.getTime() / 1000)} &
              release_dates.date <= ${Math.floor(nextWeek.getTime() / 1000)};
        limit 10;
      `;
  
      const response = await fetch(endpoint + 'games', {
        method: 'POST',
        body: queryString,
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          'Authorization': 'Bearer ' + process.env.IGDB_ACCESS_TOKEN,
        },
      } as RequestInit);
  
      if (!response.ok) {
        throw new Error('Erro ao buscar informações dos jogos: ' + response.statusText);
      }
  
      const gameInfo = await response.json();
  
      
      apiCache.set('latestGames', gameInfo);
      setTimeout(() => {
        apiCache.delete('latestGames');
      }, 60 * 60 * 1000); 
  
      return gameInfo;
    } catch (error) {
      console.error('Erro ao buscar informações dos jogos:', error);
      throw error; // Lança o erro para que seja tratado posteriormente
    }
  }

export async function getGameInfo() {
    const gameId = 1942;
    const queryString = `
        fields name, cover.image_id, genres.name, platforms.name, summary, screenshots.image_id, release_dates.human, rating, rating_count, involved_companies.company.name, web;
        where id = ${gameId};
    `;

    const data = await fetch(endpoint + 'games', {
        method: 'POST',
        body: queryString,
        headers: {
            'Client-ID': process.env.IGDB_CLIENT_ID,
            'Authorization': 'Bearer ' + process.env.IGDB_ACCESS_TOKEN,
        }
    } as RequestInit);

    const gameInfo = await data.json();
    return gameInfo;
}