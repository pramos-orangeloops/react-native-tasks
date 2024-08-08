import { useContext, useState } from "react"
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native"
import { AppTheme } from "../../style/themes"
import { ThemeContext } from "../../context/ThemeContextProvider"

export const enum TaskFilters {
    ALL,
    ACTIVE,
    COMPLETED
}

export interface TasksFooterProps {
    currentFilter: TaskFilters,
    onFilterChange: (filter: TaskFilters) => void,
    onAddTask: (description: string) => void
}

const TasksFooter = (props: TasksFooterProps) => {
    const { currentFilter, onFilterChange, onAddTask } = props

    const [taskDescription, setTaskDescription] = useState("")
    const theme = useContext(ThemeContext)

    const handleAddTaskClick = () => {
        if (taskDescription.trim().length > 0) {
            onAddTask(taskDescription),
            setTaskDescription("")
        }
    }

    return(
        <View
            style={{
                flex: 1,
                alignItems: "flex-start",
                width: "100%",
                margin: 5
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%"
                }}
            >
                <TouchableOpacity
                    onPress={() => onFilterChange(TaskFilters.ALL)}
                    style={currentFilter === TaskFilters.ALL ? styles(theme).filterContainerActive : styles(theme).filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.ALL ? styles(theme).filterTextActive : styles(theme).filterTextInactive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onFilterChange(TaskFilters.ACTIVE)}
                    style={currentFilter === TaskFilters.ACTIVE ? styles(theme).filterContainerActive : styles(theme).filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.ACTIVE ? styles(theme).filterTextActive : styles(theme).filterTextInactive}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onFilterChange(TaskFilters.COMPLETED)}
                    style={currentFilter === TaskFilters.COMPLETED ? styles(theme).filterContainerActive : styles(theme).filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.COMPLETED ? styles(theme).filterTextActive : styles(theme).filterTextInactive}>Completed</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={{width:"90%"}}>
                        <TextInput
                            value={taskDescription}
                            onChangeText={setTaskDescription}
                            returnKeyType="done"
                            onSubmitEditing={handleAddTaskClick}
                            style={{
                                marginEnd: 10,
                                minHeight: 40,
                                borderColor: "#DDD",
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={handleAddTaskClick}>
                        <Image
                            source={require("@/assets/images/add-task.png")} 
                            style={{
                                width: 40,
                                height: 40,
                                marginVertical: 20,
                                marginEnd: 5,
                    }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = (theme: AppTheme) => {
    return StyleSheet.create({
        filterContainerActive: {
            backgroundColor: "#ED7303",
            marginEnd: 10,
            marginBottom: 10,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10
        },
        filterContainerInactive: {
            backgroundColor: theme.backgroundColor,
            marginEnd: 10,
            marginBottom: 10,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10
        },
        filterTextActive: {
            color: "#FFF"
        },
        filterTextInactive: {
            color: theme.textColor
        }
    })
}

export default TasksFooter