import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

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