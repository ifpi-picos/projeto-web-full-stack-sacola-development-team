import React, {useEffect} from "react";
import Header from '../components/Main/Header';
import FooterNavbar from '../components/Main/FooterNavbar';
import Carrossel from '@/components/Main/Carrossel';
import {getLatestGameInfo} from '@/utils/igdb/Requests';
import useAuth from "@/hooks/useAuth";


interface Game {
    id: number,
    cover: {
        image_id: string
    },
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

    async function verifyLogin() {
        const isUserLogged = await isLogged();
        if (!isUserLogged) {
            // window.location.href = '/';
        }
    }


    useEffect(() => {
        verifyLogin();
    }, []);

    return (
        <div className='bg-blue-jeans-50   '>
            <Header></Header>

            <div className=''>
                <Carrossel games={gamesData}></Carrossel>
            </div>
            <div
                className='mt-8 sm:mt-16'> {/* Espaçamento para dispositivos móveis e maior espaçamento para telas maiores */}
                <h1 className="text-2xl flex justify-center items-center mb-4 text-white">Jogos lançados recentemente</h1>
                <Carrossel games={gamesData}></Carrossel>
            </div>
            <div className="h-16"></div>
            <FooterNavbar></FooterNavbar>
        </div>
    )
}