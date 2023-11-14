import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {useRouter} from "next/router";
import Image from "next/image";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px;
  text-align: center;
  width: 500px;
`;

const SearchButton = styled(IconButton)({
    marginLeft: "auto",
});

interface GameInfo {
    id: number;
    name: string;
    cover: {
        image_id: string;
    };
    developer: string;
}

interface SearchModalProps {
    onGameSelect: (game: GameInfo) => void;
}

// ...

export default function SearchModal({onGameSelect}: SearchModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSearchQuery(""); // Limpa o campo de pesquisa ao fechar o modal
    };

    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<GameInfo[]>([]);
    const [selectedGame, setSelectedGame] = React.useState<GameInfo | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const searchGame = async () => {
        try {
            const response = await fetch(`/api/search?query=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error("Error fetching search results");
            }
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    const router = useRouter();

    const handleGameSelect = (game: GameInfo) => {
        setSelectedGame(game);
        // Reset o campo de pesquisa
        setSearchResults([]);
        router.push(`/TelaJogo/${game.id}`).then(r => {
            window.location.reload();
        });
        handleClose();
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth <= 768);
        }
    }, []);

    return (
        <div>
            <SearchButton onClick={handleOpen} aria-label="search">
                <SearchIcon/>
            </SearchButton>

            <StyledModal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="search-modal-title"
                aria-describedby="search-modal-description"
            >
                <ModalContent>
                    <Typography variant="h6" component="h2" className="text-black">
                        Pesquisar:
                    </Typography>
                    <input
                        type="text"
                        placeholder=""
                        className="outline-none border-b-2 border-gray-500 w-full text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                searchGame();
                            }
                        }}
                    />
                    <button onClick={searchGame}>Search</button>
                    <div className={isMobile ? "overflow-y-scroll max-h-40" : ""}>
                        <ul>
                            {searchResults.map((game) => (
                                <li
                                    key={game.id}
                                    onClick={() => handleGameSelect(game)}
                                    className="flex items-center cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100"
                                >
                                    {game.cover && (
                                        <Image
                                            width={32}
                                            height={32}
                                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`}
                                            alt={game.name}
                                            className="w-8 h-8 mr-2"
                                        />
                                    )}
                                    <span className="ml-2 text-black">{game.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ModalContent>
            </StyledModal>
        </div>
    );
}
