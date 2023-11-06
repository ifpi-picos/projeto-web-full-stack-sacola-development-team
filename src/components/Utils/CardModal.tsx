import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";


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
    <div className='flex justify-end relative  top-10 sm:right-2'>
      <IconButton onClick={handleClick}>
        <MoreVertIcon className=' text-white' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
            <ListItemIcon>
                
          <Button >
            Editar
            </Button>
            </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
}