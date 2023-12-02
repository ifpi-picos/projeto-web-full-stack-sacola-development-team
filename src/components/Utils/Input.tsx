import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Swal from 'sweetalert2';
import {addSteamUser, syncSteamGames, removeSteamUser, getSteamUser} from '@/services/userSteam';
import {useEffect} from "react";
import {removeFromLocalStorage} from "@/components/Utils/utilities";

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
                removeFromLocalStorage(true, true);
                Props.refresh();
                refreshPage();
            });
        } catch (error) {
            setData((current) => ({ ...current, status: 'failure' }));
        }
    };

    const handleSyncGames = () => {
        // Replace this with your sync logic
        try {
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
                    removeFromLocalStorage(true, true)
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
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnlinkSteam = () => {
        try {
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
                removeFromLocalStorage(true, true);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card bg-gray-900 p-6 rounded-md shadow-md">
          <form onSubmit={handleLinkSteam} className="mb-4">
            <div className="mb-4">
              <label className="block text-white text-center text-sm font-bold mb-2">
                Vincular com a Steam
              </label>
              <input
                type="text"
                placeholder="Ex: 76581198524378123"
                required
                value={data.steamId}
                onChange={(event) =>
                  setData({
                    ...data,
                    steamId: event.target.value,
                    status: "initial",
                  })
                }
                className={`text-black flex-1 px-3 py-2 border rounded-md ${
                  data.status === "failure" ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-300`}
              />
              <Button
                variant="solid"
                color="primary"
                loading={data.status === "loading"}
                type="submit"
                className="ml-3 bg-azul-primary-50 text-white px-4 py-[0.65rem] rounded-md"
              >
                Vincular
              </Button>
            </div>
          </form>
          <div className="flex justify-between items-center">
            <div>
              <p className='text-white'>Steam ID: {steamId}</p>
            </div>
          </div>
    
          <div className="flex mt-4">
            <button
              
              
              onClick={handleUnlinkSteam}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 text-[15px] hover:bg-red-700"
            >
              Desvincular Steam
            </button>
            <button
              onClick={handleSyncGames}
              className="bg-azul-primary-50 text-white px-4 py-2 rounded-md"
            >
              Sincronizar Jogos da Steam
            </button>
          </div>
        </div>
      );
    }
 