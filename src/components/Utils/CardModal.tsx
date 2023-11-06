import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

export default function CardModal() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div className="flex justify-end relative  top-10 sm:right-2">
      <IconButton onClick={handleClick}>
        <MoreVertIcon className=" text-white" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <div className="flex flex-col gap-2">
              <Button>Já zerei</Button>
              <Button>Quero zerar</Button>
              <Button>Estou jogando</Button>
              <Button>Desisti de zerar/jogar</Button>
              <Button>Remover jogo</Button>
            </div>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
}
