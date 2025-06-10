
import React from 'react';
import Navbar from '../components/Navbar';
import {Footer} from '../components/Footer';
export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className='w-full min-h-screen'>
            <Navbar />
            <main className='w-full min-h-[calc(100vh-80px)]'>
                {children}
            </main>
            <Footer />
        </div>
    )
};
