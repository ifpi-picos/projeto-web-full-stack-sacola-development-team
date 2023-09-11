import FooterNavbar from "@/components/Main/FooterNavbar";
import Header from "@/components/Main/Header";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import Loading from "@/components/Main/loading";


export default function TelaJogo() {
    const router = useRouter();
    const {id} = router.query;
    const [gameInfo, setGameInfo] = useState<any | null>(null);

    useEffect(() => {
        if (id) {
            // Chame a função da API para buscar as informações do jogo aqui
            fetch(`/api/game?id=${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar informações do jogo.');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.length > 0) {
                        setGameInfo(data[0]); // Assuming you expect a single game in the response
                    } else {
                        throw new Error('Jogo não encontrado.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    return (
        <div className="bg-blue-jeans-50">
            <Header/>
            <div className="flex flex-col md:flex-row">
                {gameInfo ? (
                    <div className="w-full md:w-4/12 bg-blue-jeans-50 p-4">
                        {/* Render game information here */}
                        {gameInfo && gameInfo.cover && (
                            <img
                                src={`https://images.igdb.com/igdb/image/upload/t_original/${gameInfo.cover.image_id}.jpg`}
                                alt={gameInfo.name}
                                className="w-full md:w-96  mx-auto md:ml-14"
                            />
                        )}
                        <h2 className="text-center mt-2 text-white">{gameInfo.name}</h2>
                        <div className="flex justify-center mt-2">
                            <span
                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">Adicionar Jogo</span>
                            <span
                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
                    <FormatListBulletedIcon className="text-lg"/>
                </span>
                            <span
                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
                    <MoreHorizIcon className="text-lg"/>
                </span>
                        </div>
                        <h3 className="flex justify-center items-center mt-2 text-white">SOBRE</h3>
                        <div className="flex flex-col justify-center md:ml-14 text-white">
                            <h4>Lançamento: {new Date(gameInfo.first_release_date * 1000).toLocaleDateString()}</h4>
                            <h4>Metacritic: {gameInfo.rating ? gameInfo.rating.toFixed(0) : 'N/A'}</h4>
                            {gameInfo && gameInfo.involved_companies && gameInfo.involved_companies.length > 0 && (
                                <>
                                    <h4>Produtora: {gameInfo.involved_companies[0]?.company?.name || 'N/A'}</h4>
                                    <h4>Publicadora: {gameInfo.involved_companies[1]?.company?.name || 'N/A'}</h4>
                                </>
                            )}
                        </div>
                        {/* Render genres and platforms here */}
                        {gameInfo && gameInfo.genres && gameInfo.genres.length > 0 && (
                            <div className="mt-5">
                                <h4 className="text-white md:ml-14">Gêneros:</h4>
                                <div className="flex flex-wrap md:mt-2 md:ml-12">
                                    {gameInfo.genres.map((genre: any) => (
                                        <span key={genre.id}
                                              className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
          {genre.name}
        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {gameInfo && gameInfo.platforms && gameInfo.platforms.length > 0 && (
                            <div className="mt-5">
                                <h4 className="md:ml-14 text-white">Plataformas:</h4>
                                <div className="flex flex-wrap md:ml-12 md:mt-2">
                                    {gameInfo.platforms.map((platform: any) => (
                                        <span key={platform.id}
                                              className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
          {platform.name}
        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                ) : (
                    <Loading isLoading={true}/>
                )}
                <div className="w-full md:w-8/12 bg-blue-jeans-50 p-4">
                    {/* Conditional rendering of the screenshot section */}
                    {gameInfo && gameInfo.screenshots && gameInfo.screenshots.length > 0 && (
                        <>
                            <Image
                                src={`https://images.igdb.com/igdb/image/upload/t_original/${gameInfo.screenshots[0]?.image_id}.jpg`}
                                alt=""
                                width={900}
                                height={500}
                                className="mx-auto md:ml-14"
                            />
                            <h2 className="text-center mt-4 text-white">{gameInfo.summary}</h2>
                        </>
                    )}
                </div>
            </div>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
