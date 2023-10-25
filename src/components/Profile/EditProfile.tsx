import { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");

  const onURLChange = (url: string) => {
    setImageUrl(url);
    setAvatarUrl(url);
  };

  const handleSave = () => {
    onSave({ username, avatarUrl });
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-gray-800 bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-md md:w-3/12  ">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">
          Editar Perfil
        </h2>
        <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="p-2 text-lg">
            <MyCloudinaryUploadWidget onURLChange={onURLChange} />
          </div>
          <label
            htmlFor="avatar"
            className="cursor-pointer w-24 h-24 md:w-40 md:h-40 flex items-center justify-center overflow-hidden "
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>Sem foto</span>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="flex items-start p-1 font-medium text-lg text-black"
          >
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            className="w-full border rounded-md px-3 py-2 text-base text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md mr-2 text-base text-black"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-base"
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
