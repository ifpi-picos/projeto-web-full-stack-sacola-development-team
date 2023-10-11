export async function addGameToUser(id: string){
    const Client_Token = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const response = await fetch('', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Client_Token': `${Client_Token}`,
            // Authorization: 
        },
        body: JSON.stringify({game: id})
        
    })
    console.log(id)
    const data = await response.json()
    return data
}