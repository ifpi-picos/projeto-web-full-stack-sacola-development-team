import React from "react";
import Header from '../components/Main/Header';
import FooterNavbar from '../components/Main/FooterNavbar';
import Carrossel from '@/components/Main/Carrossel';
import {getLatestGameInfo} from '@/utils/igdb/Requests';

interface Game {
    id: number,
    cover: {
        image_id: string
    },
}

interface MainPageProps {
    gamesData: Game[],
}

export default function MainPage({gamesData}: MainPageProps) {

    return (
        <div className='    '>
            <Header></Header>
            <div className=''>
                <Carrossel games={gamesData}></Carrossel>
            </div>

            <div
                className='mt-8 sm:mt-16'> {/* Espaçamento para dispositivos móveis e maior espaçamento para telas maiores */}
                <h1 className="text-2xl flex justify-center items-center mb-4">Jogos lançados recentemente</h1>
                <Carrossel games={gamesData}></Carrossel>
            </div>

            <FooterNavbar></FooterNavbar>
        </div>
    )
}

export async function getServerSideProps() {
    const gameInfo = await getLatestGameInfo();

    return {
        props: {
            gamesData: gameInfo,
        }
    }
}
