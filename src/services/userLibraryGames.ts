export async function userLibraryGames(){
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const url = process.env.NEXT_PUBLIC_RAILWAY_URL;
    const Token = localStorage.getItem('acessToken');
    const response = await fetch( url  + '/user/games', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Client_Token': `${Client_Token}`,
            Authorization:  `Bearer ${Token}`
        },
        
    })
    
    const data = await response.json()
    return data
}