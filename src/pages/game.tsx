import {useEffect, useState} from 'react';

const Game = () => {
    const [gameInfo, setGameInfo] = useState<any[]>([]); // Inicializado como um array vazio

    useEffect(() => {
        // Chame a função da API para buscar as informações do jogo aqui
        fetch('/api/game?id=12') // Este caminho corresponde ao arquivo que você criou em "api/game.ts"
            .then((response) => response.json())
            .then((data) => {
                setGameInfo(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {gameInfo.length > 0 ? (
                // Mapeie os jogos e renderize as informações de cada jogo
                <div>
                    {gameInfo.map((game: any) => (
                        <div key={game.id}>
                            <h1>{game.name}</h1>
                            {game.cover && (
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
                                    alt={game.name}
                                />
                            )}
                            <p>Plataformas: {game.platforms.map((platform: any) => platform.name).join(', ')}</p>

                            <p>Sumário: {game.summary}</p>
                            <p>Gêneros: {game.genres.map((genre: any) => genre.name).join(', ')}</p>

                            <p>Classificação: {game.rating.toFixed(0)}</p>
                            <p>Data de Lançamento: {new Date(game.first_release_date * 1000).toLocaleDateString()}</p>

                            {game.videos && game.videos.length > 0 && (
                                <div>
                                    <h2>Trailers:</h2>
                                    {game.videos.map((video: any, index: number) => (
                                        <div key={index}>
                                            <h3>{video.name}</h3>
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={`https://www.youtube.com/embed/${video.video_id}`}
                                                title={video.name}
                                            ></iframe>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {game.screenshots && game.screenshots.length > 0 && (
                                <div>
                                    <h2>Screenshots:</h2>
                                    {game.screenshots.map((screenshot: any, index: number) => (
                                        <img
                                            key={index}
                                            src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshot.image_id}.jpg`}
                                            alt={`Screenshot ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Carregando, aguarde pacientemente</h1>
            )}
        </div>
    );
};

export default Game;
