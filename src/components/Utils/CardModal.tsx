import * as React from "react";
import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {SweetAlerts, SweetAlertsConfirm,} from "@/components/Utils/SweetAlerts";
import {userAddGameStatus} from "@/services/userAddGameStatus";
import {userRemoveGameStatus} from "@/services/userRemoveGameStatus";
import {getStatusFromGameId, getUserGamesStatusList} from "@/services/userGetGameStatus";
import Popover from "@mui/material/Popover";
import {removeGameUser} from "@/services/removeGame";
import {removeFromLocalStorage, removeFromSessionStorage} from "@/components/Utils/utilities";

interface CardModalProps{
  id: string | string[] | undefined;
  forceReload: Function;
}

export default function CardModal(Props: CardModalProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
);

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

const [gameStatus, setGameStatus] = useState<any>(null);

useEffect(() => {
    async function fetchData() {
        if (gameStatus === null) {
            const savedState = localStorage.getItem("gameStatusList");
            if (savedState === null) {
                const result = await getUserGamesStatusList();
                localStorage.setItem("gameStatusList", JSON.stringify(result));
                const gameStatusResult = await getStatusFromGameId(Props.id as string, JSON.stringify(result));
                setGameStatus(gameStatusResult);
            } else {
                const gameStatusResult = await getStatusFromGameId(Props.id as string, savedState);
                setGameStatus(gameStatusResult);
            }
        }
    }

    fetchData();
}, []);


const handleJaZerei = () => {
    const res = userAddGameStatus(Props.id, "complete");
    res.then((result) => {
        if (result.message === "Status do jogo atualizado com sucesso!") {
            removeFromSessionStorage(Props.id as string, true);
            setGameStatus("completeGames")
            SweetAlerts("success", "Jogo adicionado à sua lista de jogos completos!");
        } else {
            if (result.message === "Jogo já está na lista!") {
                SweetAlertsConfirm("warning", "Jogo já está na sua lista de jogos completos!", "Deseja remover o" +
                    " jogo da sua lista de jogos completos?", "Removido!", "O jogo foi removido da sua lista de" +
                    " jogos completos!").then((result) => {
                    if (result) {
                        const res = userRemoveGameStatus(Props.id, "complete");
                        res.then((result) => {
                            console.log(result)
                            if (result === "Status do jogo atualizado com sucesso!") {
                                removeFromSessionStorage(Props.id as string, true)
                                setGameStatus(null)
                                SweetAlerts("success", "Jogo removido da sua lista de jogos completos!");
                            } else {
                                SweetAlerts("error", "Erro ao remover jogo da sua lista de jogos completos.");
                            }
                        });
                    } else {
                        console.log("não remover")
                    }
                });
            }
        }
    });
    handleClose();
}

const handleQueroZerar = () => {
    const res = userAddGameStatus(Props.id, "playingLater");
    res.then((result) => {
        console.log(result)
        if (result.message === "Status do jogo atualizado com sucesso!") {
            removeFromSessionStorage(Props.id as string, true)
            setGameStatus("playingLaterGames")
            SweetAlerts("success", "Jogo adicionado à sua lista de jogos Quero zerar!");
        } else {
            if (result.message === "Jogo já está na lista!") {
                SweetAlertsConfirm("warning", "Jogo já está na sua lista de jogos completos!", "Deseja remover o" +
                    " jogo da sua lista de jogos completos?", "Removido!", "O jogo foi removido da sua lista de" +
                    " jogos Quero zerar!").then((result) => {
                    if (result) {
                        const res = userRemoveGameStatus(Props.id, "playingLater");
                        res.then((result) => {
                            console.log(result)
                            if (result === "Status do jogo atualizado com sucesso!") {
                                removeFromSessionStorage(Props.id as string, true)
                                setGameStatus(null)
                                SweetAlerts("success", "Jogo removido da sua lista de jogos Quero zerar!");
                            } else {
                                SweetAlerts("error", "Erro ao remover jogo da sua lista de Quero zerar.");
                            }
                        });
                    } else {
                        console.log("não remover")
                    }
                });
            }
        }
    });
    handleClose();
}

