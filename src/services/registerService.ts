import Player from "@/core/Player";

const authorizationToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
const url = process.env.NEXT_PUBLIC_VERCEL_URL;

export async function addUserDocument(player: Player) {
    try {
        if (!authorizationToken) {
            throw new Error('Variáveis de ambiente não configuradas corretamente.');
        }

        const response = await fetch(url + '/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                Authorization: `${authorizationToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player.toJSON())
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(await response.json());
            throw new Error('Erro ao buscar informações do usuário.');
        }

    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar informações do usuário.');
    }
}