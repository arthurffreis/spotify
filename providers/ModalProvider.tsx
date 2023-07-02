"use client";

import {useState, useEffect} from 'react';

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';

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
           <UploadModal/>
        </>
    )
}

export default ModalProvider;