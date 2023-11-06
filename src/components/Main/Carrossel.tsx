import React from "react";
import Carousel from "nuka-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import Image from "next/image";
interface Game {
  id: number;
  cover: {
    image_id: string;
  };
  name: string;
}

interface CarrosselProps {
  games: Game[];
}

export default function Carrossel({ games }: CarrosselProps) {
  const router = useRouter();

  function pickGameId(game: Game) {
    router.push(`/TelaJogo/${game.id}`);
  }

  const responsiveSlidesToShow = {
    small: 1,
    medium: 3,
    large: 4,
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
      renderCenterLeftControls={({ previousSlide }) => (
        <button onClick={previousSlide} className="hidden sm:block">
          <ArrowBackIosIcon className="text-white" sx={{ fontSize: 35 }} />
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button onClick={nextSlide} className="hidden sm:block">
          <ArrowForwardIosIcon className="text-white" sx={{ fontSize: 35 }} />
        </button>
      )}
    >
      {games.map((game: Game) => (
        <div
          className={`carousel-card w-28 gap-4 lg:w-72 mx-auto  ${
            game.id === initialSlideIndex ? "l" : ""
          }`}
          key={game.id}
        >
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
            width={300}
            height={250}
            alt={game.id.toString()}
            onClick={() => pickGameId(game)}
            className="cursor-pointer "
          />
          <h2 className="text-center text-white mt-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
            {game.name}
          </h2>
        </div>
      ))}
    </Carousel>
  );
}
