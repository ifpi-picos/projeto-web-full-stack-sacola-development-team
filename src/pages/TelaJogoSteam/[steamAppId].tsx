import FooterNavbar from "@/components/Main/FooterNavbar";
import Header from "@/components/Main/Header";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loading from "@/components/Main/loading";
import SelectionBox from "@/components/Utils/Selector";
import {userLibraryGames} from "@/services/userLibraryGames";
import {getSteamGame} from "@/services/userSteam";

export default function TelaJogoSteam() {
    const router = useRouter();

    const {steamAppId} = router.query;
    const [gameInfo, setGameInfo] = useState<any | null>(null);
    const [platforms, setPlatforms] = useState<any | null>(null);


    useEffect(() => {
        try {
            console.log(steamAppId);
            if (steamAppId) {
                console.log(steamAppId)
                getSteamGame(steamAppId).then((result) => {
                    setGameInfo(result.Game);
                    const platforms = []
                    if (result.Game.infos.platforms.windows === true) {
                        platforms.push({name: "Windows", id: 1})
                    }
                    if (result.Game.infos.platforms.mac === true) {
                        platforms.push({name: "Mac", id: 2})
                    }
                    if (result.Game.infos.platforms.linux === true) {
                        platforms.push({name: "Linux", id: 3})
                    }
                    setPlatforms(platforms);
                    console.log(result.Game);
                }).catch((e) => {
                    console.log(e)
                });
            }
        } catch (e) {
            setGameInfo([])
            console.log(e)
        }
    }, [steamAppId]);


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
                                    src={gameInfo?.cover}
                                    alt={gameInfo.infos?.name}
                                    width={300}
                                    height={300}
                                    className="mx-auto"
                                />
                            </div>
                        )}
                        <h2 className="text-center  mt-2 text-white">{gameInfo.infos?.name}</h2>
                        <div className="flex justify-center mt-2">


                            {/* <span
                                className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2">
                <FormatListBulletedIcon className="text-lg"/>
              </span> */}
                            <SelectionBox id={steamAppId}/>
                        </div>
                        <h3 className="flex justify-center items-center mt-2 text-white">
                            SOBRE
                        </h3>
                        <div className="flex flex-col justify-center md:ml-14 text-white">
                            <h4>
                                Lançamento:{" "}
                                {new Date(
                                    gameInfo.infos.release_date?.date
                                ).toLocaleDateString()}
                            </h4>
                            <h4>
                                Metacritic:{" "}
                                {gameInfo.infos.metacritic?.score ? gameInfo.infos.metacritic.score.toFixed(0) : "N/A"}
                            </h4>
                            {gameInfo &&
                                gameInfo.infos.developers &&
                                gameInfo.infos.developers.length > 0 && (
                                    <>
                                        <h4>
                                            Produtora:{" "}
                                            {gameInfo.infos?.developers[0] || "N/A"}
                                        </h4>
                                        <h4>
                                            Publicadora:{" "}
                                            {gameInfo.infos?.publishers[0] || "N/A"}
                                        </h4>
                                    </>
                                )}
                        </div>

                        {gameInfo && gameInfo.infos.genres && gameInfo.infos.genres.length > 0 && (
                            <div className="mt-5">
                                <h4 className="text-white md:ml-14">Gêneros:</h4>
                                <div className="flex flex-wrap md:mt-2 md:ml-12">
                                    {gameInfo.infos.genres.map((genre: any) => (
                                        <span
                                            key={genre?.id}
                                            className="bg-azul-infos-50 rounded-full px-3 py-1 text-sm font-semibold text-azul-textos-50 mr-2 mb-2"
                                        >
                      {genre?.description}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {gameInfo &&
                            platforms &&
                            platforms.length > 0 && (
                                <div className="mt-5">
                                    <h4 className="md:ml-14 text-white">Plataformas:</h4>
                                    <div className="flex flex-wrap md:ml-12 md:mt-2">
                                        {platforms.map((platform: any) => (
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
                        gameInfo.infos.screenshots &&
                        gameInfo.infos.screenshots.length > 0 && (
                            <>
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={gameInfo.infos.screenshots[0].path_thumbnail}
                                        alt={gameInfo.name}
                                        width={800}
                                        height={450}
                                        className="mx-auto"
                                        quality={100}
                                    />
                                </div>
                                <div className="mt-4 text-justify text-white mx-auto max-w-screen-md">
                                    <h2 className="text-justify">{gameInfo.infos?.about_the_game}</h2>
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