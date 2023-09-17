import Player from "@/core/Player";

export async function getUserInfo() {
    const clientAcessToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
    const url = process.env.NEXT_PUBLIC_VERCEL_URL;
    let userId = '';
    if (typeof window !== 'undefined') {
        // @ts-ignore
        userId = JSON.parse(localStorage.getItem('user'));
    }

    try {
        if (!clientAcessToken) {
            throw new Error('Variáveis de ambiente não configuradas corretamente.');
        }

        const response = await fetch(url + '/users/UbFuTPc984PBIwQsuDTdX81xR734', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `${clientAcessToken}`,
            }

        });
        if (response.ok) {
            const data = await response.json();
            const userDTO = data.user;
            return Player.fromJSON(userDTO);
        } else {
            throw new Error('Erro ao buscar informações do usuário.');
        }

    } catch (error) {
        console.error(error);
    }
}

