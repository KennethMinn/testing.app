import React from "react";
import * as TablerIcons from '@tabler/icons-react';
import { getIconComponent } from "../utils";
import Image from "../../../components/ui/image";
import { formatNumber } from "../../../utils";
import useTask from "./use_task";
import Modal from "../../../components/ui/modal";
import { useAuth } from "../../../hooks/use_auth";
import { botURL } from "../../../constants";
import { Toaster,toast } from "react-hot-toast";
import { t } from "i18next";

const TaskDetails = ({IconName,name,currentTask,finishedTasks,airdropCoin,legendCoin,totalTasks}) => {

    const IconComponent = getIconComponent(IconName);
    const {
        isOpen,
        setIsOpen,
        isLinkClicked,
        isUserVerified,
        isCompleted,
        clickLink,
        clickTgLink,
        error,
        isVerifying,
      } = useTask(currentTask);

      const refCode = useAuth((state) => state?.user?.referralLink);
      const referralCode = refCode.slice(6);

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
                backgroundColor: "#14103d",  
                color: "#ffffff",            
                zIndex: 5,
                width: "60%",
                top: 0,
                left: '20%'
              },
            position: "top-center",
            autoClose: 1000,       
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",     
          }
        )
        ;
        } catch (error) {
          toast.error('Failed to copy the link.');
        }
        document.body.removeChild(textarea);
        
      };
    
      const handleClick = (type) => {
        
        if (type === 'link-only') {
          clickLink(currentTask.link, currentTask.id, 'link-only');
          return;
        }
    
        if (isVerifying) {
          return;
        }
        if (isCompleted || currentTask?.isCompleted) {
          return;
        }
    
        if (
          currentTask?.name.toLowerCase().includes('join') &&
          currentTask?.name.toLowerCase().includes('telegram')
        ) {
            
          clickTgLink(currentTask.link, currentTask.id);
          return;
        }
        if(isLinkClicked && isUserVerified){
            setIsOpen(false);
        }
        clickLink(currentTask.link, currentTask.id);
      };

    return (
        <>
        
        <Modal
            title="TASK"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className=" h-[380px]"
            >
                <Toaster 
                    toastOptions={{
                    icon: <img src="/copied.svg" />,
                    style: {
                      backgroundColor: "#060d21",
                      color: "#23f2ff",
                      borderRadius: "5px",
                    },
                  }}/>

                <div className="w-full">
                    <div className="flex justify-center text-[18px] w-full mt-2">
                        {currentTask && (currentTask.description).toUpperCase()}
                    </div>
                    <div className=" flex flex-col mt-[20px] task_modal h-[250px] w-full">
                        <div className="flex row">
                            <div>
                                <span className="flex text-[12px] task_circle ">1</span> 
                            </div>
                            <div>
                                <p className='text-start text-[14px] pl-[10px] inline-block align-middle'>
                                    Click below to complete via link
                                </p>
                            </div>
                        </div>
                        <div className="flex row" >
                            <div className="mt-5 dotreverse text-[7px]">
                                .................
                            </div>
                            <div className="mt-2 pl-[10px]">
                                {currentTask.type !== 'PlaySmashGame' &&
                                        currentTask.type !== 'ReferFriends' && (
                                        <>
                                            {currentTask && currentTask?.link ? (
                                            <p className='flex items-center gap-[7px] mt-5'>
                                                <button
                                                onClick={() => {
                                                    handleClick('link-only');
                                                }}
                                                >
                                                    <span className='text-start text-[14px] text-[#3FE45E]'>
                                                        {currentTask && (currentTask?.linkName).toUpperCase()}
                                                    </span>
                                                </button>

                                                <TablerIcons.IconArrowUpRight
                                                    size={16}
                                                    color='#3FE45E'
                                                />
                                            </p>
                                            ) : (
                                            <p className='invisible flex items-center gap-[7px] mt-5'>
                                                <button>
                                                <span className='text-start text-[14px] text-[#3FE45E]'>
                                                    {currentTask && (currentTask?.linkName).toUpperCase()}
                                                </span>
                                                </button>
                                            </p>
                                            )}
                                        </>
                                    )}
                                    {currentTask.type === 'ReferFriends' && (
                                        <div className="mt-3">
                                            {currentTask && (
                                                <button
                                                className='flex cursor-pointer items-center gap-[7px] '
                                                onClick={() => {
                                                    handleCopyText();
                                                }}
                                                >
                                                    <p>
                                                        <span className='text-start text-[14px] text-[#3FE45E] mt-5'>
                                                            {currentTask && (currentTask?.name).toUpperCase()}
                                                        </span>
                                                    </p>

                                                    <TablerIcons.IconCopy size={16} color='#3FE45E' />
                                                </button>
                                            )}
                                        </div>
                                )}
                            </div>
                        </div>
                        <div className="flex row">
                            <div className="mt-5">
                                <span className="flex text-[12px] task_circle ">
                                    {!isLinkClicked
                                        ? 2
                                        : isVerifying
                                            ? 3
                                            : isUserVerified
                                            ? 4
                                            : 2
                                    }
                                </span>  
                            </div>
                            <div className="mt-5">                          
                                <p className='text-start text-[14px] pl-[10px] inline-block align-middle'>
                                    {!isLinkClicked
                                        ? "Click verify once done."
                                        : isVerifying
                                            ? 'Verification in progress. Please wait.'
                                            : isUserVerified
                                            ? "Verification complete. Claim your rewards now."
                                            : "Click verify once done."
                                    }
                                </p>                         
                            </div>
                        </div>

                        <div className="flex justify-center text-[18px] w-full mt-4">
                            {
                                airdropCoin ? (
                                <p className='flex items-center gap-[3px] text-caption text-airdrop'>
                                    <Image src="\new_design\icons\airdrop_coin.webp" className="w-[20px] h-[20px]" />
                                    {formatNumber(Number(airdropCoin))}
                                </p>
                            ) :null
                            }
                        </div>

                        <div className="flex mt-5">
                            <button
                                className='tertiary_bg w-[100%] h-[45px] flex items-center gap-x-2 ps-2 relative'
                                onClick={() => {
                                handleClick();
                                }}
                            >
                                <p className='text-shadow-3 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform text-[#20244C]'>
                                    {!isLinkClicked
                                        ? t('do_task')
                                        : isVerifying
                                        ? t('verifying')
                                        : isUserVerified
                                            ? t('Claim Reward') : t('do_task')
                                    }
                                </p>
                            </button>
                        </div>

                    </div>
                </div>
                
            </Modal>

            <div 
                className="w-full flex flex-row mt-5 task_detail items-center  p-[18px] sm:h-[70px]"
                onClick={ () =>{
                    if (isCompleted || currentTask?.isCompleted) {
                        return;
                    }
                    setIsOpen(!isOpen)
                }}
                >
                    <div className="sound-click flex items-center gap-[6px] w-[85%]">
                        <div className="task_icon">{IconComponent && <IconComponent style={{color : "linear-gradient(to bottom, #F7FFEC , #B2F1E8)"}} size={25} />}</div>
                        <div className="flex flex-col">
                            <h3 className=" w-full max-w-[50vw] overflow-hidden truncate text-body-2 text-[18px] ">{currentTask && (currentTask.description).toUpperCase()}</h3> 
                            <div className="flex items-center gap-[16px]">
                                {
                                    airdropCoin ? (
                                    <p className='flex items-center gap-[3px] text-caption text-airdrop'>
                                        <Image src="\new_design\icons\airdrop_coin.webp" className="w-[16px] h-[16px]" />
                                        {formatNumber(Number(airdropCoin))}
                                    </p>
                                    ) :null
                                }
                                {
                                    legendCoin && legendCoin !== '0' ? (
                                        <p className='flex items-center gap-[3px] text-caption text-race'>
                                            <Image
                                                src='/Icons/Icons/Asset file/Race_Legends_Coin.webp'
                                                alt='l-coin'
                                                width={16}
                                                height={16}
                                            />

                                            {formatNumber(Number(legendCoin))}
                                        </p>
                                    ) : null
                                }
                                 
                            </div>
                        </div>                       
                    </div>
                    <div className="flex items-center gap-[6px] w-[15%] ">
                    
                        {finishedTasks !== undefined && totalTasks !== undefined && (
                            <div className='flex gap-[1px]'>
                            <div
                                className={`text-caption sm:text-title-2 ${currentTask.isCompleted || isCompleted ? 'text-primary' : ''}`}
                            >
                                {' '}
                                {isCompleted ? 1 : finishedTasks}
                            </div>
                            <div
                                className={`text-caption sm:text-title-2 ${currentTask.isCompleted || isCompleted ? 'text-primary' : ''}`}
                            >
                                {' '}
                                /
                            </div>
                            <div
                                className={`text-caption sm:text-title-2 ${currentTask.isCompleted || isCompleted ? 'text-primary' : ''}`}
                            >
                                {totalTasks}
                            </div>
                            </div>
                        )}
                            {currentTask.isCompleted || isCompleted ? (
                                <Image
                                src='\new_design\icons\check.webp'
                                alt='arrow'
                                width={16}
                                height={16}
                                className='w h-[18px] w-[12px]'
                                />
                                ) : (
                                <Image
                                    src='\new_design\icons\right_arrow_icon.webp'
                                    alt='arrow'
                                    width={16}
                                    height={16}
                                    className='w h-[18px] w-[12px]'
                                />
                            )}
                                
                    </div>            
                        
            </div>
            
        </>
    )
}

export default TaskDetails;

