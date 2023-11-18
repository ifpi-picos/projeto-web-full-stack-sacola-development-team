import {useEffect, useState} from "react";
import {getStatusFromGameId} from "@/services/userGetGameStatus";

interface StatusCardNameProps {
    gameId: string;
}
export default function StatusCardName(Props: StatusCardNameProps) {
    const [statusName, setStatus] = useState<string>("");

    useEffect(() => {
        const statusList = localStorage.getItem("gameStatusList");
        let status = getStatusFromGameId(Props.gameId, statusList);
        switch (status) {
            case 'completeGames':
                setStatus('Já zerei');
                break;
            case 'playingLaterGames':
                setStatus('Quero jogar');
                break;
            case 'playingGames':
                setStatus('Jogando');
                break;
            case 'abandonedGames':
                setStatus('Desisti de jogar');
                break;
            default:
                setStatus('Não joguei');
                break;
        }
    }, []);

    return (
        <>
            <p className={'font-bold shadow-azul-infos-50'}>{statusName}</p>
        </>
    );
}