import { View, Text, Button, TouchableOpacity, Image } from "react-native"

export interface TasksHeaderProps {
    tasksLeft: number,
    onCleanTasks: () => void
}

const TasksHeader = (props: TasksHeaderProps) => {
    const { tasksLeft, onCleanTasks } = props

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%"
            }}
        >
            <View>
                <Text
                    style={{
                        fontSize: 40,
                        fontWeight: 700
                    }}
                >
                    Tasks
                </Text>
                <Text
                    style={{
                        fontStyle: "italic"
                    }}
                >
                    {tasksLeft} items left
                </Text>
            </View>


            <TouchableOpacity 
                onPress={() => onCleanTasks()}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F05757",
                    borderRadius: 5
                }}
            >
                <Image 
                    source={require("@/assets/images/trash-icon.png")} 
                    style={{
                        marginStart:15
                    }}
                />
                <Text 
                    style={{
                        color: "#FFF", 
                        marginVertical: 10,
                        marginStart: 5,
                        marginEnd: 15
                    }}
                >
                    Clean
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TasksHeader