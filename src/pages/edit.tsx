import { CldUploadWidget } from "next-cloudinary";

export default function CloudinaryUploadWidget() {
  return (
<CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params">
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
  );
}
