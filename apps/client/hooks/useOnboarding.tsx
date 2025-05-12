import OnBoardingContext from "@/context/onBoarding";
import { useContext } from "react"

const useOnboarding = () => {
    const data = useContext(OnBoardingContext)
    return data
}

export default useOnboarding;