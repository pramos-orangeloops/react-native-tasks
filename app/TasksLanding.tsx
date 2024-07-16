import { View, Text, FlatList } from "react-native"
import Task from "./Task"
import TasksHeader from "./TasksHeader"
import { useState } from "react"
import TasksFooter, { TaskFilters } from "./TasksFooter"

const initialTasks = [
    {
        id: 1,
        description: "Study Typescript",
        isDone: true
    },
    {
        id: 2,
        description: "Study React",
        isDone: false
    },
    {
        id: 3,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        isDone: false
    },
    {
        id: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        isDone: false
    }
]

const TasksLanding = () => {

    const [tasks, setTasks] = useState(initialTasks)
    const [nextId, setNextId] = useState(5)
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

    const handleTaskClik = (elemId: number) => {
        setTasks((state) => {
            const elem = tasks.find((it) => it.id === elemId)
            if (!elem) return state

            const newElem = { ...elem, isDone: !elem?.isDone }

            return state.map(it => {
                if (it.id === elemId) {
                    return newElem ?? elem
                }
                return it
            })
        })
    }

    const handleAddTask = (newTaskDescription: string) => {
        setTasks([
            {
                id: nextId,
                description: newTaskDescription,
                isDone: false
            },
            ...tasks
        ])
        setNextId(nextId + 1)
    }

    const handleCleanTasks = () => {
        setTasks(tasks.filter((task) => !task.isDone))
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
                    onCleanTasks={handleCleanTasks}
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
                            <Task
                                description={item.description}
                                isDone={item.isDone}
                                onClick={() => { handleTaskClik(item.id) }}
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
                    onAddTask={(description) => handleAddTask(description)}
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