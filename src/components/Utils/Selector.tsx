import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  SweetAlerts,
  SweetAlertsConfirm,
} from "@/components/Utils/SweetAlerts";

export default function SelectionBox() {
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
    SweetAlerts("success", "Jogo adicionado à sua lista de jogos completos!");
    handleClose();
  }

  const handleQueroZerar = () => {
    SweetAlerts("success", "Jogo adicionado a sua lista de jogos para zerar ");
    handleClose();
  }

  const handleEstouJogando = () => {
    SweetAlerts("info", "Você está jogando o jogo atualmente."); 
    handleClose();
  }

  const handleDesisti = () => {
    SweetAlerts("error", "Você desistiu de zerar/jogar o jogo.");
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
        <MoreHorizIcon className="text-lg" />
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
