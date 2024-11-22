import { useEffect,useState } from "react";
import { useGetTaskList } from "../hooks/use_data";
import Image from "../../../components/ui/image";
import '../style/task.css';
import TaskDetails from "../components/task_details";
import { getIcon,isHttpsLink } from "../utils";
// import BackButton from "../../../components/ui/back_button";
import Loading from "../../../components/ui/loading";
import CommonLayout from "../../../layout/common_layout";

const Task = () => {

    const {data : tasks, isLoading} = useGetTaskList();
    const [taskList,setTaskList] = useState([]);
    const [dailyTask,setDailyTask] = useState([])

    useEffect(() => {

        if(tasks) {
          const taskLists =
          tasks &&
          tasks?.data?.social_giveaways
            ?.filter((task) => !task.end_time)
            ?.map(
              (task) =>
                ({
                  id: task.tasks[0].id || task.id,
                  name: task.title,
                  airdropCoin: task.tasks[0].airdrop_point,
                  legendCoin: task.tasks[0].race_point,
                  description: task.title,
                  iconName: getIcon(task.title),
                  totalTasks: 1,
                  finishedTasks: task.tasks[0].user_task_history.some(
                    (history) => history.status === 'DONE'
                  )
                    ? 1
                    : 0,
                  type: task.type,
                  tasks: task.tasks,
                  link: isHttpsLink(task.tasks[0].action) ? task.tasks[0].action : '',
                  linkName: task.title,
                  isCompleted:
                    (task.tasks[0].user_task_history.some(
                      (history) => history.status === 'DONE'
                    )
                      ? 1
                      : 0) === 1,
                  lastHistory: task.tasks[0].user_task_history[0],
                })
            );
            taskLists.sort((a, b) => a.finishedTasks - b.finishedTasks);
            setTaskList(taskLists);
  
            const dailyTasks =
              tasks &&
              tasks?.data?.daily_giveaways
                ?.filter((task) => task.end_time)
                ?.map(
                  (task) =>
                    ({
                      id: task.tasks[0].id || task.id,
                      name: task.title,
                      airdropCoin: task.tasks[0].airdrop_point,
                      legendCoin: task.tasks[0].race_point,
                      description: task.title,
                      iconName: getIcon(task.title),
                      totalTasks: 1,
                      finishedTasks: task.tasks[0].user_task_history.some(
                        (history) => history.status === 'DONE'
                      )
                        ? 1
                        : 0,
                      tasks: task.tasks,
                      type: task.type,
                      link: isHttpsLink(task.tasks[0].action) ? task.tasks[0].action : '',
                      startTime: task.start_time,
                      endTime: task.end_time,
                      linkName: task.title,
                      isCompleted:
                        (task.tasks[0].user_task_history.some(
                          (history) => history.status === 'DONE'
                        )
                          ? 1
                          : 0) === 1,
                      lastHistory: task.tasks[0].user_task_history[0],
                    }) 
                );
                dailyTasks.sort((a, b) => b.finishedTasks - a.finishedTasks);
  
                setDailyTask(dailyTasks);
        }
  
      },[tasks])
      
    return(
      
        <>
            <div className="relative w-full mt-5">
              <CommonLayout.Header>
                <p className="text-heading-md">TASK</p>
                <div />
              </CommonLayout.Header>
                <div className="mt-5 flex justify-center">
                    <Image src="\new_design\icons\robot.webp" className="w-[140px] h-[105px]" />
                </div>
                <div className="flex flex-col mt-2 mb-5">
                    <div className="flex justify-center"><p className="text-[#FFF] text-[20px]">Want More &nbsp;</p > <p className="text-[#FFE522] text-[20px]">Airdrop Points?</p> </div>
                    <div className="flex justify-center"><p className="text-[#49CEFE] text-[20px]"  >Start Earning with Tasks!</p></div>
                </div>
                <div className="flex justify-start pt-5">
                    <p className="text-heading-sm"> {dailyTask.length > 0 ? 'DAILY TASK' : taskList.length > 0 ? 'TASK LIST' : ''}</p>
                </div>
                <div className="mt-3 overflow-y-auto">
                  {
                    isLoading ? <Loading /> : 
                      dailyTask.length > 0 ? dailyTask?.map((task) => {
                      
                        return(
                          <TaskDetails
                          key={task.id}
                          IconName={task.iconName}
                          name={task.name}
                          airdropCoin={task.airdropCoin}
                          legendCoin={task.legendCoin}
                          finishedTasks={task.finishedTasks}
                          totalTasks={task.totalTasks}
                          tasks={task.tasks}
                          currentTask={task}
                        />          
                          )
                        }) : taskList.length > 0 ? taskList?.map((task,k) => {
                      
                          return(
                            <TaskDetails
                            key={task.id}
                            IconName={task.iconName}
                            name={task.name}
                            airdropCoin={task.airdropCoin}
                            legendCoin={task.legendCoin}
                            finishedTasks={task.finishedTasks}
                            totalTasks={task.totalTasks}
                            tasks={task.tasks}
                            currentTask={task}
                        />
                      )
                    }) : <></>
                    
                    
                  }
                    {
                        
                    }
                
                </div>
            </div>
        </>
    )
}

export default Task;


