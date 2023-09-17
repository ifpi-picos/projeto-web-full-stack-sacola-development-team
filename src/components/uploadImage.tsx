// components/UploadImage.tsx
import { useState } from 'react';

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'sua_upload_preset');

      // Fazer o upload da imagem para o Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImage(data.secure_url);
        // Você pode armazenar a URL da imagem no estado ou enviá-la para o seu servidor.
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Imagem de Perfil" />}
    </div>
  );
}
