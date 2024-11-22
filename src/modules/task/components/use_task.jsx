import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/use_auth';
import { axiosInstance } from '../../../lib/axios/axios_instance';

const useTask = (currentTask) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [isThereAnApiCall, setIsThereAnApiCall] = useState(false);
    const [userTaskId, setUserTaskId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState(false);
    const tgUser = useAuth((state) => state?.user?.id);
    const user = useAuth((state) => state?.user?.telegram_id);

    useEffect(() => {
        if (
          currentTask &&
          currentTask.lastHistory &&
          currentTask.lastHistory.status === 'DONE'
        ) {
          setIsCompleted(true);
        }
    
        if (
          currentTask &&
          currentTask.lastHistory &&
          currentTask.lastHistory.status === 'START'
        ) {
          setIsLinkClicked(true);
          setUserTaskId(currentTask.lastHistory.id);
        }
      }, [currentTask]);

      const clickLink = async (link, id, type) => {
        if (isThereAnApiCall) {
          return;
        }
        if (type === 'link-only') {
          if (!isLinkClicked) {
            setIsThereAnApiCall(true);
            await axiosInstance.post('/startTask', {
              task_id: id,
            }).then((res) => {
              // save user_task_id
              if (
                res.data &&
                res.data.user_task_id &&
                res.data.status === 'START'
              ) {
                setUserTaskId(res.data.user_task_id);
              }
              if (link) {
                window.open(link, '_blank');
              }
              setIsLinkClicked(true);
            });
            setIsThereAnApiCall(false);
          }
    
          if (link) {
            window.open(link, '_blank');
            setIsLinkClicked(true);
          }
          return;
        }
    
        if (!isLinkClicked) {
          // call to startTask
          setIsThereAnApiCall(true);
          await axiosInstance.post('/startTask', {
            task_id: id,
          }).then((res) => {
            // save user_task_id
            if (res.data && res.data.user_task_id && res.data.status === 'START') {
              setUserTaskId(res.data.user_task_id);
            }
            if (link) {
              window.open(link, '_blank');
              // utils.openLink(link);
            }
            setIsLinkClicked(true);
          });
          setIsThereAnApiCall(false);
        } else if (isLinkClicked && !isUserVerified && !isVerifying) {
          //  temp 1 sec delay
          setIsVerifying(true);
          setTimeout(() => {
            setIsVerifying(false);
            setIsUserVerified(true);
          }, 1000);
        } else if (isLinkClicked && isUserVerified) {
          // call to finishTask
          setIsThereAnApiCall(true);
          await axiosInstance.post('/completeTask', {
            user_task_id: userTaskId,
            verfication: 'http:/....',
          }).then((res) => {
            // close modal
            if (!res.status.toString().startsWith('2')) {
              setError(res.message || 'You have problems');
              return;
            }
    
            if (res.data && res.data.status === 'DONE') {
              setIsCompleted(true);
              setIsOpen(false);
            }
          });
          setIsThereAnApiCall(false);
        }
        // setUpdateTap(true);
      };

      const clickTgLink = async (link, id) => {
      
        if (isThereAnApiCall) {
            return;
        }
        if (!isLinkClicked) {
            // call to startTask
            setIsThereAnApiCall(true);
            await axiosInstance.post('/startTask', {
            task_id: id,
            }).then((res) => {
            // save user_task_id
            if (res.data && res.data.user_task_id && res.data.status === 'START') {
                setUserTaskId(res.data.user_task_id);
            }
            if (link) {
                window.open(link, '_blank');
            }
            setIsLinkClicked(true);
            });
            setIsThereAnApiCall(false);
        } else if (isLinkClicked && !isUserVerified && !isVerifying) {
          
            //  temp 1 sec delay
            setIsVerifying(true);
            let type = 'group';
            if (currentTask.name.toLowerCase().includes('channel')) {
            type = 'channel';
            }
            
            setIsThereAnApiCall(true);
            
            const res = await axiosInstance.get(
            '/api/checkUserInTg' +
                `?userId=${tgUser || user}&type=${type}`
            );
           console.log("REs ", res)
            if (res.success) {
            setIsVerifying(false);
            setIsUserVerified(true);
            } else {
            setIsVerifying(false);
            setError(res.message || 'Sorry you are not in the group');
            }
            setIsThereAnApiCall(false);
        } else if (isLinkClicked && isUserVerified) {
            // call to finishTask
            setIsThereAnApiCall(true);
            await axiosInstance.post('/completeTask', {
            user_task_id: userTaskId,
            verfication: "http:/....",
            }).then((res) => {
            // close modal
            if (!res.status.toString().startsWith('2')) {
                setError(res.message || 'You have problems');
                return;
            }
    
            if (res.data && res.data.status === 'DONE') {
                setIsCompleted(true);
                // setIsOpen(false);
            }
            });
            setIsThereAnApiCall(false);
            setIsOpen(false);
        }
        // setUpdateTap(true);
        };
    
        return {
            isOpen,
            setIsOpen,
            isLinkClicked,
            setIsLinkClicked,
            isUserVerified,
            setIsUserVerified,
            clickLink,
            isVerifying,
            setIsVerifying,
            isCompleted,
            clickTgLink,
            error,
          };

}

export default useTask;