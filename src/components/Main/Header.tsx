import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {blue} from '@mui/material/colors';
import SearchModal from './SearchModal';
import useAuth from '@/hooks/useAuth';


interface GameInfo {
    id: number;
    name: string;
    cover: {
      image_id: string;
    };
    developer: string;
  }

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,

    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,

        }),
        marginLeft: 0,

    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;

}

const AppBar = styled(MuiAppBar, {

    shouldForwardProp: (prop) => prop !== 'open',

})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,


    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,

        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

}));

export default function PersistentDrawerLeft() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Backdrop = styled('div')<{ open?: boolean }>(({
                                                            open
                                                        }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(5px)',
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
        zIndex: 1000,
        transition: 'visibility 0.3s ease-in-out',
    }));


    const {logout} = useAuth();

    function handleMenuClick(index: number) {
        switch (index) {
            case 0:
                window.location.href = '/mainPage'
                break;
            case 1:
                window.location.href = '/biblioteca'
                break;
            case 2:
                window.location.href = '/telaPerfil'
                break;
            case 3:
                logout();
                break;

        }
    }


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Backdrop open={open}/>
            <AppBar position="fixed" open={open} sx={{backgroundColor: blue[50]}}>
                <Toolbar className='flex justify-between'>
                    <IconButton

                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>

                    </IconButton>
                    <Image src="/gamemate.png" alt="Logo" width={150} height={150}/>
                    <SearchModal onGameSelect={function (game: GameInfo): void {
                        throw new Error('Function not implemented.');
                    } }/>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}

            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {['Home', 'Biblioteca', 'Perfil', 'Sair'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleMenuClick(index)}>
                                <ListItemIcon>
                                    {index === 0 ? <HomeIcon/> :
                                        index === 1 ? <LibraryBooksIcon/> :
                                            index === 2 ? <PersonIcon/> :
                                                <ExitToAppIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>

            </Main>
        </Box>
    );
}
