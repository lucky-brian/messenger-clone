import Lottie from "lottie-react";
import loadingAnimation from "../lotties/animation_lkxse0p6.json";

export const Loading = () => {
    return (
        <div className=' m-auto h-screen w-40 flex justify-center items-center'>
            <Lottie animationData={loadingAnimation} loop={true} />
        </div>
    )
}