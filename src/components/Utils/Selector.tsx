import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem

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
          <Button onClick={handleClose}>Já zerei</Button>
          <Button onClick={handleClose}>Quero zerar</Button>
          <Button onClick={handleClose}>Estou jogando</Button>
          <Button onClick={handleClose}>Desisti de zerar/jogar</Button>
        </div>
      </Popover>
    </div>
  );
}
