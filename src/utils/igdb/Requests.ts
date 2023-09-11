const endpoint = 'https://api.igdb.com/v4/';

// export async function getGames() {
//     const data = await fetch(endpoint + 'search', {
//         method: 'POST',
//         body: 'fields *; search "The Witcher"; limit 10;',
//         headers: {
//             'Client-ID': process.env.IGDB_CLIENT_ID,
//             'Authorization': 'Bearer ' + process.env.IGDB_ACCESS_TOKEN,
//         }
//     } as RequestInit);

//     return data.json();
// }

export async function getLatestGameInfo() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7); // Assuming you want games released in the next week

    const queryString = `
        fields id, cover.image_id;
        where release_dates.date >= ${Math.floor(today.getTime() / 1000)} &
              release_dates.date <= ${Math.floor(nextWeek.getTime() / 1000)};
        limit 10;
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