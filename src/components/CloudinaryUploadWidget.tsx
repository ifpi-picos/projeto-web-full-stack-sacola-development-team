import { CldUploadWidget } from 'next-cloudinary'; // Importa o componente CldUploadWidget da biblioteca next-cloudinary
import { useState } from 'react'; // Importa o hook useState da biblioteca React

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // Obtém a variável de ambiente NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export default function CloudinaryUploadWidget() {
  const [imageURL, setImageURL] = useState(''); // Inicializa o estado imageURL como uma string vazia

  // Função chamada quando o upload é bem-sucedido
  function handleUploadSuccess(result: any) {
    // A URL da imagem pode ser acessada através da propriedade secure_url do resultado
    const imageUrl = result.info.secure_url;
    console.log('Upload bem-sucedido. URL da imagem:', imageUrl);

    // Atualiza o estado com a URL da imagem
    setImageURL(imageUrl);
  }

  return (
    <div>
      {/* Componente CldUploadWidget que permite fazer upload de imagens */}
      <CldUploadWidget uploadPreset={uploadPreset} onSuccess={handleUploadSuccess}>
        {({ open }) => {
          // Função chamada quando o botão "Upload an Image" é clicado
          function handleOnClick(e: { preventDefault: () => void; }) {
            e.preventDefault();
            open();
          }

          return (
            // Botão que inicia o processo de upload quando clicado
            <button className="button" onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Renderiza a URL da imagem se estiver disponível */}
      {imageURL && (
        <div>
          <h3>URL da imagem:</h3>
          <p>{imageURL}</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer">
            Abrir Imagem
          </a>
        </div>
      )}
    </div>
  );
}
