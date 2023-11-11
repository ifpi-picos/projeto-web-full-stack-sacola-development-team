import Header from "@/components/Main/Header";
import FooterNavbar from "@/components/Main/FooterNavbar";
import {useEffect, useState} from "react";
import {getUserGamesByStatus, userLibraryGames} from "@/services/userLibraryGames";
import Image from "next/image";
import {useRouter} from "next/router";
import CardModal from "@/components/Utils/CardModal";
import Loading from "@/components/Main/loading";
import Filter from "@/components/Main/Filter";


interface Game {
    id: number;
    cover: {
        image_id: string;
    };
}

interface LibraryProps {
    games: Game[];
}

export default function Biblioteca({games}: LibraryProps) {
    const router = useRouter();

    function pickGameId(game: Game) {
        router.push(`/TelaJogo/${game.id}`);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [userGames, setUserGames] = useState<string[] | null | undefined>(null);
    const [cardsGames, setCardGames] = useState<{ [key: string]: any } | null>(
        null
    );
    const [totalGames, setTotalGames] = useState<number>(0);

    useEffect(() => {
        if (localStorage.getItem("userGames")) {
            const userGames = JSON.parse(localStorage.getItem("userGames") || "{}");
            setTotalGames(userGames.length);
            setUserGames(userGames);
            setIsLoading(false)
        } else {
            userLibraryGames()
                .then((response) => {
                    setUserGames(response.games.game_List);
                    setTotalGames(response.games.game_List.length);
                    localStorage.setItem(
                        "userGames",
                        JSON.stringify(response.games.game_List)
                    );
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        if (userGames) {
            userGames.forEach((gameId: string) => {
                fetch(`/api/game?id=${gameId}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Erro ao buscar informações do jogo com ID ${gameId}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.length > 0) {
                            setCardGames((prevCardGames) => {
                                return {
                                    ...prevCardGames,
                                    [gameId]: data[0],
                                };
                            });
                        } else {
                            throw new Error(`Jogo com ID ${gameId} não encontrado.`);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }
    }, [userGames]);

    function forceReloadOnGameDelete(gameId: string) {
        const updatedUserGames = userGames?.filter(id => id !== gameId);
        setUserGames(updatedUserGames);
        setTotalGames(updatedUserGames?.length || 0)
    }

    async function forceReloadOnChooseFilter(status: string) {
        if (status === 'AllGames') {
            const userGames = JSON.parse(localStorage.getItem("userGames") || "{}");
            setTotalGames(userGames.length);
            setUserGames(JSON.parse(localStorage.getItem("userGames") || "{}"));
        } else {
            const updatedUserGames = await getUserGamesByStatus(status);
            setUserGames(updatedUserGames.gameStatusList);
            setTotalGames(updatedUserGames.gameStatusList.length);
        }
    }

    // @ts-ignore
    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <Filter totalGames={totalGames} forceUpdate={forceReloadOnChooseFilter}/>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">

                {isLoading ? (
                    <Loading isLoading={true}/>
                ) : (
                    userGames &&
                    userGames.map((gameId) => (
                        <div key={gameId} className="rounded p-2">
                            {cardsGames && cardsGames[gameId] && cardsGames[gameId].cover && (
                                <div className="text-center">
                                    <CardModal id={gameId} forceReload={forceReloadOnGameDelete}/>
                                    <Image
                                        src={`https://images.igdb.com/igdb/image/upload/t_original/${cardsGames[gameId].cover.image_id}.jpg`}
                                        alt={cardsGames[gameId].name}
                                        width={250}
                                        height={250}
                                        className="cursor-pointer mx-auto "
                                        onClick={() => pickGameId(cardsGames[gameId])}
                                    />
                                </div>
                            )}
                            <h2 className="text-lg mt-2 text-center text-white">
                                {cardsGames && cardsGames[gameId] && cardsGames[gameId].name}
                            </h2>
                        </div>
                    ))
                )}
            </div>

            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
