import FooterNavbar from "@/components/Main/FooterNavbar";
import Header from "@/components/Main/Header";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loading from "@/components/Main/loading";
import {addGameToUser} from "@/services/addGame";
import {SweetAlerts, SweetAlertsConfirm,} from "@/components/Utils/SweetAlerts";
import {removeGameUser} from "@/services/removeGame";
import SelectionBox from "@/components/Utils/Selector";
import {userLibraryGames} from "@/services/userLibraryGames";
import {removeFromLocalStorage, removeFromSessionStorage} from "@/components/Utils/utilities";

export default function TelaJogo() {
    const router = useRouter();

    const {id} = router.query;
    const [gameInfo, setGameInfo] = useState<any | null>(null);
    const [isGameInUser, setIsGameInUser] = useState(false);
    const [clicked, setClicked] = useState(false);


    useEffect(() => {
        if (id) {
            // Chame a função da API para buscar as informações do jogo aqui
            fetch(`/api/game?id=${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar informações do jogo.");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.length > 0) {
                        setGameInfo(data[0]);
                    } else {
                        throw new Error("Jogo não encontrado.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        const savedState = sessionStorage.getItem(`game_${id}`);
        if (sessionStorage.getItem(`game_${id}`) === null) {
            const res = userLibraryGames();
            res.then((result) => {
                const game = result.games.game_List.find((game: any) => game === id);
                if (game) {
                    setIsGameInUser(true);
                    setClicked(true);
                    sessionStorage.setItem(`game_${id}`, "true");
                }
            });
        }

        setIsGameInUser(savedState === "true");
        setClicked(savedState === "true");
        console.log(`game_${id}`, savedState);


    }, [id]);

    const handleClick = () => {
        if (isGameInUser) {
            // If the game is in the library, remove it and update localStorage
            SweetAlertsConfirm("warning", "Remover jogo", "Tem certeza que deseja remover este jogo da biblioteca?", "Jogo Removido!", "Jogo removido da sua conta com sucesso!").then((result) => {
                if (result) {
                    removeGameUser(id as string);
                    removeFromSessionStorage(id as string);
                    removeFromLocalStorage();
                } else {
                    setClicked(true);
                }
            });
        } else {
            // If the game is not in the library, add it and update localStorage
            addGameToUser(id as string);
            sessionStorage.setItem(`game_${id}`, "true");
            localStorage.removeItem("userGames");
            localStorage.removeItem("gameStatusList");
            SweetAlerts("success", "Jogo adicionado à biblioteca");
        }
        // Toggle the state of isGameInUser and clicked
        setIsGameInUser(!isGameInUser);
        setClicked(!isGameInUser);
    };

    // @ts-ignore
    return (
        <div className="bg-blue-jeans-50">
            <Header/>
            <div className="flex flex-col md:flex-row">
                {gameInfo ? (
                    <div className="w-full md:w-4/12 bg-blue-jeans-50 p-4">
                        {gameInfo && gameInfo.cover && (
                            <div className="flex justify-center">
                                <Image
                                    src={`https://images.igdb.com/igdb/image/upload/t_original/${gameInfo.cover.image_id}.jpg`}
                                    alt={gameInfo.name}
                                    width={300}
                                    height={300}
                                    className="mx-auto"
                                />
                            </div>
                        )}
                        <h2 className="text-center  mt-2 text-white">{gameInfo.name}</h2>
                        <div className="flex justify-center mt-2">
              <span
                  onClick={handleClick}
                  className={`${
                      clicked ? "bg-vermelho-50" : "bg-azul-infos-50"
                  } rounded-full px-3 py-1 text-sm font-semibold ${
                      clicked ? "text-white" : "text-azul-textos-50"
                  } mr-2 mb-2 cursor-pointer`}
              >
                {clicked ? "Remover Jogo" : "Adicionar Jogo"}
              </span>

                            {/* <span
                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
                <FormatListBulletedIcon className="text-lg"/>
              </span> */}
                            <SelectionBox id={id} location={'local'}/>
                        </div>
                        <h3 className="flex justify-center items-center mt-2 text-white">
                            SOBRE
                        </h3>
                        <div className="flex flex-col justify-center md:ml-14 text-white">
                            <h4>
                                Lançamento:{" "}
                                {new Date(
                                    gameInfo.first_release_date * 1000
                                ).toLocaleDateString()}
                            </h4>
                            <h4>
                                Metacritic:{" "}
                                {gameInfo.rating ? gameInfo.rating.toFixed(0) : "N/A"}
                            </h4>
                            {gameInfo &&
                                gameInfo.involved_companies &&
                                gameInfo.involved_companies.length > 0 && (
                                    <>
                                        <h4>
                                            Produtora:{" "}
                                            {gameInfo.involved_companies[0]?.company?.name || "N/A"}
                                        </h4>
                                        <h4>
                                            Publicadora:{" "}
                                            {gameInfo.involved_companies[0]?.company?.name || "N/A"}
                                        </h4>
                                    </>
                                )}
                        </div>

                        {gameInfo && gameInfo.genres && gameInfo.genres.length > 0 && (
                            <div className="mt-5">
                                <h4 className="text-white md:ml-14">Gêneros:</h4>
                                <div className="flex flex-wrap md:mt-2 md:ml-12">
                                    {gameInfo.genres.map((genre: any) => (
                                        <span
                                            key={genre.id}
                                            className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2"
                                        >
                      {genre.name}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {gameInfo &&
                            gameInfo.platforms &&
                            gameInfo.platforms.length > 0 && (
                                <div className="mt-5">
                                    <h4 className="md:ml-14 text-white">Plataformas:</h4>
                                    <div className="flex flex-wrap md:ml-12 md:mt-2">
                                        {gameInfo.platforms.map((platform: any) => (
                                            <span
                                                key={platform.id}
                                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2"
                                            >
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
                    {gameInfo &&
                        gameInfo.screenshots &&
                        gameInfo.screenshots.length > 0 && (
                            <>
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={`https://images.igdb.com/igdb/image/upload/t_original/${gameInfo.screenshots[0]?.image_id}.jpg`}
                                        alt={gameInfo.name}
                                        width={800}
                                        height={450}
                                        className="mx-auto"
                                        quality={100}
                                    />
                                </div>
                                <div className="mt-4 text-justify text-white mx-auto max-w-screen-md">
                                    <h2 className="text-justify">{gameInfo.summary}</h2>
                                </div>
                            </>
                        )}
                </div>
            </div>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}