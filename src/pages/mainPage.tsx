import React, {useEffect} from "react";
import Header from '../components/Main/Header';
import FooterNavbar from '../components/Main/FooterNavbar';
import Carrossel from '@/components/Main/Carrossel';
import {getLatestGameInfo} from './api/carousel'
import useAuth from "@/hooks/useAuth";


interface Game {
    id: number,
    cover: {
        image_id: string
    },
    name: string
}

interface MainPageProps {
    gamesData: Game[],
}

export async function getServerSideProps() {
    const gameInfo = await getLatestGameInfo();
    return {
        props: {
            gamesData: gameInfo,
        }
    }
}

export default function MainPage({gamesData}: MainPageProps) {
    const {isLogged} = useAuth();

    useEffect(() => {
        async function verifyLogin() {
            const isUserLogged = await isLogged();
            if (!isUserLogged) {
                window.location.href = '/';
            }
        }

        verifyLogin();
    }, []);

    return (
        <div className='bg-blue-jeans-50 min-h-screen   '>
            <Header></Header>

            {/* <div>
                <Carrossel games={gamesData}></Carrossel>
            </div> */}
            <div
                className=''> {/* Espaçamento para dispositivos móveis e maior espaçamento para telas maiores */}
                <h1 className="text-2xl flex justify-center items-center mb-4 text-white">Jogos lançados recentemente</h1>
                <Carrossel games={gamesData}></Carrossel>
            </div>
            
            <FooterNavbar></FooterNavbar>
        </div>
    )
}