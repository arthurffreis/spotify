"use client"
import {useRouter} from "next/navigation"
import {twMerge} from "tailwind-merge"
import {RxCaretRight,RxCaretLeft} from 'react-icons/rx'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import Button from './Button'
import useAuthModal from "@/hooks/useAuthModal"
import AuthModal from "./AuthModal"
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import { useUser } from "@/hooks/useUser"
import {FaUserAlt} from 'react-icons/fa'
import {toast} from 'react-hot-toast'
import usePLayer from "@/hooks/usePlayer"


interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    
    const player = usePLayer()
    const router= useRouter();
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient()

    const {user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        player.reset()
        router.refresh

        if(error){
            toast.error(error.message)
        } else{
            toast.success('Logged out')
        }
    }


    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6 

        `)}>
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden 
                    md:flex
                    gap-x-2
                    items-center
                ">
                </div>
                <div className=" flex md:hidden gap-x-2 items-center">
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <HiHome className="text-black" size={20} onClick={ () => router.push('/')}/>
                    </button>
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <BiSearch className="text-black" size={20} onClick={ () => router.push('/search')}/>
                    </button>
                </div>
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                {user ? (
                    <div
                        className="
                            flex
                            gap-x-4
                            items-center
                        "                    
                    >
                        <Button
                            onClick={handleLogout}
                            className="
                                bg-white                                
                                px-6
                                py-2
                            "
                        > 
                            Logout
                        </Button>
                        <Button
                            onClick={ () => router.push('/account')}
                            className="bg-white"
                        >
                            <FaUserAlt/>    
                        </Button>
                    </div>
                ) :(
                    <>
                        <div>
                            <Button
                                onClick={authModal.onOpen}
                                className="
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                "
                            >
                                sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick= {authModal.onOpen}
                                className="
                                    bg-white
                                    text-black
                                    px-6
                                    py-2
                                "
                            >
                                sign in
                            </Button>
                        </div>
                    </>
                )}
                </div>
            </div>
            {children}
        </div>
    );
}
 
export default Header;
