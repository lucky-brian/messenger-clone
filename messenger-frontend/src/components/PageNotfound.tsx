import Lottie from "lottie-react";
import loadingAnimation from "../lotties/animation_lkxspmeu.json";
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    let navigate = useNavigate()
    const handleClickBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <div 
            onClick={()=> handleClickBack()}
            className="p-1 absolute left-5 top-5 rounded-full transition hover:cursor-pointer hover:bg-neutral-100">
                <BiArrowBack size={30} />
            </div>
            <div className='m-auto flex justify-center items-center w-96 h-screen'>

                <div>
                    <Lottie animationData={loadingAnimation} loop={true} />
                </div>
            </div>
        </div>
    )
}