import { useContext, useState } from "react"
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native"
import { AppTheme } from "../../style/themes"
import { ThemeContext } from "../../context/ThemeContextProvider"
import { AntDesign } from "@expo/vector-icons"
import { Link } from "expo-router"
import { ImageContext } from "@/src/context/ContextProvider"

export const enum TaskFilters {
    ALL,
    ACTIVE,
    COMPLETED
}

export interface TasksFooterProps {
    currentFilter: TaskFilters,
    onFilterChange: (filter: TaskFilters) => void,
    onAddTask: (description: string, imageUrl: string | null) => void
}

const TasksFooter = (props: TasksFooterProps) => {
    const { currentFilter, onFilterChange, onAddTask } = props

    const [taskDescription, setTaskDescription] = useState("")
    const theme = useContext(ThemeContext)
    const { imageUrl, setImageUrl } = useContext(ImageContext)
    
    const handleAddTaskClick = () => {
        if (taskDescription.trim().length > 0) {
            onAddTask(taskDescription, imageUrl),
            setTaskDescription("")
            setImageUrl(null)
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
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <TextInput
                            value={taskDescription}
                            onChangeText={setTaskDescription}
                            returnKeyType="done"
                            onSubmitEditing={handleAddTaskClick}
                            style={{
                                marginEnd: 5,
                                minHeight: 40,
                                borderColor: "#DDD",
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                        />
                    </View>

                    <Link href={"/camera"} asChild={true}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                width: 40,
                                height: 40,
                                backgroundColor: "#ED7303",
                                margin: 5,
                                borderRadius: 4
                            }}
                        >
                            <AntDesign 
                                name={imageUrl === null ? "camera" : "check"}
                                size={35} 
                                color={imageUrl === null ? "white" : "green"}  
                            />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity 
                        onPress={handleAddTaskClick}
                        style={{
                            flex: 1
                        }}
                    >
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