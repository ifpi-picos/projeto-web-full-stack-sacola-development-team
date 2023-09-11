// components/SearchModal.tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SearchButton = styled(IconButton)({});

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

export default function SearchModal({ onGameSelect }: SearchModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setSearchQuery(''); // Limpa o campo de pesquisa ao fechar o modal
    };
  
    const [searchQuery, setSearchQuery] = React.useState('');
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
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };
  
    const router = useRouter();
  
    const handleGameSelect = (game: GameInfo) => {
      setSelectedGame(game);
      // Reset o campo de pesquisa
      setSearchResults([]);
      router.push(`/TelaJogo/${game.id}`);
      handleClose();
      
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    }, []);
  
    return (
      <div>
        <SearchButton onClick={handleOpen} aria-label="search">
          <SearchIcon />
        </SearchButton>
  
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="search-modal-title"
          aria-describedby="search-modal-description"
          className="backdrop-filter backdrop-blur-lg"
        >
          <Box sx={style} className="text-black">
            <Typography id="search-modal-title" variant="h6" component="h2" className="flex items-center justify-center">
              Pesquisar:
            </Typography>
            <div>
              <input
                type="text"
                placeholder=""
                className="outline-none border-b-2 border-gray-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    searchGame();
                  }
                }}
              />
              <button onClick={searchGame}>Search</button>
            </div>
            <div className={isMobile ? 'overflow-y-scroll max-h-40' : ''}>
              <ul>
                {searchResults.map((game) => (
                  <li key={game.id} onClick={() => handleGameSelect(game)} className="flex items-center cursor-pointer p-1">
                    {game.cover && (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`}
                        alt={game.name}
                        className="w-8 h-8 mr-2"
                      />
                    )}
                    <span className="ml-2">{game.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  