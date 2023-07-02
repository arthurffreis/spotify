"use client";

import {useState, useEffect} from 'react';

import AuthModal from '@/components/AuthModal';

const ModalProvider = () =>{
    const [isMounted, setIsMOunted] = useState(false);

    useEffect(() => {
        setIsMOunted(true);
    },[])

    if (!isMounted){
        return null;
    }

    return(
        <>  
           <AuthModal/>
        </>
    )
}

export default ModalProvider;