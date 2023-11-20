import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {getUserInfo} from "@/services/userInfo";
import ProfileModal from "./EditProfile";
import VincularSteam from "../Utils/Input";

interface UserData {
    username: string;
    avatarUrl: string;
}

export default function ProfileCard() {
    const {getUser} = useAuth();
    const [profileData, setProfileData] = React.useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleSaveProfile = (newUserData: UserData) => {
        // Implemente a lógica para salvar os dados do usuário no estado global ou em algum backend aqui.
        console.log("Dados do usuário salvos:", newUserData);

        setIsModalOpen(false);
    };

    useEffect(() => {
        async function handleInfos() {
            try {
                const profileData = await getUserInfo();
                // @ts-ignore
                setProfileData(profileData.toJSON());
            }
            catch (e) {
                console.log(e);
            }
        }
        console.log("profileData")
        handleInfos();
    }, [refresh]);

    function refreshPage() {
        setRefresh(!refresh);
    }

    return (
        <div className="w-screen min-h-screen bg-blue-jeans-50 flex flex-row flex-wrap p-3">
            {profileData ? (
                <div className="mx-auto w-full md:w-2/3">
                    <div
                        className="rounded-3xl shadow-lg bg-gray-900 md:bg-gray-900 w-full flex flex-row flex-wrap p-3 antialiased">
                        <div className="w-full md:w-1/3 ">
                            <Image
                                className="rounded-lg shadow-lg antialiased mt-6 mx-auto md:mt-14 md:ml-14 "
                                src={
                                    profileData.photo
                                        ? profileData.photo
                                        : "https://res.cloudinary.com/dwkdquhlf/image/upload/v1695332007/t4nyuc1bqvfo9ez9cnsd.jpg"
                                }
                                alt="Profile"
                                width={250}
                                height={100}
                            />
                        </div>
                        <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                            <div className="w-full text-right font-semibold relative pt-3 md:pt-0">
                                <div className="text-2xl text-white leading-tight">
                                    <EditIcon
                                        className="text-white cursor-pointer hover:text-gray-400"
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                    <ProfileModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        userData={profileData}
                                        onSave={handleSaveProfile}
                                    />
                                </div>

                                <div
                                    className="flex flex-col justify-center items-center p-4 md:p-10 text-2xl text-white">
                                    <h3 className="text-center mb-2">{profileData.username}</h3>
                                </div>

                                <div className="flex flex-row justify-center items-center gap-2 text-2xl text-white">
                                    Level: <span>1</span>
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <div
                                        className="flex flex-row justify-center items-center gap-2 text-2xl mt-4 md:mt-8 w-56 h-16 bg-zinc-800 text-white">
                                        <h3>
                                            Amigos:{" "}
                                            <span>{profileData.userFriends.friends_total}</span>
                                        </h3>
                                    </div>
                                    <div
                                        className="flex flex-row justify-center items-center gap-2 text-2xl mt-4 md:mt-8 w-56 h-16 bg-zinc-800 text-white">
                                        <h3>
                                            Jogos: <span>{profileData.userGames.games_total}</span>
                                        </h3>
                                    </div>

                                    <div className="h-16"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit mx-auto mt-8 ">
                        <VincularSteam refresh={refreshPage}/>
                    </div>
                    <div className="h-4"></div>
                </div>
            ) : (
                <div>Carregando...</div>
            )}
        </div>
    );
}
