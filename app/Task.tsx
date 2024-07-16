import { View, Text, Image, TouchableOpacity } from "react-native"

export interface TaskProps {
    description: string;
    isDone: Boolean,
    onClick: () => void
}

const Task = (props: TaskProps) => {
    const { description, isDone, onClick } = props

    return(
        <View style={{
            flex:1,
            flexDirection: "row",
            alignItems: "center"
        }}>
            {/* Call or send the prop? */}
            <TouchableOpacity onPress={ () => onClick() }>  
                <Image
                    source={isDone ? require('@/assets/images/task-checked.png') : require('@/assets/images/task-unchecked.png') } 
                    style={{
                        width: 40,
                        height: 40,
                        marginVertical: 20,
                        marginEnd: 5
                    }}
                />
            </TouchableOpacity>
            <Text
                style={{ 
                    width: "90%"
                }} 
            >
                {description}
            </Text>

        </View>
    )
}

export default Task