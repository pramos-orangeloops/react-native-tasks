import { useContext } from "react"
import { TasksDispatchContext } from "../context/TasksContext"

const usePerformTasksUpdate = () => {
    const dispatch = useContext(TasksDispatchContext)
    return dispatch
}

export default usePerformTasksUpdate