import { Link } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native"

export interface TaskProps {
    taskId: string,
    description: string,
    isDone: Boolean,
    onClick: () => void
}

const TaskItem = (props: TaskProps) => {
    const { taskId, description, isDone, onClick } = props

    return(
        <View style={{
            flex:1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white"
        }}>
            {/* Call or send the prop? */}
            <TouchableOpacity onPress={ () => onClick() }>  
                <Image
                    source={isDone ? require('@/assets/images/task-checked.png') : require('@/assets/images/task-unchecked.png')} 
                    style={{
                        width: 40,
                        height: 40,
                        marginVertical: 20,
                        marginEnd: 5
                    }}
                />
            </TouchableOpacity>
            <Link
                href={{
                    pathname: "/details",
                    params: { taskId }
                }}
                style={{ 
                    width: "90%"
                }} 
            >
                {description}
            </Link>

        </View>
    )
}

export default TaskItem