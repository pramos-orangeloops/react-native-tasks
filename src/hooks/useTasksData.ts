import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"

const useTasksData = () => {
    const tasks = useContext(TasksContext)
    return tasks
}

export default useTasksData