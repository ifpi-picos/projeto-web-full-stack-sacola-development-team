import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface UploadImageProps {
  onURLChange?: (url: string) => void;
  maxHeight?: number;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function CloudinaryUploadWidget({
  onURLChange, maxHeight
}: UploadImageProps) {
  const [imageURL, setImageURL] = useState(""); // Inicializa o estado imageURL como uma string vazia
  const [buttonText, setButtonText] = useState("Enviar Imagem");
  // Função chamada quando o upload é bem-sucedido
  function handleUploadSuccess(result: any) {
    // A URL da imagem pode ser acessada através da propriedade secure_url do resultado
    const imageUrl = result.info.secure_url;
    if (onURLChange) {
      onURLChange(imageUrl);
      maxHeight = 300;
    } else {
      console.warn(
        "Você precisa passar a prop onChange para o formulário de cadastro"
      );
    }
    console.log("Upload bem-sucedido. URL da imagem:", imageUrl);

    // Atualiza o estado com a URL da imagem
    setImageURL(imageUrl);

    setButtonText("Reenviar Imagem");
  }

  return (
    <div>
      {/* Componente CldUploadWidget que permite fazer upload de imagens */}
      <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => {
          // Função chamada quando o botão "Upload an Image" é clicado
          function handleOnClick(e: { preventDefault: () => void }) {
            e.preventDefault();
            open();
          }

          return (
            // Botão que inicia o processo de upload quando clicado
            <button
              className="bg-blue-400 w-full  text-white py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600  "
              onClick={handleOnClick}
            >
              Enviar Foto de Perfil
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
