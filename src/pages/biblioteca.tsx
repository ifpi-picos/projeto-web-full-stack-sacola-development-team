import Header from "@/components/Main/Header";

import FooterNavbar from "@/components/Main/FooterNavbar";
import SimpleCard from "@/components/Cards/SimpleCard";
import { useEffect, useState } from "react";
import { userLibraryGames } from "@/services/userLibraryGames";
import Image from "next/image";
import {useRouter} from 'next/router';

interface Game {
    id: number,
    cover: {
        image_id: string
    },
}

interface LibraryProps {
    games: Game[]
}


export default function Biblioteca({ games }: LibraryProps) {
    const router = useRouter();

    function pickGameId(game: Game) {

        router.push(`/TelaJogo/${game.id}`);

    }
        const [userGames, setUserGames] = useState<string[] | null>(null);
        const [cardsGames, setCardGames] = useState<{ [key: string]: any } | null>(null);
    
        useEffect(() => {
            userLibraryGames()
                .then((response) => {
                    
                    setUserGames(response.games.game_List);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []);
    
    
        useEffect(() => {
            // Certifique-se de verificar se userGames não é nulo antes de fazer as solicitações
            if (userGames) {
                userGames.forEach((gameId: string) => {
                    fetch(`/api/game?id=${gameId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Erro ao buscar informações do jogo com ID ${gameId}`);
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
    
    
    

    

        return (
            <div className="bg-blue-jeans-50">
                <Header />
                <div className="grid grid-rows-4 grid-flow-col gap-8">
                    {userGames &&
                        userGames.map((gameId) => (
                            <div key={gameId}>
                                
                                {cardsGames && cardsGames[gameId] && cardsGames[gameId].cover && (
                                    <Image
                                        src={`https://images.igdb.com/igdb/image/upload/t_original/${cardsGames[gameId].cover.image_id}.jpg`}
                                        alt={cardsGames[gameId].name}
                                        width={200}
                                        height={300}
                                        className="max-w-xs cursor-pointer"
                                        onClick={() => pickGameId(cardsGames[gameId])}
                                    />
                                
                                )}
                                <h2 className="">{cardsGames && cardsGames[gameId] && cardsGames[gameId].name}</h2>
                                
                            </div>
                            
                        ))}
                       
                </div>
                <div className="h-16"></div>
                <FooterNavbar />
            </div>
            
        );
        
        
    }