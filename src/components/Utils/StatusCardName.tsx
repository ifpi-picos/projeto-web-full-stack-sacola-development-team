import {useEffect, useState} from "react";
import {getStatusFromGameId, getUserGamesStatusList} from "@/services/userGetGameStatus";

interface StatusCardNameProps {
    gameId: string;
    refresh: boolean;
}

export default function StatusCardName(Props: StatusCardNameProps) {
    const [statusName, setStatus] = useState<string>("");


    useEffect(() => {

        async function loadStatus() {
            let statusList = localStorage.getItem("gameStatusList");
            if (!statusList) {
                let statusFromDatabase = await getUserGamesStatusList();
                statusList = JSON.stringify(statusFromDatabase);
            }
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
        }

        loadStatus();
    }, [Props.refresh]);

    return (
        <>
            <p className={'font-bold shadow-azul-infos-50'}>{statusName}</p>
        </>
    );
}