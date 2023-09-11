import Image from "next/image";
import React from "react"; // Importe o módulo React

interface Game {
    id: number;
    title: string;
    company: string;
    imageUrl: string;
}

interface GameCardProps {
    game: Game;
}

const SimpleCard: React.FC<GameCardProps> = ({game}) => {
    return (
        <div className="flex justify-center md:p-3"> {/* Centralizar os cards */}
            <div className="flex flex-col w-36 md:w-60 md:w-400 md:h-250 m-2 gap-1">
                <Image
                    src={game.imageUrl}
                    alt={`${game.title} Cover`}
                    width={350}
                    height={250}
                    className="md:h-250 mx-auto mb-2 object-fit md:flex-row rounded"
                />
                <h2 className="text-sm font-semibold mt-1 mb-1 text-white text-center"> {/* Adicione espaçamento vertical */}
                    {game.title}
                </h2>
            </div>
        </div>
    );
};

export default SimpleCard;
