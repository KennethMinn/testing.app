import { useState } from "react";
import { useShowGif } from "../hooks/use_store";
import Image from "../components/ui/image";
import Background from "../components/ui/background";
import LayoutBackground from "../components/ui/layout_background";

const WelcomeLayout = () => {
  const { setIsShowGif } = useShowGif();
  const [imageIndex, setImageIndex] = useState(0);
  const [firstColor, setFirstColor] = useState("white");
  const [secondColor, setSecondColor] = useState("gray");
  const [isFetchVideo, setIsFetchVideo] = useState(
    localStorage.getItem("isFetchVideo") || "true"
  );

  const handleClick = () => {
    if (imageIndex === 0) {
      setFirstColor("gray");
      setSecondColor("white");
      setImageIndex(1);
    }
    if (imageIndex === 1) {
      setImageIndex(2);
      if (isFetchVideo === "false") {
        sessionStorage.setItem("isShowGif", "false");
        setIsShowGif(false);
      }
    }
  };

  const onEnd = () => {
    localStorage.setItem("isFetchVideo", "false");
    setIsFetchVideo("false");
    setIsShowGif(false);
  };

    return(
        
        <div className="flex justify-center">
            {
                (imageIndex === 2 && isFetchVideo !== 'false') ? (
                    <div className='relative flex h-screen items-center justify-center bg-[black]'>
                        <video
                        controls={false}
                        autoPlay
                        playsInline
                        preload='auto'
                        className='video z-0'
                        onEnded={onEnd}
                    >
                        <source src='/monster.mp4' type='video/mp4' />
                    </video>
                </div>
                )  
                    : 
                <LayoutBackground>
                    <div className="flex flex-col justify-center h-full gap-y-5 sm:mt-[10px] ">
                        <div className="flex flex-col ">
                            <div className="flex flex-row justify-center ">
                                <Image src="\new_design\logo\logo_main.webp" className=" h-[70px]" />
                            </div>
                            <div className="flex flex-row justify-center mt-[30px] ">
                                {
                                    imageIndex > 0 ? <Image src='\new_design\logo\dashboard1.webp' className=" w-[300px] h-[300px]" /> : <Image src='\new_design\logo\dashboard.webp' className=" w-[300px] h-[300px]" />
                                }
                                
                            </div>

                            <div className="flex flex-row justify-center mt-[30px] md:mt-[40px] sm:mt-[26px] text-[30px]">
                                LEGEDS ROADMAP
                            </div>
                            <div className="flex flex-row justify-center md:mt-[30px] sm:mt-[26px] text-[#F3EDF780] text-[18px]">
                                Future steps to enhance your Legend
                            </div>
                            <div className="flex flex-row justify-center text-[#F3EDF780] text-[18px]">journey</div>
                            <div className="flex flex-row justify-center mt-5" onClick = {handleClick}>
                                <Background
                                    bgUrl="/new_design/background/Next_btn.webp"
                                    className='w-[153px] h-[50px] flex items-center gap-x-2 justify-center'                             
                                >
                                    NEXT
                                </Background>
                                
                            </div>
                            <div className="flex flex-row justify-center mt-5">
                                <span className={`w-[7px] h-[7px] color-[#FFF] bg-[${firstColor}] rounded-[50px] opacity-[1] mr-[10px]`} />
                                <span className={`w-[7px] h-[7px] color-[#FFF] bg-[${secondColor}] rounded-[50px] opacity-[1]`} />
                            </div>
                        
                        
                        </div>
                    </div>
                </LayoutBackground>
                
            }
        </div>
    )
}

export default WelcomeLayout;
