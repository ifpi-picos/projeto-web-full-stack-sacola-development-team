import React from "react";
import Carousel from "nuka-carousel";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useRouter} from 'next/router';

interface Game {
    id: number,
    cover: {
        image_id: string
    },
}

interface CarrosselProps {
    games: Game[]
}

export default function Carrossel({games}: CarrosselProps) {
    const router = useRouter();

    function pickGameId(game: Game) {

        router.push(`/TelaJogo/${game.id}`);

    }

    const responsiveSlidesToShow = {
        small: 1,
        medium: 3,
        large: 4
    };

    const initialSlideIndex = Math.floor(games.length / 2);

    return (
        <Carousel
            cellAlign="center"
            cellSpacing={20}
            autoplay={true}
            wrapAround={true}
            renderBottomCenterControls={null}
            slidesToShow={responsiveSlidesToShow.medium}
            slideIndex={initialSlideIndex}
            renderCenterLeftControls={({previousSlide}) => (
                <button
                    onClick={previousSlide}
                    className="hidden sm:block"
                >
                    <ArrowBackIosIcon className='text-white' sx={{fontSize: 35}}/>
                </button>
            )}
            renderCenterRightControls={({nextSlide}) => (
                <button
                    onClick={nextSlide}
                    className="hidden sm:block"
                >
                    <ArrowForwardIosIcon className="text-white" sx={{fontSize: 35}}/>
                </button>
            )}
        >
            {games.map((game: Game) => (
                <div
                    className={`carousel-card sm:w-full lg:w-72 mx-auto  ${game.id === initialSlideIndex ? 'lg:w-96' : ''}`}
                    key={game.id}
                >
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
                        alt={game.id.toString()}
                        onClick={() => pickGameId(game)}
                        className="cursor-pointer w-full "
                    />
                </div>
            ))}
        </Carousel>
    );
}
