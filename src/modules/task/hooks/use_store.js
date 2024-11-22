import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";

export const useTaskList = create(
    persist(
        (set) => ({
            taskList : null,
            setTaskList : (taskList) => set({taskList}),
        }),
        {name : "taskList", storage: createJSONStorage(() => sessionStorage)}
    )
)