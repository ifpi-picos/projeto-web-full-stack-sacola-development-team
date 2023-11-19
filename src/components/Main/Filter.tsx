import React, {useState} from "react";

interface FilterProps {
    totalGames: number;
    forceUpdate: Function;
}

export default function Filter(props: FilterProps) {
    const [status, setStatus] = useState<string>('Todos os jogos');
    const [selectedValue, setSelectedValue] = useState('Todos os jogos');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;

        setSelectedValue(selectedOption);
        setStatus(selectedOption);

        // A função de retorno de chamada é executada após o estado ser atualizado
        setStatus((prevStatus) => {
            console.log(prevStatus); // Aqui você obterá o valor atualizado
            props.forceUpdate(prevStatus);
            return prevStatus;
        });
    };

    return (
        <div className="bg-gray-800 ml-3 w-84 h-10 sm:w-2/3 sm:h-12 rounded-xl flex items-center justify-between py-2 px-4 shadow-md">
            <div className="flex items-center">
                <h2 className="text-white text-lg font-semibold mr-4">
                    Todos os jogos (
                    <span className="text-gray-300">{props.totalGames}</span>)
                </h2>
                <select
                    className="text-white bg-gray-700 border border-gray-500 rounded py-1 px-2 focus:outline-none"
                    value={selectedValue}
                    onChange={handleSelectChange}
                >
                    <option className="text-white" value="AllGames">
                        Todos os jogos
                    </option>
                    <option className="text-white" value="completeGames">
                        Já zerei
                    </option>
                    <option className="text-white" value="playingLaterGames">
                        Quero zerar
                    </option>
                    <option className="text-white" value="playingGames">
                        Estou jogando
                    </option>
                    <option className="text-white" value="abandonedGames">
                        Desisti de zerar
                    </option>
                </select>
            </div>
        </div>
    );
}
