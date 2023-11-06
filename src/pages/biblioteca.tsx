import Header from "@/components/Main/Header";
import FooterNavbar from "@/components/Main/FooterNavbar";
import { useEffect, useState } from "react";
import { userLibraryGames } from "@/services/userLibraryGames";
import Image from "next/image";
import { useRouter } from "next/router";

interface Game {
  id: number;
  cover: {
    image_id: string;
  };
}

interface LibraryProps {
  games: Game[];
}

export default function Biblioteca({ games }: LibraryProps) {
  const router = useRouter();

  function pickGameId(game: Game) {
    router.push(`/TelaJogo/${game.id}`);
  }
  const [userGames, setUserGames] = useState<string[] | null>(null);
  const [cardsGames, setCardGames] = useState<{ [key: string]: any } | null>(
    null
  );

  useEffect(() => {
    if (localStorage.getItem("userGames")) {
      setUserGames(JSON.parse(localStorage.getItem("userGames") || "{}"));
    } else {
      userLibraryGames()
        .then((response) => {
          setUserGames(response.games.game_List);
          localStorage.setItem(
            "userGames",
            JSON.stringify(response.games.game_List)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    // Certifique-se de verificar se userGames não é nulo antes de fazer as solicitações
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

  return (
<div className="bg-blue-jeans-50 min-h-screen">
  <Header />
  <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {userGames &&
      userGames.map((gameId) => (
        <div key={gameId} className="rounded p-4">
          {cardsGames && cardsGames[gameId] && cardsGames[gameId].cover && (
            <div className="text-center">
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
      ))}
  </div>

  
      <div className="h-16"></div>
      <FooterNavbar />
    </div>
  );
}
