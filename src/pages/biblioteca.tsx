import Header from "@/components/Main/Header";
import FooterNavbar from "@/components/Main/FooterNavbar";
import React, {useEffect, useState} from "react";
import {getUserGamesByStatus, userLibraryGames,} from "@/services/userLibraryGames";
import Image from "next/image";
import {useRouter} from "next/router";
import CardModal from "@/components/Utils/CardModal";
import Loading from "@/components/Main/loading";
import Filter from "@/components/Main/Filter";
import {getStatusFromGameId, getUserGamesStatusList,} from "@/services/userGetGameStatus";
import StatusCardName from "@/components/Utils/StatusCardName";
import GameMateLogo from "@/components/Utils/GameMateLogo";
import {getSteamGames} from "@/services/userSteam";
import SteamLogo from "@/components/Utils/SteamLogo";

interface Game {
    id: number;
    cover: {
        image_id?: string; // A imagem pode não estar disponível no serviço próprio
    };
    _id?: string; // Adicionando a propriedade _id para jogos do Steam
    infos?: {
        name: string;
    };
}

interface LibraryProps {
    games: Game[];
}

export default function Biblioteca({games}: LibraryProps) {
    const router = useRouter();

    function pickGameIdAndRedirect(game: Game, location?: string) {
        if (location === "steam") {
            router.push(`/TelaJogoSteam/${game}`);
            return;
        } else if (location === "local") {
            router.push(`/TelaJogo/${game.id}`);
            return;
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    const [userGames, setUserGames] = useState<string[] | null | undefined>(null);
    const [cardsGames, setCardGames] = useState<{ [key: string]: any } | null>(
        null
    );
    const [userSteamGames, setUserSteamGames] = useState<
        string[] | null | undefined
    >(null);
    const [cardsSteamGames, setCardSteamGames] = useState<{
        [key: string]: any;
    } | null>();
    const [totalGames, setTotalGames] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [displayedGames, setDisplayedGames] = useState<number>(10);

    function forceUpdate() {
        setRefresh(!refresh);
    }

    function loadUserGames() {
        try {
            if (localStorage.getItem("userGames")) {
                const userGames = JSON.parse(localStorage.getItem("userGames") || "{}");
                const userSteamGames = JSON.parse(
                    localStorage.getItem("userSteamGames") || "{}"
                );
                setUserSteamGames(userSteamGames);
                setTotalGames(userGames.length + userSteamGames.length);
                setUserGames(userGames);

                if ((userGames && userGames.length === 0 ) && (userSteamGames && userSteamGames.length > 0)) {
                    setTotalGames(userSteamGames.length);
                    setUserGames([]);
                    setIsLoading(false);
                } else if ((userGames && userGames.length > 0 ) && (userSteamGames && userSteamGames.length === 0)) {
                    setTotalGames(userGames.length);
                    setUserSteamGames([]);
                    setIsLoading(false);
                    return;
                } else if ((userGames && userGames.length === 0 ) && (userSteamGames && userSteamGames.length === 0)) {
                    setTotalGames(0);
                    setUserSteamGames([]);
                    setUserGames([]);
                    setIsLoading(false);
                    return;
                } else if (userGames.length === 0) {
                    setUserGames([]);
                    setTotalGames(0);
                    setIsLoading(false);
                    return;
                }

                const steamCards = {[userSteamGames[0]._id]: userSteamGames[0]};
                userSteamGames.forEach((game: any) => {
                    if (game._id === null) return;
                    steamCards[game._id] = {
                        name: game.infos?.name,
                        cover: {
                            image_id: game._id,
                        },
                    };
                });
                setCardSteamGames(steamCards);
                setIsLoading(false);
            } else {
                userLibraryGames()
                    .then((response) => {
                        console.log(response);
                        if (response.games.game_List.length === 0) {
                            setUserGames([]);
                            setTotalGames(0);
                            localStorage.setItem("userGames", JSON.stringify([]));
                            setIsLoading(false);
                            return;
                        }
                        setUserGames(response.games.game_List);
                        setTotalGames(response.games.game_List.length);
                        localStorage.setItem(
                            "userGames",
                            JSON.stringify(response.games.game_List)
                        );
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoading(false);
                    });

                getSteamGames().then((r) => {
                    if (r.games.length === 0) {
                        setUserSteamGames([]);
                        localStorage.setItem("userSteamGames", JSON.stringify([]));
                        return;
                    }
                    localStorage.setItem(
                        "userSteamGames",
                        JSON.stringify(r.games.map((game: any) => game))
                    );
                    let totalGames = JSON.parse(
                        localStorage.getItem("userGames") || "{}"
                    ).length;
                    totalGames += r.games.length;
                    setUserSteamGames(r.games);
                    setTotalGames(totalGames);

                    // Criar cards para os jogos do Steam quando os dados estiverem disponíveis
                    const steamCards = {[r.games[0]._id]: r.games[0]};
                    r.games.forEach((game: any) => {
                        if (game._id === null) return;
                        steamCards[game._id] = {
                            name: game.infos?.name,
                            cover: {
                                image_id: game._id,
                            },
                        };
                    });
                    setCardSteamGames(steamCards);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadUserGames();
    }, [refresh]);

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
                            pickColorForCard(gameId);
                        } else {
                            throw new Error(`Jogo com ID ${gameId} não encontrado.`);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        } else if (userGames && userGames.length === 0) {
            setCardGames(null);
        } else {
            loadUserGames();
        }
        console.log("Entrou no useEffect");
    }, [userGames]);

    async function forceReloadOnGameStatusChange() {
        const updatedUserGames = JSON.parse(
            localStorage.getItem("userGames") || "{}"
        );
        setUserGames(updatedUserGames);
        setTotalGames(updatedUserGames?.length || 0);
        const result = await getUserGamesStatusList();
        localStorage.setItem("gameStatusList", JSON.stringify(result));
        forceUpdate();
    }

    function forceReloadOnGameDelete(gameId: string) {
        console.log("Entrou no forceReloadOnGameDelete", gameId);
        const updatedUserGames = userGames?.filter((id) => id !== gameId);
        setUserGames(updatedUserGames);
        setTotalGames(updatedUserGames?.length || 0);
        localStorage.setItem("userGames", JSON.stringify(updatedUserGames));
        forceUpdate();
    }

    async function forceReloadOnChooseFilter(status: string) {
        if (status === "AllGames") {
            const userGames = JSON.parse(localStorage.getItem("userGames") || "{}");
            const userSteamGames = JSON.parse(
                localStorage.getItem("userSteamGames") || "{}"
            );
            setTotalGames(userGames.length + userSteamGames.length);
            setUserGames(JSON.parse(localStorage.getItem("userGames") || "{}"));
            setUserSteamGames(JSON.parse(localStorage.getItem("userSteamGames") || "{}"));
        } else {
            const updatedUserGames = await getUserGamesByStatus(status);
            const localGames = updatedUserGames.gameStatusList.localGames;
            // Pegar o userSteamGames do localStorage e filtrar os jogos pelos ids que estão em updatedUserGames.gameStatusList.steamGames
            const steamGames = JSON.parse(
                localStorage.getItem("userSteamGames") || "{}"
            ).filter((game: any) => {
                return updatedUserGames.gameStatusList.steamGames.includes(game._id);
            });

            setUserGames(localGames);
            setUserSteamGames(steamGames);
            setTotalGames(localGames.length + steamGames.length);
        }
    }

    function pickColorForCard(gameId: string) {
        const statusList = localStorage.getItem("gameStatusList");
        let status = getStatusFromGameId(gameId, statusList);
        switch (status) {
            case "completeGames":
                return `border-green-700 bg-green-700`;
            case "playingLaterGames":
                return `border-yellow-500 bg-yellow-500`;
            case "playingGames":
                return `border-blue-400 bg-blue-400`;
            case "abandonedGames":
                return `border-red-500 bg-red-500`;
            default:
                return `border-gray-500 bg-gray-500`;
        }
    }


    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <Filter totalGames={totalGames} forceUpdate={forceReloadOnChooseFilter}/>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {isLoading ? (
                    <Loading isLoading={true}/>
                ) : (totalGames === 0) ? (
                    <div className="flex justify-center items-center h-96 ">
                        <h2 className="text-2xl text-white ml-20">
                            Nenhum resultado encontrado.
                        </h2>
                    </div>
                ) : (
                    userGames?.map((gameId) => (
                        <div key={gameId} className="rounded p-2 relative top-2">
                            {cardsGames && cardsGames[gameId] && cardsGames[gameId].cover && (
                                <div className="text-center relative mx-auto">
                                    <div
                                        className={`top-0 left-0 w-fit h-fit ${pickColorForCard(
                                            gameId
                                        )} rounded border-2  border-solid`}
                                    >
                                        {/* Barra superior */}
                                        <div
                                            className={`w-full h-8 sm:h-10 ${pickColorForCard(
                                                gameId
                                            )} flex items-center justify-between rounded-t`}
                                        >
                                            {/* Título de status */}
                                            <div className="text-white text-sm py-1 px-2 rounded-t  ">
                                                <StatusCardName gameId={gameId} refresh={refresh}/>
                                            </div>
                                            {/* CardModal */}
                                            <div
                                                className="right-0 text-white py-1 px-2 rounded cursor-pointer items-center">
                                                <CardModal
                                                    id={gameId}
                                                    location={"local"}
                                                    forceReload={forceReloadOnGameDelete}
                                                    forceReloadOnChange={forceReloadOnGameStatusChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Adicionando imagem do jogo */}
                                        {/* <SteamLogo /> */}
                                        <GameMateLogo/>
                                        <Image
                                            src={`https://images.igdb.com/igdb/image/upload/t_original/${cardsGames[gameId].cover.image_id}.jpg`}
                                            alt={cardsGames[gameId].name}
                                            width={250}
                                            height={250}
                                            onClick={() => pickGameIdAndRedirect(cardsGames[gameId], "local")}
                                            className="rounded cursor-pointer w-[150px] sm:w-[250px] h-[200px] sm:h-[337px]"
                                        />
                                    </div>
                                </div>
                            )}
                            <h2 className="text-lg mt-2 text-center text-white">
                                {cardsGames && cardsGames[gameId] && cardsGames[gameId].name}
                            </h2>
                        </div>
                    ))
                )}
                {/* Cards dos userSteamGames*/}
                {userSteamGames &&
                    userSteamGames.length > 0 &&
                    cardsSteamGames &&
                    userSteamGames.slice(0, displayedGames).map((game: any) => (
                        <div key={game.appid} className="rounded p-2 relative top-2">
                            {cardsSteamGames &&
                                cardsSteamGames[game._id] &&
                                cardsSteamGames[game._id].cover && (
                                    <div className="text-center relative mx-auto">
                                        <div
                                            className={`top-0 left-0 w-fit h-fit ${pickColorForCard(
                                                game._id
                                            )} rounded border-2  border-solid`}
                                        >
                                            {/* Barra superior */}
                                            <div
                                                className={`w-full h-8 sm:h-10 ${pickColorForCard(
                                                    game._id
                                                )} flex items-center justify-between rounded-t`}
                                            >
                                                {/* Título de status */}
                                                <div className="text-white text-sm py-1 px-2 rounded-t  ">
                                                    <StatusCardName gameId={game._id} refresh={refresh}/>
                                                </div>
                                                {/* CardModal */}
                                                <div
                                                    className="right-0 text-white py-1 px-2 rounded cursor-pointer items-center">
                                                    <CardModal
                                                        id={game._id}
                                                        location={"steam"}
                                                        forceReload={forceReloadOnGameDelete}
                                                        forceReloadOnChange={forceReloadOnGameStatusChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Adicionando imagem do jogo */}
                                            <SteamLogo/>
                                            <Image
                                                src={game.cover}
                                                alt={game.infos?.name}
                                                width={225}
                                                height={145} // Altura definida para manter a proporção, pode ser
                                                // ajustada conforme necessário
                                                onClick={() => pickGameIdAndRedirect(game._id, "steam")}
                                                className="rounded cursor-pointer w-[150px] sm:w-[250px] h-[200px] sm:h-[337px]"
                                            />


                                        </div>
                                    </div>
                                )}
                            <h2 className="text-lg mt-2 text-center text-white ">
                                {cardsSteamGames &&
                                    cardsSteamGames[game._id] &&
                                    cardsSteamGames[game._id].name}
                            </h2>
                        </div>
                    ))}
            </div>

            <div className="flex justify-center p-6">
                <button
                    onClick={() => setDisplayedGames(displayedGames + 10)}
                    className="bg-gray-700 hover:bg-gray-900 hover:transition-all  text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Carregar mais
                </button>
            </div>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
