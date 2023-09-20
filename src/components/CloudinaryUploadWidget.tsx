import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function CloudinaryUploadWidget() {
  const [imageURL, setImageURL] = useState('');

  function handleUploadSuccess(result: any) {
    // A URL da imagem pode ser acessada através da propriedade secure_url do resultado
    const imageUrl = result.info.secure_url;
    console.log('Upload bem-sucedido. URL da imagem:', imageUrl);

    // Atualiza o estado com a URL da imagem
    setImageURL(imageUrl);
  }

  return (
    <div>
      <CldUploadWidget uploadPreset={uploadPreset} onSuccess={handleUploadSuccess}>
        {({ open }) => {
          function handleOnClick(e: { preventDefault: () => void; }) {
            e.preventDefault();
            open();
          }
          return (
            <button className="button" onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {imageURL && (
        <div>
          <h3>URL da imagem:</h3>
          <p>{imageURL}</p>
        </div>
      )}
    </div>
  );
}
