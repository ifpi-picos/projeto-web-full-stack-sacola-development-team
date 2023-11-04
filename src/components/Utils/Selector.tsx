import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {SweetAlerts, SweetAlertsConfirm,} from "@/components/Utils/SweetAlerts";
import {userAddGameStatus} from "@/services/userAddGameStatus";
import {userRemoveGameStatus} from "@/services/userRemoveGameStatus";

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

    const handleJaZerei = () => {
        const res = userAddGameStatus(Props.id, "complete");
        res.then((result) => {
            console.log(result)
            if (result.message === "Status do jogo atualizado com sucesso!") {
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
            if (result.message === "Status do jogo atualizado com sucesso!") {
                SweetAlerts("success", "Jogo adicionado à sua lista de jogos que quer zerar!");
            } else {
                SweetAlerts("error", "Erro ao adicionar jogo à sua lista de jogos que quer zerar.");
            }
        });
        handleClose();
    }

    const handleEstouJogando = () => {
        const res = userAddGameStatus(Props.id, "playingNow");
        res.then((result) => {
            if (result.message === "Status do jogo atualizado com sucesso!") {
                SweetAlerts("success", "Jogo adicionado à sua lista de jogos que está jogando!");
            } else {
                SweetAlerts("error", "Erro ao adicionar jogo à sua lista de jogos que está jogando.");
            }
        });
        handleClose();
    }

    const handleDesisti = () => {
        const res = userAddGameStatus(Props.id, "abandoned");
        res.then((result) => {
            if (result.message === "Status do jogo atualizado com sucesso!") {
                SweetAlerts("success", "Jogo adicionado à sua lista de jogos que desistiu de jogar!");
            } else {
                SweetAlerts("error", "Erro ao adicionar jogo à sua lista de jogos que desistiu de jogar.");
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
                    <Button onClick={handleJaZerei}>Já zerei</Button>
                    <Button onClick={handleQueroZerar}>Quero zerar</Button>
                    <Button onClick={handleEstouJogando}>Estou jogando</Button>
                    <Button onClick={handleDesisti}>Desisti de zerar/jogar</Button>
                </div>
            </Popover>
        </div>
    );
}
