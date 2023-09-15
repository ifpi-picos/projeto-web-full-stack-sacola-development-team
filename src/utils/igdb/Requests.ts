import { format, addDays } from 'date-fns';

const endpoint = 'https://api.igdb.com/v4/';

const apiCache = new Map();

export async function getLatestGameInfo(locale = 'en_US') {
  try {
      // Verifica se os dados estão em cache
      if (apiCache.has('latestGames')) {
          return apiCache.get('latestGames');
      }

      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Define o início da semana como o domingo

      const endOfWeek = new Date(today);
      endOfWeek.setHours(23, 59, 59, 999);
      endOfWeek.setDate(startOfWeek.getDate() + 8); // Define o final da semana como o sábado

      const queryString = `
          fields id, cover.image_id, first_release_date, summary;
          where first_release_date >= ${Math.floor(startOfWeek.getTime() / 1000)}
          & first_release_date <= ${Math.floor(endOfWeek.getTime() / 1000)}
          & cover != null 
          & cover.image_id != null;
          sort first_release_date desc;
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
      }, 24 * 60 * 60 * 1000); // 24 horas

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