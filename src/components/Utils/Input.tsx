import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Swal from 'sweetalert2';
import {addSteamUser, syncSteamGames, removeSteamUser, getSteamUser} from '@/services/userSteam';
import {useEffect} from "react";

interface SteamCardProps {
    refresh: Function;
}

export default function SteamCard(Props: SteamCardProps) {
    const [data, setData] = React.useState<{
        steamId: string;
        status: 'initial' | 'loading' | 'failure' | 'sent';
    }>({
        steamId: '',
        status: 'initial',
    });

    const [steamId, setSteamId] = React.useState<string>('');
    const [refresh, setRefresh] = React.useState<boolean>(false);

    function refreshPage() {
        setRefresh(!refresh);
    }

    useEffect(() => {
        async function getSteamId() {
            try {
                const response = await getSteamUser();
                // @ts-ignore
                setSteamId(response.steamId);
            } catch (e) {
                console.log(e);
            }
        }

        getSteamId();
    }, [refresh]);

    const handleLinkSteam = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData((current) => ({ ...current, status: 'loading' }));
        try {
            // Replace timeout with real backend operation
            addSteamUser(data.steamId).then(() => {
                setData((current) => ({ ...current, status: 'sent' }));
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Steam vinculada com sucesso!',
                    confirmButtonText: 'Ok',
                    color: 'aliceblue',
                    background: '#545454',
                });
                Props.refresh();
                refreshPage();
            });
        } catch (error) {
            setData((current) => ({ ...current, status: 'failure' }));
        }
    };

    const handleSyncGames = () => {
        // Replace this with your sync logic
        syncSteamGames().then((response) => {
            if (response.message === 'Jogos adicionados com sucesso!') {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Jogos sincronizados com sucesso!',
                    confirmButtonText: 'Ok',
                    color: 'aliceblue',
                    background: '#545454',
                });
                Props.refresh();
                refreshPage();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocorreu um erro ao sincronizar os jogos!',
                    confirmButtonText: 'Ok',
                    color: 'aliceblue',
                    background: '#545454',
                });
            }
        });
    };

    const handleUnlinkSteam = () => {
        removeSteamUser().then(() => {
            setData((current) => ({ ...current, steamId: '', status: 'initial' }));
            Swal.fire({
                icon: 'success',
                title: 'Desvinculado!',
                text: 'Steam desvinculada com sucesso!',
                confirmButtonText: 'Ok',
                color: 'aliceblue',
                background: '#545454',
            });
            Props.refresh();
            setSteamId('')
        });
    };

    return (
        <div className="card">
            <form onSubmit={handleLinkSteam}>
                <FormControl>
                    <FormLabel>Vincular com a Steam</FormLabel>
                    <Input
                        placeholder="Ex: 76581198524378123"
                        required
                        value={data.steamId}
                        onChange={(event) =>
                            setData({
                                ...data,
                                steamId: event.target.value,
                                status: 'initial',
                            })
                        }
                        error={data.status === 'failure'}
                        endDecorator={
                            <Button
                                variant="solid"
                                color="primary"
                                loading={data.status === 'loading'}
                                type="submit"
                                sx={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                                className="bg-azul-primary-50"
                            >
                                Vincular
                            </Button>
                        }
                    />
                </FormControl>
            </form>

            <div className="mt-4">
                <p>Steam ID: {steamId}</p>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={handleUnlinkSteam}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    className="bg-red-500 text-white"
                >
                    Desvincular Steam
                </Button>
            </div>

            <Button
                variant="solid"
                color="primary"
                onClick={handleSyncGames}
                sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
                className="bg-azul-primary-50 mt-4"
            >
                Sincronizar Jogos da Steam
            </Button>
        </div>
    );
}
