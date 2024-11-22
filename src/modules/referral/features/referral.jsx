import React from "react";
import BackButton from "../../../components/ui/back_button";
import Image from "../../../components/ui/image";
import '../../task/style/task.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../../hooks/use_auth";
import { botURL } from "../../../constants";
import { useUtils } from '@telegram-apps/sdk-react';
import { useGetReferralLists } from "../hooks/use_data";
import Loading from "../../../components/ui/loading";
import CommonLayout from "../../../layout/common_layout";
import ReferralDetails from "../components/referral_details";
import { Toaster,toast } from "react-hot-toast";
import { t } from "i18next";

const Referral = () => {

    const {data:referrallist, isLoading} = useGetReferralLists();

    const friendList =
    (referrallist?.data?.map((friend) => ({
      name: friend.display_name,
      airDropPoints:
        friend.point?.referee_airdrop_point ||
        friend.point?.referral_airdrop_point,
      image: friend.image || '',
      id: friend.id,
      racePoints:
        friend.point?.referee_race_point || friend.point?.referral_race_point,
    }))) || [];

    const refCode = useAuth((state) => state?.user?.referralLink);
    const referralCode = refCode.slice(6);
    const utils = useUtils();
    const handleCopyText = () => {
        const textToCopy = `${botURL}/tap?startapp=${referralCode}`;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            
          navigator.clipboard.writeText(textToCopy);
          document.execCommand('copy');
          
          toast.success('Link copied.', {
            style: {
                backgroundColor: "#14103d",  // Custom background color
                color: "#ffffff",            // Custom text color
                zIndex: 5,
                width: "60%",
                top: '70px',
                left: '20%'
              },
            position: "top-center",
            autoClose: 1000,       // Auto-closes after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",      // Can also use "light" or "dark"
          })
          ;
        } catch (error) {
          toast.error('Failed to copy the link.');
        }
        document.body.removeChild(textarea);
      };

      const shareLinked = () => {
            if (typeof Telegram === 'undefined' || !Telegram.WebApp) {
                alert('Please open this app within the Telegram application.');
            } else {
                utils.openTelegramLink(
              `https://t.me/share/url?url=
                ${botURL}
                /tap
                ?startapp=
                ${referralCode}`
            );
            }
      }
    return(
        <div>
            <Toaster 
                toastOptions={{
                    icon: <img src="/copied.svg" />,
                    style: {
                      backgroundColor: "#060d21",
                      color: "#23f2ff",
                      borderRadius: "5px",
                    },
                }}
            />
            <div className="relative w-full mt-5 flex flex-col ">
                <div className="h-[720px] overflow-y-hidden">
                    <CommonLayout.Header>
                        <p className="text-heading-md">INVITE FRIENDS</p>
                        <div />
                    </CommonLayout.Header>
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <Image src="\new_design\icons\invite_icon.webp" className="w-[140px] h-[105px]" />
                        </div>
                        <div className="flex justify-center mt-[-30px] text-[20px] text-[#FFF]">
                            {t('friend_invite')}
                        </div>
                        <div className="flex justify-center text-[20px] text-[#FFE522]">
                            5% Airdrop Points
                        </div>                       
                    </div>
                    <div className="flex flex-col mt-5 h-[600px] overflow-y-hidden">
                        {
                            isLoading ? <Loading /> : <>
                            <div className="text-[16px] text-[#FFF]">FRIEND LIST :  {friendList.length}</div>
                            <ReferralDetails friendList={friendList} />
                            </>
                        }
                    </div>
                </div>
                
                <div className="flex flex-row w-full absolute left-[0] top-[100%]">
                    <div className="flex h-[45px] w-[80%] ">
                        <div
                            className=' flex flex-row justify-center tertiary_bg w-[100%]'
                            onClick={handleCopyText}
                        >
                            <Image src="\new_design\icons\copy_referral_icon.webp" className="w-[40px] h-[40px]" />
                            <p className='text-shadow-3 text-[#20244C] pt-3 pr-5 text-[20px]'>
                             COPY REFERRAL LINK
                            </p>
                        </div>
                    </div>
                
                    <div className="flex flex-row justify-center w-[20%] h-[45px] tertiary_bg  w-[100%]"
                        onClick={shareLinked}>
                        <p className='text-shadow-3 text-[#20244C] pt-[6px]'>
                            <Image src="\new_design\icons\share_referral_icon.webp" className="w-[30px] h-[30px]" />
                        </p>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Referral;





