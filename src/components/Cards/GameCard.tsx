import React from 'react';

interface Game {
    id: number;
    title: string;
    company: string;
    imageUrl: string;
}

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({game}) => {
    return (
        <div
            className="relative rounded-lg border border-gray-300 p-2 md:p-4 w-full md:w-48 mx-auto my-2 md:mx-4 md:my-4 md:flex">
            {/* Elemento de fundo com o efeito de blur */}
            <div className="absolute inset-0 filter blur-sm bg-blue-jeans-50"></div>

            {/* Conteúdo do card */}
            <div className="relative md:w-60">
                <img src={game.imageUrl} alt={`${game.title} Cover`}
                     className="w-full h-48 mx-auto mb-2 object-cover rounded"/>
                <h2 className="text-xl font-semibold mb-2 text-white">{game.title}</h2>
                <p className="text-white-600">{game.company}</p>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-gray-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Veja mais
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
