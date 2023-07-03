"use client"

import Box from "@/components/Box"
import { BounceLoader } from "react-spinners"
const Error = () => {
    return(
        <Box
            className="
                h-full flex items-center justify-center
            "
        >
            <BounceLoader color ="#22c55e" size={40}
                className="text-neutral-400"
            />

         
        </Box>
    )
}
export default Error 