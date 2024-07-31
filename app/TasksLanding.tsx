import { View, Text, KeyboardAvoidingView, Platform, Keyboard } from "react-native"
import TaskItem from "./TaskItem"
import TasksHeader from "./TasksHeader"
import { useContext, useEffect, useState } from "react"
import TasksFooter, { TaskFilters } from "./TasksFooter"
import { TasksContext, TasksDispatchContext } from "./TasksContext"
import { TasksActionType } from "./tasksReducer"
import { SwipeListView } from 'react-native-swipe-list-view';

const TasksLanding = () => {

    const tasks = useContext(TasksContext)
    const dispatch = useContext(TasksDispatchContext)

    const [currentFilter, setCurrentFilter] = useState(TaskFilters.ALL)
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

    const listSize = isKeyboardVisible ? 5 : 7.5
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

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => {
            setIsKeyboardVisible(true)
        })
        const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => {
            setIsKeyboardVisible(false)
        })

        return (() => {
            keyboardWillShowListener.remove()
            keyboardWillHideListener.remove()
        })
    }, [])

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={40}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1.5,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: 15
            }}
        >
            <View // Why is the container required?
                style={{
                    flex: 1
                }}
            >
                <TasksHeader 
                    tasksLeft={tasksLeft}
                    onCleanTasks={() => dispatch({
                        type: TasksActionType.CLEAN
                    })}
                />
            </View>

            <View
                style={{
                    flex: listSize
                }}
            >
                <SwipeListView
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
                                        taskId: item.id
                                    })
                                }}
                            />
                        )
                    }}
                    renderHiddenItem={SwipeButtonDelete}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={Separator}
                    disableRightSwipe={true}
                    swipeToOpenPercent={-50}
                    onRightAction={(taskId) => {
                        dispatch({
                            type: TasksActionType.DELETE,
                            taskId: taskId
                        })
                    }}
                    rightActivationValue={-180}
                    rightOpenValue={-90}
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
                        taskDescription: description
                    })}
                />
            </View>
        </KeyboardAvoidingView>
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

const SwipeButtonDelete = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "flex-end",
                backgroundColor: "red",
                justifyContent: "center"
            }}
        >
            <Text 
                style={{
                    color: "black",
                    fontSize: 20,
                    margin: 10
                }}
            >
                Delete
            </Text>
        </View>
    )
}

export default TasksLanding