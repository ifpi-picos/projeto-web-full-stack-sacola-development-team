import { useState, ChangeEvent } from 'react';
import MyCloudinaryUploadWidget from "@/components/Utils/CloudinaryUploadWidget";


interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    username: string;
    avatarUrl: string;
  };
  onSave: (userData: { username: string; avatarUrl: string }) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave,
}) => {
  const [username, setUsername] = useState(userData.username);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);
  const [imageUrl, setImageUrl] = useState('');


  const onURLChange = (url: string) => {
    setImageUrl(url);
    setAvatarUrl(url);
  }

  const handleSave = () => {
    onSave({ username, avatarUrl });
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Editar Perfil</h2>
        <div className="mb-4">
          <label htmlFor="avatar" className="block font-medium text-black">
            Foto de Perfil
          </label>
          <div className="flex items-center  gap-20">
            <MyCloudinaryUploadWidget onURLChange={onURLChange}/>
            <label
              htmlFor="avatar"
              className="cursor-pointer   w-24 h-24 md:w-20 md:h-20 flex items-center justify-center"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="flex mb-5"
                />
                
              ) : (
               <span></span>
              )}
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-black">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            className="w-full border rounded-md px-3 py-2 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfileModal;
