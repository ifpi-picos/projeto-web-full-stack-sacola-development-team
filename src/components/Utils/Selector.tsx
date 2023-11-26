import * as React from "react";
import {useEffect, useState} from "react";
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {SweetAlerts, SweetAlertsConfirm,} from "@/components/Utils/SweetAlerts";
import {userAddGameStatus} from "@/services/userAddGameStatus";
import {userRemoveGameStatus} from "@/services/userRemoveGameStatus";
import {getGameStatusById} from "@/services/userGetGameStatus";
import {removeFromLocalStorage, removeFromSessionStorage} from "@/components/Utils/utilities";

interface SelectionBoxProps {
    id: string | string[] | undefined;
}


export default function SelectionBox(Props: SelectionBoxProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [gameStatus, setGameStatus] = useState<any>(sessionStorage.getItem(`gameStatus:${Props.id}`));

    useEffect(() => {
        async function fetchData() {
            console.log("gameStatus:", gameStatus)
            if (gameStatus === null) {
                const savedState = sessionStorage.getItem(`gameStatus:${Props.id}`);
                if (savedState === null) {
                    let gameStatusResult = await getGameStatusById(Props.id as string);

                    if (gameStatusResult !== undefined) {
                        sessionStorage.setItem(`gameStatus:${Props.id}`, gameStatusResult);
                    }
                    setGameStatus(gameStatusResult);
                } else {
                    const gameStatusResult = sessionStorage.getItem(`gameStatus:${Props.id}`);
                    setGameStatus(gameStatusResult);
                }
            }
        }

        fetchData();
    }, []);


    const handleJaZerei = () => {
        const res = userAddGameStatus(Props.id, "complete");
        res.then((result) => {
            console.log(result)
            if (result.message === "Status do jogo atualizado com sucesso!") {
                removeFromSessionStorage(Props.id as string, true)
                removeFromLocalStorage(true)
                setGameStatus("complete")
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
                                    removeFromLocalStorage(true)
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
                } else if (result === "Jogo não encontrado!") {
                    SweetAlerts("error", "Jogo não encontrado na sua biblioteca. Por favor Adicione e tente novamente");
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
                removeFromLocalStorage(true)
                setGameStatus("playingLater")
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
                                    removeFromLocalStorage(true)
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
                removeFromLocalStorage(true)
                setGameStatus("playingNow")
                SweetAlerts("success", "Jogo adicionado à sua lista Estou jogando!");
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
                                    removeFromLocalStorage(true)
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
                removeFromLocalStorage(true)
                setGameStatus("abandoned")
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
                                    removeFromSessionStorage(Props.id as string, true)
                                    removeFromLocalStorage(true)
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

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className="relative top-6">
      <span
          className=" bg-azul-infos-50 rounded-full p-2 px-3 text-sm font-semibold bottom-6 text-azul-textos-50 mr-2 relative cursor-pointer"
          onClick={handleClick}
      >
        Status
      </span>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div className="flex flex-col gap-2">
                    <button
                        className={
                            gameStatus === "complete"
                                ? "bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
                                : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                        }
                        onClick={handleJaZerei}
                    >
                        Já zerei
                    </button>


                    <button
                        className={
                            gameStatus === "playingLater"
                                ? "bg-yellow-400 text-white px-4 py-2 rounded-md cursor-pointer"
                                : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                        }
                        onClick={handleQueroZerar}
                    >
                        Quero zerar
                    </button>


                    <button
                        className={
                            gameStatus === "playingNow"
                                ? "bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer"
                                : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                        }
                        onClick={handleEstouJogando}
                    >
                        Estou jogando
                    </button>


                    <button
                        className={
                            gameStatus === "abandoned"
                                ? "bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                                : "bg-azul-infos-500 text-azul-infos-50 px-4 py-2 rounded-md cursor-pointer"
                        }
                        onClick={handleDesisti}
                    >
                        Desisti de zerar/jogar
                    </button>


                </div>
            </Popover>
        </div>
    );
}