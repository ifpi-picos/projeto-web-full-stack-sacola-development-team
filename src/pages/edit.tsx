import { useState } from 'react';
import ProfileModal from '@/components/Profile/EditProfile';

interface UserData {
  username: string;
  avatarUrl: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialUserData: UserData = {
    username: 'SeuNomeDeUsuario',
    avatarUrl: 'URLDaSuaFotoDePerfil',
  };
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleSaveProfile = (newUserData: UserData) => {
    // Implemente a lógica para salvar os dados do usuário no estado global ou em algum backend aqui.
    console.log('Dados do usuário salvos:', newUserData);
    setUserData(newUserData); // Atualize o estado local se necessário.
    setIsModalOpen(false); // Feche o modal após salvar.
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Editar Perfil
      </button>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
