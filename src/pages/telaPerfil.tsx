import React from "react";
import Header from "../components/Main/Header";
import FooterNavbar from "../components/Main/FooterNavbar";
import ProfileCard from "@/components/Profile/ProfileCard";
import {getUserInfo} from "@/services/userInfo";

export async function getServerSideProps() {
    // @ts-ignore
    try {
        const profileData = await getUserInfo();

        if (!profileData) {
            return {
                props: {
                    profileData: null,
                },
            };
        }

        return {
            props: {
                profileData: profileData.toJSON(),
            },
        };
    } catch (e) {
        console.log(e);
    }
}


export default function telaPerfil({profileData}: any) {


    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <ProfileCard PlayerData={profileData}/>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
  