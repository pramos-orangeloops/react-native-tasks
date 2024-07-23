import { View, FlatList } from "react-native"
import TaskItem from "./TaskItem"
import TasksHeader from "./TasksHeader"
import { useContext, useState } from "react"
import TasksFooter, { TaskFilters } from "./TasksFooter"
import { Task } from "./Task"
import { TasksContext, TasksDispatchContext } from "./TasksContext"
import { TasksActionType } from "./tasksReducer"
import * as Crypto from 'expo-crypto';

const TasksLanding = () => {

    const tasks = useContext(TasksContext)
    const dispatch = useContext(TasksDispatchContext)

    const [currentFilter, setCurrentFilter] = useState(TaskFilters.ALL)

    const tasksLeft = tasks.reduce((acc, elem) => {
        return (elem.isDone ? acc : (acc + 1))
    }, 0)
    const filteredTasks = () => {
        switch (currentFilter) {
            case TaskFilters.ALL: {
                return tasks
            }
            case TaskFilters.ACTIVE: {
                return tasks.filter(task => task.isDone === false)
            }
            case TaskFilters.COMPLETED: {
                return tasks.filter(task => task.isDone === true)
            }
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginHorizontal: 15
        }}>
            <View // Why is the container required?
                style={{
                    flex: 1
                }}
            >
                <TasksHeader 
                    tasksLeft={tasksLeft}
                    onCleanTasks={() => dispatch({
                        type: TasksActionType.CLEAN,
                        task: new Task("" ,"" , false, new Date(), null)
                    })}
                />
            </View>

            <View
                style={{
                    flex: 8
                }}
            >
                <FlatList
                    data={filteredTasks()}
                    renderItem={({ item }) => {
                        return(
                            <TaskItem
                                taskId={item.id}
                                description={item.description}
                                isDone={item.isDone}
                                onClick={() => {
                                    dispatch({
                                        type: TasksActionType.UPDATE_STATE,
                                        task: item
                                    })
                                }}
                            />
                        )
                    }}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={Separator}
                />
            </View>

            <View
                style={{
                    flex: 1.5
                }}
            >
                <TasksFooter
                    currentFilter={currentFilter}
                    onFilterChange={(newFilter) => setCurrentFilter(newFilter)}
                    onAddTask={(description) =>dispatch({
                        type: TasksActionType.ADD,
                        task: new Task(Crypto.randomUUID(), description, false, new Date(), null)
                    })}
                />
            </View>
        </View>
    )
}

const Separator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DDD"
            }}
        />
    )
}
export default TasksLanding