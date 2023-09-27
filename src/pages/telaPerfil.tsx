import React, {useEffect} from "react";
import Header from "../components/Main/Header";
import FooterNavbar from "../components/Main/FooterNavbar";
import ProfileCard from "@/components/Profile/ProfileCard";
import {getUserInfo} from "@/services/userInfo";
import useAuth from "@/hooks/useAuth";



export default function TelaPerfil() {

    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <ProfileCard/>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
  