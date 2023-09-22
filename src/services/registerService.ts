import Player from "@/core/Player";

const authorizationToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
const url = process.env.NEXT_PUBLIC_VERCEL_URL;

export async function addUserDocument(player: Player) {
    console.log(authorizationToken)
    try {
        if (!authorizationToken) {
            throw new Error('Variáveis de ambiente não configuradas corretamente.');
        }
        console.log(JSON.stringify(player.toJSON()));
        console.log(player.name)
        const playerJson = {
            _id: player.id,
            name: player.name,
            username: player.name,
            email: player.email,
            photo: player.photo,
        }
        console.log(JSON.stringify(playerJson));
        const response = await fetch(url + '/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                Authorization: `${authorizationToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerJson)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

    } catch (error: any) {
        if (error.message === 'Usuário já cadastrado!') {
            console.log(error.message);
        } else {
            throw new Error('Erro ao buscar informações do usuário.');
        }
    }
}