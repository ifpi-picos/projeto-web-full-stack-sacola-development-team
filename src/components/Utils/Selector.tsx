import * as React from "react";
import {useEffect, useState} from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {SweetAlerts, SweetAlertsConfirm,} from "@/components/Utils/SweetAlerts";
import {userAddGameStatus} from "@/services/userAddGameStatus";
import {userRemoveGameStatus} from "@/services/userRemoveGameStatus";
import {getStatusFromGameId, getUserGamesStatusList} from "@/services/userGetGameStatus";

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
                localStorage.removeItem("gameStatusList");
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
                                    localStorage.removeItem("gameStatusList");
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
                localStorage.removeItem("gameStatusList");
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
                                    localStorage.removeItem("gameStatusList");
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
                localStorage.removeItem("gameStatusList");
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
                                    localStorage.removeItem("gameStatusList");
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
                localStorage.removeItem("gameStatusList");
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

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
      <span
          className="bg-azul-infos-50 rounded-full px-3 py-2 text-sm font-semibold text-azul-textos-50 mr-2 mb-2 cursor-pointer"
          onClick={handleClick}
      >
        <MoreHorizIcon className="text-lg"/>
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
                    <Button className={
                        gameStatus === "completeGames" ? "bg-green-700 text-white" : "bg-azul-infos-500" +
                            " text-azul-infos-50"
                    } onClick={handleJaZerei}>Já zerei</Button>

                    <Button className={
                        gameStatus === "playingLaterGames" ? "bg-yellow-400 text-white" : "bg-azul-infos-500" +
                            " text-azul-infos-50"
                    } onClick={handleQueroZerar}>Quero zerar</Button>

                    <Button className={
                        gameStatus === "playingGames" ? "bg-blue-400 text-white" : "bg-azul-infos-500" +
                            " text-azul-infos-50"
                    } onClick={handleEstouJogando} color={"warning"}>Estou jogando</Button>

                    <Button className={
                        gameStatus === "abandonedGames" ? "bg-red-500 text-white" : "bg-azul-infos-500" +
                            " text-azul-infos-50"
                    } onClick={handleDesisti}>Desisti de zerar/jogar</Button>

                </div>
            </Popover>
        </div>
    );
}