const handleEstouJogando = () => {
    const res = userAddGameStatus(Props.id, "playingNow");
    res.then((result) => {
        console.log(result)
        if (result.message === "Status do jogo atualizado com sucesso!") {
            removeFromSessionStorage(Props.id as string, true)
            setGameStatus("playingGames")
            SweetAlerts("success", "Jogo adicionado à sua lista de jogos Quero zerar!");
        } else {
            if (result.message === "Jogo já está na lista!") {
                SweetAlertsConfirm("warning", "Jogo já está na sua lista de jogos que está jogando!", "Deseja" +
                    " remover o" +
                    " jogo da sua lista de jogos que está jogando?", "Removido!", "O jogo foi removido da sua" +
                    " lista de jogos que está jogando!").then((result) => {
                    if (result) {
                        const res = userRemoveGameStatus(Props.id, "playingNow");
                        res.then((result) => {
                            console.log(result)
                            if (result === "Status do jogo atualizado com sucesso!") {
                                removeFromSessionStorage(Props.id as string, true)
                                setGameStatus(null)
                                SweetAlerts("success", "Jogo removido da sua lista de jogos que está jogando!");
                            } else {
                                SweetAlerts("error", "Erro ao remover jogo da sua lista de que está jogando.");
                            }
                        });
                    } else {
                        console.log("não remover")
                    }
                });
            }
        }
    });
    handleClose();
}

const handleDesisti = () => {
    const res = userAddGameStatus(Props.id, "abandoned");
    res.then((result) => {
        console.log(result)
        if (result.message === "Status do jogo atualizado com sucesso!") {
            removeFromSessionStorage(Props.id as string, true)
            setGameStatus("abandonedGames")
            SweetAlerts("success", "Jogo adicionado à sua lista de jogos que desisti de zerar!");
        } else {
            if (result.message === "Jogo já está na lista!") {
                SweetAlertsConfirm("warning", "Jogo já está na sua lista de jogos que desisti de zerar!", "Deseja" +
                    " remover o" +
                    " jogo da sua lista que desisti de zerar?", "Removido!", "O jogo foi removido da sua lista" +
                    " jogos que desisti de zerar!").then((result) => {
                    if (result) {
                        const res = userRemoveGameStatus(Props.id, "abandoned");
                        res.then((result) => {
                            console.log(result)
                            if (result === "Status do jogo atualizado com sucesso!") {
                                localStorage.removeItem("gameStatusList");
                                setGameStatus(null)
                                SweetAlerts("success", "Jogo removido da sua lista de jogos que desisti de zerar!");
                            } else {
                                SweetAlerts("error", "Erro ao remover jogo da sua lista que desisti de zerar.");
                            }
                        });
                    } else {
                        console.log("não remover")
                    }
                });
            }
        }
    });
    handleClose();
}

const handleRemover = () => {
    handleClose();
    SweetAlertsConfirm("warning", "Remover jogo", "Tem certeza que deseja remover este jogo da biblioteca?", "Jogo Removido!", "Jogo removido da sua conta com sucesso!").then((result) => {
        if (result) {
            removeGameUser(Props.id as string).then(r => console.log(r));
            removeFromSessionStorage(Props.id as string, true, true)
            removeFromLocalStorage(true, true)
            Props.forceReload(Props.id as string)
        } else {
            console.log("não remover")
        }
    });
}

const open = Boolean(anchorEl);
const id = open ? "simple-popover" : undefined;

return (
    <div>
  <span
      className="flex justify-end relative  top-10 sm:right-2 cursor-pointer"
      onClick={handleClick}
  >
    <MoreVertIcon className=" right-0 sm:right-2  "/>
  </span>

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <div className="flex flex-col gap-2">
                <button
                    className={
                        gameStatus === "completeGames"
                            ? "bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
                            : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                    }
                    onClick={handleJaZerei}
                >
                    Já zerei
                </button>


                <button
                    className={
                        gameStatus === "playingLaterGames"
                            ? "bg-yellow-400 text-white px-4 py-2 rounded-md cursor-pointer"
                            : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                    }
                    onClick={handleQueroZerar}
                >
                    Quero zerar
                </button>


                <button
                    className={
                        gameStatus === "playingGames"
                            ? "bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer"
                            : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                    }
                    onClick={handleEstouJogando}
                >
                    Estou jogando
                </button>


                <button
                    className={
                        gameStatus === "abandonedGames"
                            ? "bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                            : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                    }
                    onClick={handleDesisti}
                >
                    Desisti de zerar/jogar
                </button>

                <button
                    className=" text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                    onClick={handleRemover}
                >
                  Remover Jogo
                </button>
                
            </div>
        </Popover>
    </div>
);
}