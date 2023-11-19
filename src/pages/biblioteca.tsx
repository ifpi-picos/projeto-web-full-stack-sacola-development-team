import Header from "@/components/Main/Header";
import FooterNavbar from "@/components/Main/FooterNavbar";
import {ReactNode, useEffect, useState} from "react";
import {getUserGamesByStatus, userLibraryGames} from "@/services/userLibraryGames";
import Image from "next/image";
import {useRouter} from "next/router";
import CardModal from "@/components/Utils/CardModal";
import Loading from "@/components/Main/loading";
import Filter from "@/components/Main/Filter";
import {getGameStatusById, getStatusFromGameId, getUserGamesStatusList} from "@/services/userGetGameStatus";
import StatusCardName from "@/components/Utils/StatusCardName";
import SteamLogo from "@/components/Utils/SteamLogo";
import GameMateLogo from "@/components/Utils/GameMateLogo";


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

    function loadUserGames() {
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
    }

    useEffect(() => {
        loadUserGames();
    }, []);

    useEffect(() => {
        if (userGames && userGames.length > 0) {
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
                            pickColorForCard(gameId)
                        } else {
                            throw new Error(`Jogo com ID ${gameId} não encontrado.`);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        } else if (userGames && userGames.length === 0){
            setCardGames(null);
        } else {
            loadUserGames();
        }
    }, [userGames]);


    async function forceReloadOnGameStatusChange() {
        const updatedUserGames = JSON.parse(localStorage.getItem("userGames") || "{}");
        setUserGames(updatedUserGames);
        setTotalGames(updatedUserGames?.length || 0)
        const result = await getUserGamesStatusList();
        localStorage.setItem("gameStatusList", JSON.stringify(result));
    }

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

    function pickColorForCard(gameId: string) {
        const statusList = localStorage.getItem("gameStatusList");
        let status = getStatusFromGameId(gameId, statusList);
        switch (status) {
            case 'completeGames':
                return `border-green-700 bg-green-700`;
            case 'playingLaterGames':
                return `border-yellow-500 bg-yellow-500`;
            case 'playingGames':
                return `border-blue-400 bg-blue-400`;
            case 'abandonedGames':
                return `border-red-500 bg-red-500`;
            default:
                return `border-gray-500 bg-gray-500`;
        }
    }

    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header />
            <Filter totalGames={totalGames} forceUpdate={forceReloadOnChooseFilter} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {isLoading ? (
                    <Loading isLoading={true} />
                ) : (userGames && userGames.length > 0 ? (
                        userGames.map((gameId) => (
                            <div key={gameId} className="rounded p-2 relative top-2">
                                {cardsGames && cardsGames[gameId] && cardsGames[gameId].cover && (

                                    <div className="text-center relative mx-auto">
                                        <div className={`top-0 left-0 w-fit h-fit ${pickColorForCard(gameId)} rounded border-2  border-solid`}>
                                            {/* Barra superior */}
                                            <div className={`w-full h-8 sm:h-10 ${pickColorForCard(gameId)} flex items-center justify-between rounded-t`}>
                                                {/* Título de status */}
                                                <div className="text-white text-sm py-1 px-2 rounded-t  ">
                                                    <StatusCardName gameId={gameId}/>
                                                </div>
                                                {/* CardModal */}
                                                <div className="right-0 text-white py-1 px-2 rounded cursor-pointer items-center">
                                                    <CardModal id={gameId} forceReload={forceReloadOnGameDelete} forceReloadOnChange={forceReloadOnGameStatusChange}/>
                                                </div>
                                            </div>

                                            {/* Adicionando imagem do jogo */}
                                            {/* <SteamLogo /> */}
                                            <GameMateLogo />
                                            <Image
                                            
                                                src={`https://images.igdb.com/igdb/image/upload/t_original/${cardsGames[gameId].cover.image_id}.jpg`}
                                                alt={cardsGames[gameId].name}
                                                width={250}
                                                height={250}
                                                onClick={() => pickGameId(cardsGames[gameId])}
                                                className="rounded cursor-pointer "
                                            />
                                        </div>
                                    </div>
                                )}
                                <h2 className="text-lg mt-2 text-center text-white">
                                    {cardsGames && cardsGames[gameId] && cardsGames[gameId].name}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-lg font-semibold text-center mt-4">
                            Nenhum jogo encontrado
                        </p>

                    )
                )}
            </div>
            
            <div className="h-16"></div>
            <FooterNavbar />
        </div>
    );
}
