import Image from "next/image";

export default function SteamLogo() {
  return (
    <div className="absolute bottom-[12,5rem] left-[0,80rem]">
    <div className="bg-white w-[6rem] p-2  rounded-br-xl flex justify-start">
      <Image
        src="/Steam-logo-new.svg"
        alt="Steam Logo"
        width={50}
        height={50}
        className="w-[3.5rem] "
      />
    </div>
  </div>
  );
}
