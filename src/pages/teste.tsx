// pages/teste.tsx
import React from 'react';
import HeaderGameMate from '@/components/Main/Header';
import Footer from '@/components/Main/FooterNavbar';


export default function Testes() {
    return (
        <div className="bg-blue-jeans-50 h-screen">
            <>
                <HeaderGameMate/>
                 {/* Renderiza a página de busca com os GameCards */}
                <Footer/>
            </>
        </div>
    );
}
