import * as React from 'react';
import {useRouter} from 'next/router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function LabelBottomNavigation() {
    const router = useRouter();
    const [value, setValue] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Define o valor inicial com base no pathname atual
        const path = router.pathname;
        switch (path) {
            case 'mainPage':
                setValue('home');
                break;
            case 'biblioteca':
                setValue('biblioteca');
                break;
            case 'telaPerfil':
                setValue('perfil');
                break;
            default:
                setValue(null);
        }
    }, [router.pathname]);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        handleMenuClick(newValue);
    };

    const handleMenuClick = (newValue: string) => {
        switch (newValue) {
            case 'home':
                router.push('mainPage');
                break;
            case 'biblioteca':
                router.push('biblioteca');
                break;
            case 'perfil':
                router.push('telaPerfil');
                break;
        }
    };


    return (
        <BottomNavigation
            sx={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: 500
            }}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction
                label="Biblioteca"
                value="biblioteca"
                icon={<SportsEsportsIcon/>}
            />
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<HomeIcon/>}
            />
            <BottomNavigationAction
                label="Perfil"
                value="perfil"
                icon={<PersonIcon/>}
            />
        </BottomNavigation>
    );
}
