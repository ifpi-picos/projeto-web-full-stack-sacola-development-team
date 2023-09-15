

export async function getUserInfo ()  {

    

    try{
        const clientAcessToken = process.env.VERCEL_TOKEN;
        const url = process.env.VERCEL_URL;

        if(!clientAcessToken){
            throw new Error('Variáveis de ambiente não configuradas corretamente.');
        }
        
        const response = await fetch(url + '/users/UbFuTPc984PBIwQsuDTdX81xR734',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            Authorization: `${clientAcessToken}`,
        }
        
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            return data;
        }
        else{
            throw new Error('Erro ao buscar informações do usuário.');
        }
    
    }

    catch(error){
        console.error(error);
        
    }
    
    
   
    
}

