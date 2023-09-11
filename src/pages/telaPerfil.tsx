import React from "react";
import Header from "../components/Main/Header";
import FooterNavbar from "../components/Main/FooterNavbar";
import ProfileCard from "@/components/Profile/ProfileCard";

export default function telaPerfil() {
    return (
        <div className="bg-blue-jeans-50 min-h-screen">
            <Header/>
            <ProfileCard/>
            <div className="h-16"></div>
            <FooterNavbar/>
        </div>
    );
}
  
