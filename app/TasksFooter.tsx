import { SetStateAction, useState } from "react"
import { View, Button, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native"

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
                    style={currentFilter === TaskFilters.ALL ? styles.filterContainerActive : styles.filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.ALL ? styles.filterTextActive : styles.filterTextInactive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onFilterChange(TaskFilters.ACTIVE)}
                    style={currentFilter === TaskFilters.ACTIVE ? styles.filterContainerActive : styles.filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.ACTIVE ? styles.filterTextActive : styles.filterTextInactive}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onFilterChange(TaskFilters.COMPLETED)}
                    style={currentFilter === TaskFilters.COMPLETED ? styles.filterContainerActive : styles.filterContainerInactive}
                >
                    <Text style={currentFilter === TaskFilters.COMPLETED ? styles.filterTextActive : styles.filterTextInactive}>Completed</Text>
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

const styles = StyleSheet.create({
    filterContainerActive: {
        backgroundColor: "#ED7303",
        marginEnd: 10,
        marginBottom: 10,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    filterContainerInactive: {
        backgroundColor: "#FFF",
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
        color: "#000"
    }
})

export default TasksFooter