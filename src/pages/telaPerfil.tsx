import React, {useEffect} from "react";
import Header from "../components/Main/Header";
import FooterNavbar from "../components/Main/FooterNavbar";
import ProfileCard from "@/components/Profile/ProfileCard";
import {getUserInfo} from "@/services/userInfo";
import useAuth from "@/hooks/useAuth";



export default function TelaPerfil() {

    const {getUser} = useAuth();

    const [profileData, setProfileData] = React.useState<any>(null);



    useEffect(() => {
        async function handleInfos() {
            // @ts-ignore
            const id = JSON.parse(await getUser()).uid;
            const profileData = await getUserInfo(id);

            // @ts-ignore
            setProfileData(profileData.toJSON());
        }
        handleInfos();
    }, []);

    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <ProfileCard/>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
  